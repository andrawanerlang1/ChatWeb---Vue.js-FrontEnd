<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/maps">Maps</router-link> |
      <router-link to="/chat">Chat</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  created() {
    this.interceptorRequest();
    this.interceptorResponse();
  },
  methods: {
    ...mapActions(["interceptorRequest", "interceptorResponse"])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
#app {
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
