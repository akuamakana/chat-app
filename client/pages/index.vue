<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-5xl font-bold">
      Chat Room
    </h1>
    <p>Username: {{ username }}</p>
    <p>Online: {{ users.length }}</p>
    <ChatRoom :messages="messages" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatRoom from '~/components/ChatRoom'

export default {
  components: { ChatRoom },
  data () {
    return {
      username: '',
      // Connect to server
      socket: io('http://localhost:3000'),
      messages: [],
      users: []
    }
  },
  mounted () {
    this.username = prompt('What is your username?', 'Anon')
    this.username = this.username === '' ? 'Anonymous' : this.username

    this.joinServer()
  },
  methods: {
    joinServer () {
      this.socket.on('loggedIn', (data) => {
        // this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)

        this.listen()
      })
    },
    listen () {
      this.socket.on('userOnline', (user) => {
        this.users.push(user)
      })
      this.socket.on('userLeft', (user) => {
        this.users.splice(this.users.indexOf(user, 1))
      })
      this.socket.on('msg', (message) => {
        this.messages.push(message)
      })
    },
    sendMessage (message) {
      this.socket.emit('msg', message)
    }
  }
}
</script>
