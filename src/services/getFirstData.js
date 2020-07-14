import api from './api'

export default async function getFirstData() {
  /*
    * Retorna todos os usuários da camada de dados e salva em memória
  */
  const getTotal = await api.get('/users')
  const totalUsers = getTotal.data.total

  const prepareUrl = `/users?per_page=${totalUsers}`

  const getAll = await api.get(prepareUrl)

  /*
    * Organizar
  */
  let allUsers = []
  for(let i = totalUsers-1; i >= 0; i--) {
    allUsers = [...allUsers, getAll.data.data[i]]
  }

  return {
    totalUsers,
    users: allUsers,    
  }
}  