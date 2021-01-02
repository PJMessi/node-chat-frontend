import moment from 'moment'
import Vue from 'vue'

Vue.filter('chat-time', (value) => {
    if (!value) return value

    return moment(value).format('h:mm a')
})

Vue.filter('lowercase', (value) => {
    if (!value) return value

    return value.toLowerCase()
})