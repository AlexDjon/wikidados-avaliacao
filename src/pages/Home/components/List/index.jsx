import React, { useState, useEffect } from 'react'

import Item from '../Item'

import './styles.css'

export default ({ list, page, setPage, total, limit, setLimit, count, remove, edit, search }) => {
  
  /* 
    Camada de vizualização contendo os items
  */
  const [ usersList, setUsersList ] = useState([])

  /* Mudar a página */
  function changePage(method) {
    if(method === 'plus') {
      if(page < total) setPage(page+1)
      else setPage(1)
    }
    else if(method === 'down') {
      if(page > 1) setPage(page-1)
      else setPage(total)
    }
  }

  /* Mudar o limite de views */
  function changeLimit(method) {
    if(method === 'plus') {
      if(limit === count) {
        setLimit(1)
      }
      else {
        setLimit(limit+1)
      }
    }
    else if(method === 'down') {
      if(limit === 1) {
        setLimit(count)
      }
      else {
        setLimit(limit-1)
      }
    }
  }

  /* 
    Monitora a camada dos usuários filtrados
    e transforma cada um em um Item    
  */
  useEffect(() => {
    const newList = list.map((user, i) => 
    {
      return <Item user={user} index={i} remove={remove} edit={edit} key={i} />
    })
    
    setUsersList(newList)
  }, [edit, list, remove, search])

  return (
    <section className="list">      
      <div className="filter">
        <div className="change page">
          <button 
            onClick={() => changePage('down')}
            className="shadow">
            <i className="material-icons">navigate_before</i>
          </button>

          <label>
            <b className="hide_in_mobile">Página</b> <b>{page}</b> de <b>{total}</b>
          </label>

          <button 
            onClick={() => changePage('plus')}
            className="shadow">
            <i className="material-icons">navigate_next</i>
          </button>
        </div>

        <div className="change search">
          <input 
            type="text" 
            placeholder="Pesquisar:"
            onChange={({ target }) => search(target.value)}/>
        </div>

        <div className="change limit">
          <button 
            onClick={() => changeLimit('down')}
            className="shadow">
            <i className="material-icons">remove</i>
          </button>
          
          <label>
            <b>{limit}</b>
          </label>

          <button 
            onClick={() => changeLimit('plus')}
            className="shadow">
            <i className="material-icons">add</i>
          </button>
        </div>

      </div>
      
      {usersList}
    </section>
  )
}