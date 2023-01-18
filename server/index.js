const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const players = []
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', "POST"],
  },
})
io.on('connection', (socket) =>{
  console.log(`User Connected: ${socket.id}`)
  
  socket.on('entrarFila', data => {
    if (players.length > 2) return
    if (players.length > 0) {
      let check = true
      players.map((player) => {
        if (player.id === data.id) {
          check = false
        }
      })
      if (check) {
        players.push(data)
      } 
    } else {
      players.push(data)
    }
    io.emit('Fila', players)
  })

  socket.on('played', data => {
    io.emit('newPlayed', data)
  })

  socket.on('player', data =>{
    io.emit('player', data)
  })

  socket.on('wins', data =>{
    players[data].wins += 0.5
    console.log(players)
    io.emit('wins', players)
  })
  
  socket.on('namePlayer', data =>{
    console.log(data)
    io.emit('namePlayer', data)
  })

  socket.on('playerFila',  data => {
    socket.emit('playerFila', [
      {
        player1: data[0].id,
        id: 1
      },
      {
          player2: data[1].id,
          id: 2
      }])
  })

  socket.on('sendUser', user => {
    io.emit('sendUser', user)
  })

  socket.on('disconnect' , () => {
    console.log('saiu')
    var index = players.map((player, index) => {
      if (player.id === socket.id) {
        players.splice(index, 1)
        return
      }
    });
    players.map((play, index) => {
      if (play.id === null) {
        players.splice(index, 1)
      }
    })
    io.emit('Fila', players)
    console.log(players, 'oi')
  })
  
})


server.listen(3001, () => {
  console.log('Server Rodando')
})