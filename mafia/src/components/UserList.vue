<template>
  <div>
    <h2>Players</h2>
    <UserItem v-for="(user, idx) in userList.players" :key=idx :user=user />
  </div>
</template>

<script>
import UserItem from "@/components/UserItem.vue"

export default {
  name: "UserList",
  components: {
    UserItem
  },
  props: ['userList']
}
</script>

<style>

</style>