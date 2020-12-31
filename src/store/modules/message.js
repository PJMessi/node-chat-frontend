import axios from 'axios'
import Vue from 'vue'

const state = {
    // contains the messages along with pagination data.
    paginatedData: {rows: []},

    // determines if the messages list is being updated.
    loading: false,

    // contains filters for current messages list.
    filters: {
        page: 1,
        limit: 10
    }
};

const getters = {
    // returns the list of messages.
    messagesList: state => state.paginatedData.rows,

    // returns true if the messages list is being updated.
    messagesListBeingUpdated: state => state.loading
}

const actions = {

    /**
     * Calls api to fetch the paginated messages list.
     * @param {*} param0 
     */
    fetchMessages: async ({ commit }) => {
        commit('updateMessageLoadingStatus', true)
        try {
            const res = await axios.get('http://localhost:5000/messages', { params: state.filters });

            let todoData = res.data.data;

            todoData.rows = todoData.rows.reverse()

            commit('updatePaginatedMessageData', todoData);

            return res;

        } catch (error) {
            console.log(error)

        } finally {
            commit('updateMessageLoadingStatus', false)
        }
    },

    /**
     * Inserts the message object into the paginated list and updates the pagintation data and filter data.
     * @param {*} param0 
     * @param {*} message 
     */
    insertMessage: ({commit}, message) => {
        commit('insertMessage', message)
    }
}

const mutations = {
    /**
     * Inserts new message in the list and updates the pagination details accordingly.
     * @param {*} state 
     * @param {*} newMessage 
     */
    insertMessage: (state, newMessage) => {
        let updatedData = {
            count: state.paginatedData.count + 1,
            rows: [...state.paginatedData.rows, newMessage],
            lastPage: state.lastPage,
            currentPage: state.currentPage,
            from: state.from,
            perPage: state.perPage + 1,
            to: state.to + 1
        }

        Vue.set(state, 'paginatedData', updatedData)

        let updatedFilter = {
            page: 1,
            limit: state.filters.limit + 1
        }

        Vue.set(state, 'filter', updatedFilter)
    },

    /**
     * Updates the loading status with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updateMessageLoadingStatus: (state, data) => {
        state.loading = data
    },

    /**
     * Updates the paginated message data with new value.
     * @param {*} state 
     * @param {*} data 
     */
    updatePaginatedMessageData: (state, data) => {
        state.paginatedData = data
    }
}

export default { state, getters, actions, mutations }