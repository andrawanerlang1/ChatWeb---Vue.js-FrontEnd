<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col v-if="mode === 'chat'" md="4" sm="12"><ChatMenu /></b-col>
        <b-col v-if="mode === 'profile'" md="4" sm="12"><ProfileMenu /></b-col>
        <b-col v-if="mode === 'contact'" md="4" sm="12"><ContactMenu /></b-col>
        <b-col v-if="mode === 'invite'" md="4" sm="12"><InviteMenu /></b-col>
        <b-col v-if="mode === 'friendProfile'" md="4" sm="12"
          ><FriendProfile
        /></b-col>

        <b-col v-if="chatMode" md="8" sm="12" class="chatSection">
          <ChatSection />
        </b-col>
        <b-col v-if="!chatMode" md="8" sm="12" class="noChat">
          Please select a chat to start messaging
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChatSection from "../components/chat/ChatSection";
import ChatMenu from "../components/chat/ChatMenu";
import ProfileMenu from "../components/profile/ProfileComponent";
import InviteMenu from "../components/friends/InviteFriend";
import ContactMenu from "../components/friends/contactList";
import FriendProfile from "../components/friends/profileFriend";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    ChatMenu,
    ProfileMenu,
    InviteMenu,
    ContactMenu,
    ChatSection,
    FriendProfile
  },

  computed: {
    ...mapGetters({
      user: "setUser",
      mode: "getMode",
      chatMode: "getterChatMode"
    })
  }
};
</script>

<style scoped>
.chatSection {
  padding-top: 20px;
}
.noChat {
  background-color: rgb(230, 224, 224);
  padding-top: 300px;
  text-align: center;
}
</style>
