<template>
  <div class="col-span-3 w-screen h-full flex flex-col bg-gray-700">
    <div class="h-full p-8">
      <div v-for="message in messages" :key="message.index" class="text-white">
        <p>{{ message.username }}: {{ message.msg }}</p>
      </div>
    </div>
    <form class="flex bg-gray-600 m-8 rounded-lg" @submit.prevent>
      <input v-model="msg" class="focus:outline-none p-2 mr-1 w-full bg-transparent text-white" type="text" @keyup.enter="sendMessage">
      <button
        type="button"
        :disabled="!msg"
        :class="msg === '' ? 'text-gray-800 opacity-50' : 'text-white'"
        class="mx-4 focus:outline-none"
        @click="sendMessage"
      >
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
