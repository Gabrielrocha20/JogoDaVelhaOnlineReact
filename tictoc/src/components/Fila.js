import UserName from './UserName'
import {useState, useEffect} from 'react'

const Fila = ({filaAdd, player,id,handleFilaAdd, socket}) => {

  const [nome, setNome] = useState()

  useEffect(() => {
    const handleSendUser = user => {
      if(socket.id === user.id) setNome(user)
    }
    socket.on('sendUser', handleSendUser)
  }, [socket])

    
  return (
    <div className='fila-container inline'>
      <UserName socket={socket} player={player}/>
      <h4 className='players-fila'>Nome: {nome ? nome.user: id}</h4>
      <h3 className='players-fila'>{filaAdd}/2</h3>
      <button className='button-content' onClick={handleFilaAdd}>Procurar Partida</button>
    </div>
  )
}

export default Fila

// import UserName from './UserName'
// import {useState, useEffect} from 'react'


// const Fila = ({filaAdd, id, handleFilaAdd, socket}) => {
//   const [nome, setNome] = useState('')
//   useEffect(() => {
//     const handleSetNameUser = user => {
//       console.log(id)
//       setNome(user)
//     }
//     socket.on('sendUser', handleSetNameUser);
//   }, [socket, setNome]);
//   return (
//     <div className='fila-container inline'>
//       <UserName socket={socket} />
//       <h4 className='players-fila'>Nome: {nome !== '' ? nome: id}</h4>
//       <h3 className='players-fila'>{filaAdd}/2</h3>
//       <button className='button-content' onClick={handleFilaAdd}>Procurar Partida</button>
//     </div>
//   )
// }

// export default Fila