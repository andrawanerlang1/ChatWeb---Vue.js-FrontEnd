<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col v-if="mode === 'chat'" md="4" sm="12"><ChatMenu /></b-col>
        <b-col v-if="mode === 'profile'" md="4" sm="12"><ProfileMenu /></b-col>
        <b-col v-if="mode === 'contact'" md="4" sm="12"><ContactMenu /></b-col>
        <b-col v-if="mode === 'invite'" md="4" sm="12"><InviteMenu /></b-col>

        <b-col md="8" sm="12" class="chatSection">bagian chat {{ user }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChatMenu from "../components/chat/ChatMenu";
import ProfileMenu from "../components/profile/ProfileComponent";
import InviteMenu from "../components/friends/InviteFriend";
import ContactMenu from "../components/friends/contactList";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { ChatMenu, ProfileMenu, InviteMenu, ContactMenu },

  computed: {
    ...mapGetters({ user: "setUser", mode: "getMode" })
  }
};
</script>

<style scoped>
.chatSection {
  background-color: rgb(241, 235, 235);
  margin-top: 20px;
}
</style>
