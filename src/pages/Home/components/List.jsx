import React, { useState, useEffect } from 'react'

import Item from './Item'

export default ({ list, page, setPage, total, setTotal, limit, setLimit, count }) => {
  const [ usersList, setUsersList ] = useState([])

  useEffect(() => {
    const newList = list.map((user, i) => 
    {
      return <Item user={user} key={i} />
    })
    
    setUsersList(newList)
  }, [list])


  /* Mudar a página */
  function changePage(method = 'plus') {
    if(method === 'plus') {
      if(page < total) setPage(page+1)
      else setPage(1)
    }
    else if(method === 'down') {
      if(page > 1) setPage(page-1)
      else setPage(total)
    }
  }

  function changeLimit(val) {
    if(val < 1) setLimit(1)
    else setLimit(val)
  }

  return (
    <section className="list">      
      <div className="filter">

        <div className="pagination">
          <button onClick={() => changePage('down')} className="shadow">
            <i className="material-icons">navigate_before</i>
          </button>

          <label>
            <b>{page}</b> de <b>{total}</b>
          </label>

          <button onClick={() => changePage('plus')} className="shadow">
            <i className="material-icons">navigate_next</i>
          </button>
        </div>

        <div className="limitation">
          <input 
            type="number" 
            defaultValue={limit} 
            onChange={({target}) => changeLimit(target.value)} />
          <i>de</i>
          <input
            type="number"
            disabled
            value={count}
            />
        </div>

      </div>
      
      {usersList}
    </section>
  )
}