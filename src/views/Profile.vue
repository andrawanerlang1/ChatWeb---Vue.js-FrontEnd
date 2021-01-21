<template>
  <div class="home">
    <b-container fluid>
      <Profile />
    </b-container>
  </div>
</template>

<script>
import Profile from "../components/profile/ProfileComponent";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { Profile },

  computed: {
    ...mapGetters({ user: "setUser" })
  }
};
</script>

<style scoped></style>
