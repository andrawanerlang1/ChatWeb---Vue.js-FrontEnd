<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col v-if="mode === 'chat'" md="4" sm="12" class="profile">
          <ChatMenu
        /></b-col>
        <b-col v-if="mode === 'profile'" md="4" sm="12" class="profile"
          ><ProfileMenu
        /></b-col>
        <b-col v-if="mode === 'contact'" md="4" sm="12" class="profile"
          ><ContactMenu
        /></b-col>
        <b-col v-if="mode === 'invite'" md="4" sm="12" class="profile"
          ><InviteMenu
        /></b-col>
        <b-col v-if="mode === 'friendProfile'" md="4" sm="12" class="profile"
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
import { mapGetters, mapActions } from "vuex";

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
  created() {
    this.$getLocation()
      .then(coordinates => {
        const setData = {
          user_lat: coordinates.lat,
          user_lng: coordinates.lng
        };
        if (coordinates.accuracy < 7000) {
          console.log("Geolocation accuracy is " + coordinates.accuracy);
          this.updateUsers(setData)
            .then(result => {
              console.log(result);
              this.$toasted.success("Location is uptodate", {
                duration: 2000
              });
            })
            .catch(error => {
              this.$toasted.error(error.data.msg);
            });
        } else {
          this.$toasted.error("Bad accuracy reading location");
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      mode: "getMode",
      chatMode: "getterChatMode"
    })
  },
  methods: {
    ...mapActions(["updateUsers"])
  }
};
</script>

<style scoped>
.chatSection {
  padding-top: 20px;
  height: 700px;
}
.noChat {
  background-color: rgb(230, 224, 224);
  padding-top: 300px;
  text-align: center;
  height: 700px;
}
.profile {
  height: 700px;
  overflow: auto;
}
</style>
