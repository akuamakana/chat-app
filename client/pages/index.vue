<template>
  <div class="flex w-screen h-screen">
    <Users :username="username" :users="users" />
    <ChatRoom :messages="messages" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import Users from '~/components/Users'
import ChatRoom from '~/components/ChatRoom'

export default {
  components: { Users, ChatRoom },
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
    // this.username = prompt('What is your username?', 'Anon')
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

<style>
  .container {
    width: 100vw;
  }
</style>
