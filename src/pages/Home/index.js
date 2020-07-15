import React, { useState, useEffect } from 'react'

import getFirstData from '../../services/getFirstData'

import Form from './components/Form'
import List from './components/List'

import './styles.css'

export default function Home() {
  /* 
    Filter Options: Opções de filtro
    * Página atual da listagem
    * Limite de itens por listagem
    * Total de páginas
  */
  const [ actualPage, setActualPage ] = useState(1)
  const [ limit, setLimit ] = useState(6)
  const [ totalPages, setTotalPages ] = useState(1)

  /*
    PrimordialData: Em base os dados responsaveis por guardar
    as informações principais

      * Data dos usuários: Banco de dados na memória
      * View dos usuários: Dados dos usuários escolhidos para ser mostrados em tela
      * Total de usuários: Muda na primeira sincronização e nas futuras adições/exclusões
      * ID: Como se fosse uma chave primária do banco de dados
  */
  const [ usersData, setUsersData ] = useState([])
  const [ usersView, setUsersView ] = useState([])
  const [ totalUsers, setTotalUsers ] = useState(0)
  const [ lastId, setLastId ] = useState(0)
  

  /* 
    Realiza a primeira consulta a camada de dados
    Retornando as primeiras informações e os usuários
  */  
  useEffect(() => {
    async function initialLoad() {
      try {
        const { totalUsers, users } = await getFirstData() 
        setTotalUsers(totalUsers)
        setLastId(totalUsers)
        setUsersData(users)
  
        const temporaryLimit = 6
        setTotalPages((totalUsers / temporaryLimit).toFixed())
        setLimit(temporaryLimit)
      }
      catch {
        alert('Não foi possível carregar os dados iniciais')
      }
    }  
    initialLoad()    

  }, [])

  /*
    * Estado de listagem
    * Tem por função o ato de organizar a lista
    * Mantendo a ordem da paginação, do limite e da pesquisa
  */
  useEffect(() => {
    /* 
      * Trabalha na paginação
    */
    function changePagination() {
      const newTotalPages = Math.ceil(totalUsers / limit)

      if(newTotalPages < 1 || !isFinite(newTotalPages)) {
        setTotalPages(1)
      }
      else {
        setTotalPages(newTotalPages)
      }
      if(actualPage > totalPages) setActualPage(totalPages)
    }
    changePagination()

    /* 
      * Recarrega a camada de vizualização
        aplicando a regra de paginação 
        e também o limite
    */
    async function changeView() {

      const initial = (limit * (actualPage-1))
      const end = (limit * actualPage)

      const newView = usersData.slice(initial, end)

      await setUsersView(newView)
    }
    changeView()
  }, [totalUsers, limit, actualPage, totalPages, usersData])

  
  /*
    Ação principal de criação de usuário
  */
  async function handleCreate(data) {
    try {
      /* 
        Id primária que não pode diminuir
      */
      const user_id = lastId+1
      setLastId(user_id)

      const newUser = {id: user_id, ...data}
      await setUsersData([newUser, ...usersData])

      await setTotalUsers(totalUsers+1)    
    }
    catch(err) {
      alert('Não foi possível cadastrar novo usuário')
    }
  }


  /* 
    Ação principal de remoção
    * Remove por índice da array dados
  */
  async function handleDelete(index) {
    await setUsersData(usersData.filter((v, i) => i !== index))
    setTotalUsers(totalUsers-1)
  }


  /*
    Ação principal de editar
    * Edita por indíce da array de dados
  */
  async function handleEdit(index, data) {
    await setUsersData(usersData.map((atualData, atualIndex) => {
      if(index === atualIndex) {
        return data
      }
      else {
        return atualData
      }
    }))
  }

  
  /*
    Ação de pesquisa que altera a camada de vizualização
    mantendo a integridade da camada de usuários
  */
  async function handleSearch(val) {
    const toFilter = (user, place) => {
      const regex = new RegExp(val, "gi")
      const filter = (user[place]).split(regex)

      if(filter.length > 1) 
        return true
      else 
        return false
    }

    const filteredUsersByName = await usersData.filter(user => toFilter(user, "first_name"))
    const filteredUsersByLastName = await usersData.filter(user => toFilter(user, "last_name"))

    await setLimit(totalUsers)

    await setUsersView([...filteredUsersByName, ...filteredUsersByLastName])
  }

  return (
    <div className="home">
      <Form create={handleCreate} />
      <List 
        list={usersView} 
        page={actualPage} 
        setPage={setActualPage} 
        total={totalPages} 
        count={totalUsers}
        limit={limit}
        setLimit={setLimit}
        remove={handleDelete}
        edit={handleEdit}
        search={handleSearch}/>
    </div>
  )
}