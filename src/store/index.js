import Vue from "vue";
import Vuex from "vuex";

import authenticate from './modules/authenticate';
import users from './modules/users';
import messages from './modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authenticate,
    users,
    messages
  }
});