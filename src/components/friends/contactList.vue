<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>Contacts</div>
      <div></div>
    </div>
    <div class="friend">
      <p><b> Friend Request </b></p>
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
    <div class="friend">
      <p><b> Friend List </b></p>
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
.friend {
  margin-top: 30px;
  color: #7e98df;
}
.friend p {
  border-bottom: #7e98df 4px dashed;
}
.friendRequestBox {
  margin-top: 20px;
  padding: 2px;
  border: solid 2px #7e98df;
  border-radius: 10px;
}
.friendRequestBox:hover {
  background-color: #7e98df;
  color: black;
  border: black 3px solid;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2), 0 10px 10px 0 rgba(0, 0, 0, 0.19);
}
.friendRequestBox img {
  border-radius: 15px;
  width: 100px;
  height: 100px;
}
</style>
