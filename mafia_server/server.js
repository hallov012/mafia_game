const cors = require('cors')
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const server = http.createServer(app)
var io = new Server (server, {
  cors: {
    credentials: true,
  },
  allowEIO3: true,
})

var players = []

io.on('connection', (socket) => {
  var joined = false
  var username
  // 접속
  socket.on('join', (data) => {
    if (joined) {
      return false
    }
    username = data
    players.push(username)
    socket.emit('welcome', {
      'username': username,
      'players': players
    })
    console.log(players)
    joined = true
  })

  // 접속 종료
  socket.on('disconnect', () => {
    if (!joined) {
      return false
    }

    var idx = players.indexOf(username)
    players.splice(idx, 1)
    socket.emit('left', {
      'username': username,
      'players': players
    })
    joined = false
  })
})

server.listen(3000, () => {
  console.log('game server is running on 3000')
})