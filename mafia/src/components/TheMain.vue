<template>
  <div>
    <div v-if="!joined" class="join_box">
      <input v-model="currentUser" type="text" class="user-name">
      <button class="join-btn" @click="join">Join</button>
    </div>
    <div v-if="joined" class="game-box">
      <h2>접속!</h2>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client"

export default {
  name: "TheMain",
  data: function() {
    return {
      joined: false,
      currentUser: "",
    }
  },
  methods: {
    join() {
      this.joined = true
      this.socket = io("http://localhost:3000", {
        transports: ['websocket'],
        withCredentials: true,
      })
    }
  }
}
</script>

<style>
</style>