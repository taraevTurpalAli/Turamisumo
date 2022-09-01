function chatSocket() {
  const { io } = require('../../index')
  const rooms = new Map()
  io.on('connection', socket => {
    console.log('user connect')
    socket.on('join', data => {
      if (data.ladasidan == false) {

        socket.on('create:chat', () => {
          if (!rooms.has(data.key)) {
            rooms.set(data.key, new Map())
            rooms.get(data.key).set('messages', new Map([['mess', []]]))


          }
          socket.emit('chats', 'a')
          console.log(rooms)
        })
      }

      socket.on('add:admin', () => {
        rooms.get(id).set('admin', id).set('freezing', true)
        console.log(rooms)
      })

    })

    console.log(rooms)
    socket.on('delete:admin', () => {
      rooms.get(id).delete('admin')
      rooms.get(id).set('freezing', false)
      console.log(rooms)
    })
    socket.on('delete:chat', () => {
      rooms.delete(id)
      console.log(rooms)
    })
    socket.on('add:messages', data => {
      const obj = {
        text: data,
      }
      rooms.get(id).get('messages').get('mess').push(data)
      console.log(rooms.get(id).get('messages'))
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

module.exports = { chatSocket }
