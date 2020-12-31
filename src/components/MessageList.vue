<template>
  <div>
    <div class="py-2 px-4 border-bottom d-none d-lg-block">
      <div class="d-flex align-items-center py-1">
        <div class="position-relative">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            class="rounded-circle mr-1"
            :alt="authUser.name"
            width="40"
            height="40"
          />
        </div>
        <div class="flex-grow-1 pl-3">
          <strong>{{authUser.name}}</strong>
          <!-- <div class="text-muted small"><em>Typing...</em></div> -->
        </div>
        <div>
          <button class="btn btn-danger border btn-lg px-3" @click="logout()">
            <i class="fas fa-power-off"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="position-relative bottom-of-the-chat">
      <div class="chat-messages p-4" ref="messagesContainer">
        <div v-for="message in messagesList" :key="message.uui" :class="message.user.uuid == authUser.uuid ? 'chat-message-right' : 'chat-message-left'" class="pb-4">
          <div>
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              class="rounded-circle mr-1"
              alt="Chris Wood"
              width="40"
              height="40"
            />
            <div class="text-muted small text-nowrap mt-2">
              {{message.createdAt | chat-time}}
            </div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
            <div class="font-weight-bold mb-1">{{ message.user.uuid == authUser.uuid ? 'You' : message.user.name}}</div>
            {{message.content}}
          </div>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  created() {
    this.fetchMessages()
 
  },

  watch: {
    /**
     * If user is logged out, pushes to login page.
     */
    isLoggedIn: function(newValue, oldValue) {
      if (!newValue) {
        this.$router.push('/login')
      }
    },
  },

  computed: {
    ...mapGetters(['authUser', 'isLoggedIn', 'messagesList'])
  },

  updated() {
    this.$nextTick(() => this.scrollToEndOfTheChat());
  },

  methods: {
    ...mapActions(['logout', 'fetchMessages']),

    /**
     * Scrolls the chat to the bottom.
     */
    scrollToEndOfTheChat: function () {
      var content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight
    }
  }
  
}
</script>