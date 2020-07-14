import React, { useState } from 'react'

export default ({ create }) => {
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      avatar: "",
    }
    console.log(data)

    create(data)
  }
  return (
    <form onSubmit={e => handleSubmit(e)} className="create shadow">
      <h3>
        <b>Cr</b>iar Usuário
      </h3>

      <input 
        type="text" 
        placeholder="Nome:" 
        onChange={({ target }) => setFirstName(target.value)} 
      />
      <input 
        type="text" 
        placeholder="Sobrenome:"        
        onChange={({ target }) => setLastName(target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email:"
        onChange={({ target }) => setEmail(target.value)} 
      />

      <button type="submit"> 
        <i className="material-icons">add</i>
        Cadastrar
      </button>
    </form>
  )
}