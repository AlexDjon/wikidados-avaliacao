import React from 'react'
import Swal from 'sweetalert2'

import validation from '../../../../validation/yup'

import './styles.css'

export default ({ user, remove, edit, index }) => {

  const avatar = user.avatar === "" ?
    require('../../../../assets/default-user.png') : user.avatar

  /* Remove Alert */
  function toRemove(index) {
    Swal.fire({
      text: "Deletar o usuário?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.value) {
        /* Remove Function */
        remove(index)

        Swal.fire({
          text: 'O usuário foi removido.',
          icon: 'success'
        })
      }
    })
  }

  /* Edit Form */
  async function toEdit(index) {    	
    const { value: data } = await Swal.fire({
      title: 'Editar',
      html:
        `<input id="e-first_name" placeholder="Nome:" value="${user.first_name}" class="swal2-input">` +
        `<input id="e-last_name" placeholder="Sobrenome:" value="${user.last_name}" class="swal2-input">` +
        `<input id="e-email" placeholder="E-mail:" value="${user.email}" class="swal2-input">` +
        `<input id="e-avatar" placeholder="Url do Avatar (opcional):" value="${user.avatar}" class="swal2-input">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Salvar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true,
      preConfirm: () => {
        return {
          id: user.id,
          email: document.getElementById('e-email').value,
          first_name: document.getElementById('e-first_name').value,
          last_name: document.getElementById('e-last_name').value,
          avatar: document.getElementById('e-avatar').value
        }
      }
    })

    if (data) {
      validation.create
      .validate(data)
      .then(() => {
        /* Edit Action */
        edit(index, data)
        
        Swal.fire({
          text: "Usuário editado!",
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
  }

  return (
    <article className="item shadow">
      <img src={avatar} alt={user.first_name+" Avatar"} />
      
      <div className="data">
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <a href={"mailto:"+user.email}>{user.email}</a>
        <h4>
          ID: {user.id}
        </h4>
      </div>

      <div className="action-buttons">
        <button onClick={() => toRemove(index)}>
          <i className="material-icons"> delete </i>
        </button>
        <button onClick={() => toEdit(index, user)}>
          <i className="material-icons"> edit </i>
          </button>
      </div>
    </article>
  )
}