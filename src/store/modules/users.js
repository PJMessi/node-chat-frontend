import axios from 'axios'

const state = {
    // contains the users along with pagination data.
    paginatedData: {rows: []},

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
    usersList: state => state.paginatedData.rows,

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
    }

}

const mutations = {

    /**
     * Updates the loading status with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updateUserLoadingStatus: (state, data) => {
        state.loading = data
    },

    /**
     * Updates the paginated user data with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updatePaginatedUserData: (state, data) => {
        state.paginatedData = data
    }
}

export default { state, getters, actions, mutations }