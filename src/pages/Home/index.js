import React, { useState, useEffect } from 'react'

import getFirstData from '../../services/getFirstData'

import Form from './components/Form'
import List from './components/List'

import './styles.css'

export default function Home() {
  /* 
    Filter Options: Opções de filtro
  */
  const [ actualPage, setActualPage ] = useState(1)
  const [ limit, setLimit ] = useState(6)

  /*
    Request Data: Dados vindos da requisição
  */
  const [ totalPages, setTotalPages ] = useState(1)
  const [ totalUsers, setTotalUsers ] = useState(0)
  const [ lastId, setLastId ] = useState(0)
  const [ usersData, setUsersData ] = useState([])
  const [ usersView, setUsersView ] = useState([])
  

  /* 
    Realiza a primeira consulta a camada de dados 
  */  
  useEffect(() => {
    async function initialLoad() {
      try {
        const { totalUsers, users } = await getFirstData() 
        setTotalUsers(totalUsers)
        setLastId(totalUsers)
        setUsersData(users)
  
        const tempLimit = 6
        setTotalPages((totalUsers / tempLimit).toFixed())
        setLimit(tempLimit)
      }
      catch {
        alert('Não foi possível carregar os dados iniciais')
      }
    }  
    initialLoad()    

  }, [])

  /*
    * Sempre que mudar a quantidade de users ou o limit
  */
  useEffect(() => {
    function alterFilter() {
      const newTotalPages = Math.ceil(totalUsers / limit)

      if(newTotalPages < 1 || newTotalPages == Infinity) {
        setTotalPages(1)
      }
      else {
        setTotalPages(newTotalPages)
      }
      if(actualPage > totalPages) setActualPage(totalPages)
    }
    alterFilter()

    function changeView() {
      const initial = (limit * (actualPage-1))
      const end = (limit * actualPage)
      const newView = usersData.slice(initial, end)

      setUsersView(newView)
    }
    changeView()
  }, [totalUsers, limit, actualPage, totalPages, usersData])

  /*
    Criação de novos usuários na memória
  */
  function handleCreate(data) {
    try {
      /* 
        Id primária que não pode diminuir
      */
      const user_id = lastId+1
      setLastId(user_id)

      /*
        Adiciona novo usuário
      */
      const newUser = {id: user_id, ...data}
      setUsersData([newUser, ...usersData])
      
      /* Muda o total de usuários */
      setTotalUsers(totalUsers+1)    
    }
    catch(err) {
      alert('Não foi possível cadastrar novo usuário')
    }
  }

  return (
    <div className="home">
      <Form create={handleCreate} />
      <List 
        list={usersView} 
        page={actualPage} 
        setPage={setActualPage} 
        total={totalPages} 
        setTotal={setTotalPages}
        count={totalUsers}
        limit={limit}
        setLimit={setLimit} />
    </div>
  )
}