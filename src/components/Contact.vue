<template>
  <div>
    <!-- <div class="px-4 d-none d-md-block">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <input
            type="text"
            class="form-control my-3"
            placeholder="Search..."
          />
        </div>
      </div>
    </div> -->

    <a v-for="user in otherUsers" :key="user.uuid" href="#" class="list-group-item list-group-item-action border-0">
      <div class="badge bg-success float-right">5</div>
      <div class="d-flex align-items-start">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar5.png"
          class="rounded-circle mr-1"
          :alt="user.name"
          width="40"
          height="40"
        />
        <div class="flex-grow-1 ml-3">
          {{user.name}}
          <div class="small">
            <span class="fas fa-circle chat-online"></span> Online
          </div>
        </div>
      </div>
    </a>
 
    <hr class="d-block d-lg-none mt-1 mb-0" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {

  created() {
    this.fetchUsers();
  },

  computed: {
    ...mapGetters(['usersList', 'authUser']),

    // list of users other than the auth user.
    otherUsers: function() {
      return this.usersList.filter(user => {
        return user.uuid != this.authUser.uuid
      })
    }
  },

  methods: {
    ...mapActions(['fetchUsers'])
  }  
}
</script>
