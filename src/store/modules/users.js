import axios from 'axios';
import Vue from 'vue';

const state = {
    // contains the list of users.
    users: [],

    // determines if the users list is being updated.
    loading: false,

    // contains filters for current users list.
    filters: {
        page: 1,
        limit: 10
    }
};

const getters = {
    // returns the list of users.
    usersList: state => state.users,

    // returns true if the users list is being updated.
    usersListBeingUpdated: state => state.loading
}

const actions = {

    /**
     * Calls api to fetch the paginated users list.
     * @param {*} param0 
     */
    fetchUsers: async ({ commit }) => {

        commit('updateUserLoadingStatus', true)

        try {
            const res = await axios.get('http://localhost:5000/users', { params: state.filters });

            const todoData = res.data.data;

            commit('updatePaginatedUserData', todoData);

            return res;

        } catch (error) {
            console.log(error)

        } finally {
            commit('updateUserLoadingStatus', false)
        }
    },

    /**
     * Updates the status of the user, if the user is in the paginated list.
     * @param {*} param0 
     * @param {*} param1 
     */
    updateUserStatus: ({ commit }, { uuid, status }) => {
        commit('updateUserStatus', { uuid, status })
    }

}

const mutations = {

    /**
     * Updates the status of the user, if the user is in the paginated list.
     * @param {*} state 
     * @param {*} newStatus 
     */
    updateUserStatus: (state, { uuid, status }) => {
        let updatedUsersList = state.users.map(user => {
            if (user.uuid == uuid) {
                user.status = status;
            }
            return user;
        })

        Vue.set(state, 'users', updatedUsersList )

    },

    /**
     * Updates the loading status with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updateUserLoadingStatus: (state, data) => {
        state.loading = data
    },

    /**
     * Updates the users list with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updatePaginatedUserData: (state, data) => {
        state.users = data
    }
}

export default { state, getters, actions, mutations }