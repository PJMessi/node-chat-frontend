<template>
  <div class="home">
    <main class="content">
      <div class="container p-0">
        <h1 class="h3 mb-3">Messages</h1>

        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-right">
              <Contact/>
            </div>

            <div class="col-12 col-lg-7 col-xl-9">
              
              <MessageList/>

              <div class="flex-grow-0 py-3 px-4 border-top">
                <MessageCompose :socket="socket"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Contact from '@/components/Contact';
import MessageList from '@/components/MessageList';
import MessageCompose from '@/components/MessageCompose';
import io from 'socket.io-client';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Contact, MessageList, MessageCompose },

  computed: {
    ...mapGetters(['authToken', 'isLoggedIn'])
  },

  created() {
    if (!this.isLoggedIn) this.$router.push('/login');

    this.socket = io('http://127.0.0.1:5000/', {
      query: {
        token: this.authToken
      }
    });

    const vm = this;
    this.socket.on('chat-message', function (message) {
      vm.insertMessage(message);
    })

  },

  data() {
    return {
      socket: {}
    }
  },

  methods: {
    ...mapActions(['insertMessage'])
  }
};

</script>


<style>
  body {
    margin-top: 20px;
  }

  .chat-online {
    color: #34ce57;
  }

  .chat-offline {
    color: #e4606d;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    max-height: 700px;
    overflow-y: scroll;
  }

  .chat-message-left,
  .chat-message-right {
    display: flex;
    flex-shrink: 0;
  }

  .chat-message-left {
    margin-right: auto;
  }

  .chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto;
  }
  .py-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .px-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .flex-grow-0 {
    flex-grow: 0 !important;
  }
  .border-top {
    border-top: 1px solid #dee2e6 !important;
  }
</style>

