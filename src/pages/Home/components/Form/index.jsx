import React, { useState } from 'react'

import Swal from 'sweetalert2'

import validation from '../../../../validation/yup'

import './styles.css'

export default ({ create }) => {
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ avatar, setAvatar ] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      avatar
    }

    validation.create
      .validate(data)
      .then(() => {
        create(data)
        
        Swal.fire({
          text: "Usuário cadastrado!",
          icon: 'success'
        })
      })
      .catch(({ errors }) => {
        Swal.fire({
          text: errors.join("\n"),
          icon: 'error'
        })
      })   
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
      <input 
        type="text" 
        placeholder="Url do Avatar (opcional):"
        onChange={({ target }) => setAvatar(target.value)} 
      />

      <button type="submit"> 
        <i className="material-icons">add</i>
        Cadastrar
      </button>
    </form>
  )
}