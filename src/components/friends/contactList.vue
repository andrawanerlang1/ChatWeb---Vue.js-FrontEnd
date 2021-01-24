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
        <b-container fluid @click="showModal(index)">
          <b-row style="text-align:center">
            <b-col>
              <img
                v-if="!item.user_image"
                src="../../assets/icon/profilestock.jpg"
              />
              <img
                id="imageUploads"
                class="imgUpload"
                v-if="item.user_image"
                :src="'http://localhost:3000/user/' + item.user_image"
              />
            </b-col>
            <b-col>
              <br />
              {{ item.user_name }} <br />
              {{ item.user_email }}
            </b-col>
          </b-row></b-container
        >
      </div>
    </div>
    <b-modal id="modalAcceptFriend" hide-footer>
      <template #modal-title>
        Accept this user as friend?
      </template>
      <div class="d-block text-center">
        <img
          v-if="!friendReqs[userIndex].user_image"
          style="width:100px;height:100px"
          src="../../assets/icon/profilestock.jpg"
        />
        <img
          id="imageUploads"
          style="width:100px;height:100px"
          class="imgUpload"
          v-if="friendReqs[userIndex].user_image"
          :src="
            'http://localhost:3000/user/' + friendReqs[userIndex].user_image
          "
        />
        <br />
        <div>
          {{ friendReqs[userIndex].user_name }} <br />
          {{ friendReqs[userIndex].user_email }}
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="acceptFriendClick(friendReqs[userIndex].user_id)"
        >Accept</b-button
      >
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
        >Cancel</b-button
      >
    </b-modal>
    <div class="friend">
      <p><b> Friend List </b></p>
      <div
        class="friendRequestBox"
        v-for="(item, index) in friendList"
        :key="index"
      >
        <b-container fluid>
          <b-row style="text-align:center">
            <b-col>
              <img
                v-if="!item.user_image"
                src="../../assets/icon/profilestock.jpg"/>
              <img
                id="imageUploads"
                class="imgUpload"
                v-if="item.user_image"
                :src="'http://localhost:3000/user/' + item.user_image"
            /></b-col>
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
      searchParam: null,
      userIndex: 0
    };
  },
  created() {
    this.getFriendReqs(this.user.user_id);
    this.getFriendList(this.user.user_id);
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      friendReqs: "getterFriendReqs",
      friendList: "getterFriendList"
    })
  },
  methods: {
    ...mapActions([
      "addFriends",
      "acceptFriends",
      "getFriendReqs",
      "getFriendList",
      "clearFriends",
      "changeMode"
    ]),
    async acceptFriendClick(id) {
      const setData = { user_id: this.user.user_id, friend_id: id };
      await this.addFriends(setData);
      const setDataReverse = { user_id: id, friend_id: this.user.user_id };
      await this.acceptFriends(setData);
      await this.acceptFriends(setDataReverse);
      this.$router.go();
    },
    showModal(index) {
      this.userIndex = index;
      console.log(index);
      this.$bvModal.show("modalAcceptFriend");
    },
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
