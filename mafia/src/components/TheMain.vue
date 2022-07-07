<template>
  <div v-if="!joined" class="join_box">
    <input v-model="currentUser" type="text" class="user-name">
    <button class="join-btn" @click="join">Join</button>
  </div>
  <div v-if="joined" class="game-box">
    <h2>접속!</h2>
  </div>
</template>

<script>
import { ref } from 'vue'
import io from "socket.io-client"

const socket = io("http://localhost:3000", {
  transports: ['websocket'],
  withCredentials: true
  })

export default {
  name: "TheMain",
  setup() {
    const joined = ref(false)
    const currentUser = ref('')

    const join = function () {
      if (currentUser.value) {
        joined.value = true
        socket.emit('join', currentUser.value)
      }
    }

    socket.on('welcome', function(data){
      console.log(data)
    })

    return { joined, join, currentUser }
  }
}
</script>

<style>
</style>