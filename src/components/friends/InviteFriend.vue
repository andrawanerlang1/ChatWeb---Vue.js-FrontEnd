<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>Invite Friend</div>
      <div></div>
    </div>
    <div class="searchMessage">
      <div class="searchInputs">
        <img
          src="../../assets/icon/Search.png"
          alt=""
          style="height: 25px;margin-top:5px; margin-left:5px"
        />
        <b-form-input
          class="searchForm"
          type="text"
          v-model="searchParam"
          placeholder="Search your friend ..."
        ></b-form-input>
      </div>
      <div class="buttonSearch">
        <button @click="searchByEmail">Search by Email</button>
      </div>
      <div class="buttonSearch">
        <button @click="searchByNumber">Search by Number</button>
      </div>
    </div>

    <div v-if="friend.user_email" class="profileImage">
      <img v-if="!friend.user_image" src="../../assets/icon/profilestock.jpg" />
      <img
        id="imageUploads"
        class="imgUpload"
        v-else
        :src="`http://${URL}/user/` + friend.user_image"
      />
      <div class="friendName">
        {{ friend.user_name }}
      </div>
      <div class="inviteFriend">
        <button @click="addFriend">Invite Friend</button>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      URL: process.env.VUE_APP_URL,
      type: "invite",
      searchParam: null
    };
  },
  mounted() {
    this.getUserById();
  },
  computed: {
    ...mapGetters({
      friend: "getFriend",
      user: "setUser"
    })
  },
  methods: {
    ...mapActions([
      "changeMode",
      "searchUserEmail",
      "searchUserNumber",
      "getUserByIds",
      "addFriends",
      "clearFriends"
    ]),
    getUserById() {
      this.getUserByIds(this.user.user_id);
    },
    searchByEmail() {
      if (this.searchParam == this.user.user_email) {
        this.clearFriends();
        return this.$toasted.error("You searched your own email");
      } else if (!this.searchParam) {
        this.clearFriends();
        return this.$toasted.error("Search input is empty");
      }
      this.searchUserEmail(this.searchParam)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          this.$toasted.error(error);
        });
    },
    searchByNumber() {
      if (this.searchParam == this.user.user_number) {
        this.clearFriends();
        return this.$toasted.error("You searched your own number");
      } else if (!this.searchParam) {
        this.clearFriends();
        return this.$toasted.error("Search input is empty");
      }
      this.searchUserNumber(this.searchParam)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          this.$toasted.error(error);
        });
    },
    addFriend() {
      const data = {
        user_id: this.user.user_id,
        friend_id: this.friend.user_id
      };
      this.addFriends(data)
        .then(result => {
          this.$toasted.success(result);
        })
        .catch(error => {
          this.$toasted.error(error);
        });
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
.searchMessage {
  margin-top: 30px;
  text-align: center;
  margin-right: 15px;
}
.searchInput,
.searchImage {
  margin-right: 5px;
}
.searchInputs {
  display: flex;
  background-color: rgb(250, 244, 244);
  border: 0;
  border-bottom: 2px #7e98df solid;
}
.searchForm {
  width: 82%;
  border: 0;
  background-color: transparent;
}
.buttonSearch {
  text-align: left;
}
.buttonSearch button {
  background-color: white;
  border: 2px #7e98df solid;
  color: #7e98df;
  border-radius: 15px;
  margin-top: 15px;
}
.buttonSearch button:hover {
  background-color: #7e98df;
  color: white;
}
.profileImage {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  text-align: center;
}

.profileImage img {
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  object-fit: cover;
  border: #7e98df 2px solid;
}
.friendName {
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
}
.inviteFriend button {
  margin-top: 20px;
  padding: 3px;
  background-color: #7e98df;
  color: white;
  font-weight: 600;
  border-radius: 15px;
  border: #7e98df 2px solid;
}
.inviteFriend button:hover {
  background-color: white;
  color: #7e98df;
  border: #7e98df 2px solid;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2), 0 10px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
