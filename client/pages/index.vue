<template>
  <div class="">
    <h1>Chat room</h1>
    <p>Username: {{ username }}</p>
    <p>Online: {{ users.length }}</p>
    <button @click="testButton">
      I'm a testButton
    </button>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
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
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
    },
    testButton () {
      this.socket.emit('testButton', 'I\'m a test button')
    }
  }
}
</script>
