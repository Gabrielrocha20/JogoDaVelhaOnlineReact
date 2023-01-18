import {useState, useEffect} from 'react'

import './App.css';

import Players from './components/Players';
import TicToc from './components/TicToc';
import Fila from './components/Fila';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001')

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [player, setPlayer] = useState({
    id: null,
    nome: "",
    wins: 0
  })
  const [players, setPlayers] = useState([])
  const [fila, setFila] = useState(0)

  useEffect(() => {
    socket.on('connect', (data) => {
      setIsConnected(true);
      player.id = socket.id
      setPlayer(player)
    });
  }, [player]);


  useEffect(() => {
    const handleWins = players => {
      setPlayers(players)
    }
    socket.on('wins', handleWins)
  }, [player]);

  useEffect(() => {
    const handleChangePlayer = players => {
      setPlayer(player)
      console.log(player)
    }
    socket.on('namePlayer', handleChangePlayer)
  }, [player]);


  const handleFilaAdd = (e) => {
    e.preventDefault()
    socket.emit('entrarFila', player)
  }
  useEffect(() => {
    const handlefila = newFila => {
      if (fila > 2) return
      if (players > 1) {
        players.map((play, index) => {
          if (play.id === null) {
            players.splice(index, 1)
          }
        })
      }
      setPlayers(newFila)
      setFila(newFila.length)
      console.log(players)
      console.log(fila)
    }
    socket.on('Fila', handlefila)
  }, [players, fila])

  return (
    <div className="App-container">
      <Fila filaAdd={fila} player={player}
      id={player.id !== null ? player.id : 'vazio'}
      handleFilaAdd={handleFilaAdd} socket={socket}/>
      <Players player={player} players={players} socket={socket}/>
      <TicToc socket={socket} playerID={player.id !== null ? player.id : 'vazio'}/>
    </div>
  );
}

export default App;
