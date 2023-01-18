import React, {useState} from 'react'

const UserName = ({socket, player}) => {
  const [user, setUser] = useState('')

  const handleUser = (e) => {
    const {value} = e.target
    setUser(value)
  }

  const handleSendUser = () =>{
    if (user === '') return

    if (socket.id === player.id) player.nome = user
    socket.emit('sendUser', {
      user: user,
      id: socket.id
    })

    socket.emit('namePlayer', player)
  }

  return (
    <div className='user-form'>
      <label htmlFor="Name">Nome</label>
      <input type="text" value={user} onChange={handleUser} placeholder='UserName'/>
      <button onClick={handleSendUser}>Enviar</button>
    </div>
  )
}

export default UserName