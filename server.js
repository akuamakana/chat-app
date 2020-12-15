const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin :"http://localhost:8080",
    methods: ["GET", "POST"]
  }
})
const port = process.env.PORT || 3000

let users = []
let messages =[]
let index = 0

io.on('connection', socket => {
  socket.emit('loggedIn', {
    users: users.map(s => s.username),
    messages
  })

  socket.on("newuser", username => {
    console.log(`${username} has arrived at the party`)
    socket.username = username
    users.push(socket)

    io.emit('userOnline', socket.username)
  })

  socket.on('msg', msg => {
    let message = {
      index: index,
      username: socket.username,
      msg
    }

    messages.push(message)

    io.emit('msg', message)

    index++
  })

  socket.on('testButton', message => {
    console.log(message)
  })

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.username} has left the party`)
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket), 1)
  })
})

http.listen(port, () => {
  console.log(`Listening on port ${port}`)
}
)