<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>Contacts</div>
      <div></div>
    </div>
    <br />
    <div class="friendRequest">
      Friend Request
      <div
        class="friendRequestBox"
        v-for="(item, index) in friendReqs"
        :key="index"
      >
        <b-container fluid>
          <b-row style="text-align:center">
            <b-col> <img src="../../assets/icon/profilestock.jpg"/></b-col>
            <b-col>
              <br />
              {{ item.user_name }} <br />
              {{ item.user_email }}
            </b-col>
          </b-row></b-container
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      type: "invite",
      searchParam: null
    };
  },
  created() {
    this.getFriendReqs(this.user.user_id);
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      friendReqs: "getterFriendReqs"
    })
  },
  methods: {
    ...mapActions(["getFriendReqs", "clearFriends", "changeMode"]),
    goChat() {
      this.clearFriends();
      this.changeMode("chat");
    }
  }
};
</script>

<style scoped>
.mainWrapper {
  padding: 20px;
  margin-bottom: 50px;
}
.topMenu {
  display: flex;
  justify-content: space-between;
  color: #7e98df;
  font-weight: bold;
  font-size: 23px;
}
.friendRequestBox {
  margin-top: 20px;
  padding: 2px;
  border: solid 2px #7e98df;
  border-radius: 10px;
}
.friendRequestBox img {
  width: 100px;
  height: 100px;
}
</style>
