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

io.on('connection', (socket) => {
  console.log(`user ${socket.id} join.`)

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} left`)
  })
})

server.listen(3000, () => {
  console.log('game server is running on 3000')
})