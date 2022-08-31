require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { chatSocket } = require('./controllers/chat/Chat.controller')
const mongoose = require('mongoose')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    cors: {
      origin: 'http://localhost:3000',
    },
  },
})
module.exports = { io }
chatSocket()

app.use(cors())
app.use(require('morgan')('dev'))
app.use(express.json())
app.use(require('./routes/room.route'))
app.use(require('./routes/product.route'))
app.use(require('./routes/user.route.js'))
app.use(require('./routes/admin.route'))
mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log('Успешно соединились с сервером MongoDB'))
  .catch(e => console.log(e))

server.listen(process.env.PORT, () => {
  console.log(`Cервер успешно запушен http://localhost:${process.env.PORT}`)
})
