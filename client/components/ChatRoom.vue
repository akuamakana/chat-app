<template>
  <div>
    <div class="w-64 h-64 border rounded-md my-4">
      <div v-for="message in messages" :key="message.index" class="border">
        <p>{{ message.username }}: {{ message.msg }}</p>
      </div>
    </div>
    <form class="grid grid-flow-col">
      <input v-model="msg" class="border rounded-lg p-1 mr-1" type="text">
      <button :disabled="!msg" :class="msg === '' ? 'bg-gray-300 opacity-50' : 'bg-blue-500'" class="border p-1 rounded-lg" @click="sendMessage">
        Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['messages'],
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    sendMessage () {
      if (!this.msg) {
        alert('Please enter a message')
        return
      }

      this.$parent.sendMessage(this.msg)
      this.msg = ''
    }
  }
}
</script>
