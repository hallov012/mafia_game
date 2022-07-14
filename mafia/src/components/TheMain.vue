<template>
  <div v-if="!joined" class="join_box">
    <input v-model="currentUser" @keypress.enter="join" type="text" class="user-name">
    <button class="join-btn" @click="join">Join</button>
  </div>
  <div v-if="joined" class="game-box">
    <UserList :userList = "userList" />
  </div>
</template>

<script>
import { ref } from 'vue'
import io from "socket.io-client"

import UserList from '@/components/UserList.vue'

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  withCredentials: true
  })

export default {
  name: "TheMain",
  components: {
    UserList
  },
  setup() {
    const joined = ref(false)
    const currentUser = ref('')
    const userList = ref([])

    const join = function () {
      if (currentUser.value) {
        joined.value = true
        socket.emit('join', currentUser.value)
      }
    }

    socket.on('welcome', function(data){
      userList.value = data
    })

    return { joined, join, currentUser, userList }
  }
}
</script>

<style>
</style>