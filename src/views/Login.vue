<template>
  <div class="text-center login">
    <form class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="credential.email" type="email" id="inputEmail" class="form-control" :class="{'is-invalid': authErrorMessage != ''}" placeholder="Email address" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="credential.password" type="password" id="inputPassword" class="form-control" :class="{'is-invalid': authErrorMessage != ''}" placeholder="Password" required>

      <!-- <div class="checkbox mb-3">
        <label><input type="checkbox" value="remember-me"> Remember me </label>
      </div> -->

      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login(credential)">
        <i v-if="authStatus=='loading'" class="fas fa-circle-notch" :class="{'fa-spin': authStatus=='loading'}"></i>
        <span v-else>Sign in</span>
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {

  created() {
    if (this.isLoggedIn) {
      this.$router.push('/')
    }
  },

  data() {
    return {
      credential: {
        email: 'pjmessi25@gmail.com',
        password: 'password'
      }
    }
  },

  watch: {
    isLoggedIn: function(newValue, oldValue) {
      if (newValue) {
        this.$router.push('/')
      }
    }
  },
  
  computed: {
    ...mapGetters(['isLoggedIn', 'authStatus', 'authErrorMessage'])
  },

  methods: {
    ...mapActions(['login'])
  }

}
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>