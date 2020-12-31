<template>
  <div>
    <div class="input-group">
      <input v-model="message" @keyup.enter="sendMessage()" type="text" class="form-control" placeholder="Type your message" />
      <button class="btn btn-primary" @click="sendMessage()">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket'],

  data() {
    return {
      message: ''
    }
  },

  methods: {
    sendMessage: async function() {
      await this.socket.emit('chat-message', this.message)
      this.message = ''
    }
  }
}
</script>
