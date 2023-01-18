import {useState, useEffect} from 'react'
import BlocksTicToc from './BlocksTicToc'

const TicToc = ({socket, playerID}) => {
  const results = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7],[2, 4, 6], [2, 5, 8],
    [3, 4, 5],[6, 7, 8]]
  const [played, setPlayed] = useState(
    [
      "", "", "",
      "", "", "",
      "", "", "",]
    )
  const [player, setPlayer] = useState(1)

  const [players, setPlayers] = useState()
  
  useEffect(() => {
    const handleNewPlayed = newPlayed => {
      setPlayed(newPlayed)
    }
    socket.on('newPlayed', handleNewPlayed)
    return () => socket.off('newPlayed', handleNewPlayed)
  }, [socket, played])

  useEffect(() => {
    const handleNewPlayer = newPlayer => {
      setPlayer(newPlayer)
    }
    socket.on('player', handleNewPlayer)
    return () => socket.off('player', handleNewPlayer)
  }, [socket, player])

  useEffect(() => {
    results.map((result) => {
      const res = played[result[0]]
      if (res !== "") {
        if (res === played[result[1]] && res === played[result[2]]) {
          console.log(`Player: ${player} Winner`)
          socket.emit('wins', player - 1)
          setPlayed(
            [
              "", "", "",
              "", "", "",
              "", "", "",]
          )
          socket.emit('played', [
            "", "", "",
            "", "", "",
            "", "", "",])
          socket.emit('player', player)
        }
      }
    })
  }, [socket, played, player, results])

  useEffect(() => {
    const handlePlayersFila = playersFila => {
      setPlayers(playersFila)
    }
    socket.on('playerFila', handlePlayersFila)
  },[socket])

  const handlePlayed = (id) => {
    if (played[id] === 'X' || played[id] === 'O'){
      return
    } else {
      if (player === 1 && playerID === players[0].player1) {
        played[id] = 'O'
        socket.emit('played', played)
        socket.emit('player', 2)
      } else if (player === 2 && playerID === players[1].player2) {
        played[id] = 'X'
        socket.emit('played', played)
        socket.emit('player', 1)
      }
    }
    
  }
  return (
    <div className="app-tictoc inline grid-tictoc">
      <BlocksTicToc id={0} sinal={played} className="blocks-tictoc border-to-left" handlePlayed={handlePlayed}/>
      <BlocksTicToc id={1} sinal={played} className="blocks-tictoc " handlePlayed={handlePlayed}/>
      <BlocksTicToc id={2} sinal={played} className="blocks-tictoc border-to-right" handlePlayed={handlePlayed}/>

      <BlocksTicToc id={3} sinal={played} className="blocks-tictoc" handlePlayed={handlePlayed}/>
      <BlocksTicToc id={4} sinal={played} className="blocks-tictoc" handlePlayed={handlePlayed}/>
      <BlocksTicToc id={5} sinal={played} className="blocks-tictoc" handlePlayed={handlePlayed}/>

      <BlocksTicToc id={6} sinal={played} className="blocks-tictoc border-bo-left" handlePlayed={handlePlayed}/>
      <BlocksTicToc id={7} sinal={played} className="blocks-tictoc " handlePlayed={handlePlayed}/>
      <BlocksTicToc id={8} sinal={played} className="blocks-tictoc border-bo-right" handlePlayed={handlePlayed}/>
    </div>
  )
}

export default TicToc