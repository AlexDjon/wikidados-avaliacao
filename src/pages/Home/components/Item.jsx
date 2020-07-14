import React from 'react'

export default ({ user }) => {
  const avatar = user.avatar === "" ?
    require('../../../assets/default-user.png') : user.avatar

  return (
    <article className="item shadow">
      <img src={avatar} alt={user.name+" Avatar"} />
      <div className="data">
        <h3>{user.first_name} {user.last_name}</h3>
        <a href={"mailto:"+user.email}> {user.email} </a>
      </div>      
    </article>
  )
}