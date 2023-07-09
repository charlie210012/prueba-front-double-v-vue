<template>
  <list-users></list-users>
</template>

<script>
import ListUsers from './views/ListUsers.vue';

export default {
  name: 'App',
  components: {
    ListUsers
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
