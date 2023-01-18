const Players = ({player, players, socket}) => {
  
  
  if(players.length === 0) {
    return (
      <div className='players-content inline'>
      <h2>Players</h2>
      
      <h3>Vazio: Wins-0</h3>
      <h3>Vazio: Wins-0</h3> 
    </div>
    )
  }
  if (players.length === 1) {
      return (
        <div className='players-content inline'>
        <h2>Players</h2>
        <h3>{players[0].nome}: Wins-{players[0].wins}</h3>
        <h3>Vazio: Wins-0</h3> 
      </div>
    )
    
  }

  if (players.length === 2) {
    socket.emit('playerFila', players)
    return (
      <div className='players-content inline'>
        <h2>Players</h2>
        <h3>{players[0].nome}: Wins-{players[0].wins}</h3>
        <h3>{players[1].nome}: Wins-{players[1].wins}</h3>
      </div>
    )
  }
}

export default Players