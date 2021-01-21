<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div class="backButton" style="cursor: pointer;" @click="goChat">
        <img src="../../assets/icon/leftArrow.png" alt="" />
      </div>
      <div>@{{ user.user_email }}</div>
      <div></div>
    </div>
    <div class="profileImage">
      <img src="../../assets/icon/profilestock.jpg" alt="" />
    </div>
    <div class="namePlate">
      <div>
        {{ user.user_name }}
      </div>
      <p>
        {{ user.user_email }}
      </p>
    </div>
    <div class="account">
      <br />
      <b> Account </b>
      <div class="phoneNumber">
        Phone Number
        <b-form-input
          v-if="type === 'edit'"
          type="tel"
          class="inputPhone"
          v-model="user.user_number"
          placeholder="Input phone number"
        ></b-form-input>
        <div class="inputPhone" v-if="type === 'watch'">
          <b> {{ user.user_number }} </b>
        </div>
      </div>
      <div class="username">
        <b-form-input
          v-if="type === 'edit'"
          type="text"
          class="inputName"
          v-model="user.user_name"
          placeholder="Input Username"
        ></b-form-input>
        <div class="inputName" v-if="type === 'watch'">
          <b> {{ user.user_name }} </b>
        </div>
        Username
      </div>
      <div class="username">
        <b-form-input
          v-if="type === 'edit'"
          type="text"
          class="inputName"
          v-model="user.user_bio"
          placeholder="Input Biodata"
        ></b-form-input>
        <div class="inputName" v-if="type === 'watch'">
          <b> {{ user.user_bio }} </b>
        </div>
        Bio
      </div>
      <div class="buttonUpdate">
        <button v-if="type === 'watch'" @click="changeType('edit')">
          Edit Info
        </button>
      </div>
      <div class="buttonUpdate">
        <button v-if="type === 'edit'" @click="updateProfile">
          Save Changes
        </button>
      </div>
      <div class="setting">
        Settings
      </div>
      <button class="changePassword">
        <img
          src="../../assets/icon/lock.png"
          style="margin-right:10px"
          alt=""
        />
        Change Password
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return { type: "watch" };
  },
  mounted() {
    this.getUserById();
  },
  computed: {
    ...mapGetters({
      user: "setUser"
    })
  },
  methods: {
    ...mapGetters(["setUser"]),
    ...mapActions(["changeMode", "getUserByIds", "updateUsers"]),
    getUserById() {
      this.getUserByIds(this.user.user_id);
    },
    updateProfile() {
      if (!this.user.user_name) {
        return this.$toasted.error("Username cannot be empty");
      }
      this.updateUsers(this.user)
        .then(result => {
          this.$toasted.success(result.data.msg);
        })
        .catch(error => {
          this.$toasted.error(error.data.msg);
        });
      this.changeType("watch");
    },
    goChat() {
      this.changeMode("chat");
    },
    changeType(param) {
      this.type = param;
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
.profileImage {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
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
.namePlate {
  text-align: center;
}
.namePlate div {
  font-size: 27px;
  font-weight: bold;
}
.phoneNumber,
.username {
  margin-top: 10px;
  border-bottom: rgb(206, 198, 198) 2px solid;
  padding-bottom: 20px;
  padding-top: 20px;
}
.username {
  color: grey;
}
.inputPhone,
.inputName {
  border: 0;
}
.inputName {
  color: black;
  font-weight: bold;
}
.buttonUpdate {
  margin-top: 20px;
  text-align: center;
}
.buttonUpdate button {
  background-color: white;
  border-radius: 10px;
  color: #7e98df;
  border: #7e98df 1px solid;
  font-weight: bold;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19);
}
.buttonUpdate button:hover {
  background-color: #7e98df;
  border: 0;
  color: white;
}
.setting {
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
}
.changePassword {
  background-color: transparent;
  border: 0;
  margin-top: 40px;
  border-radius: 10px;
  padding: 10px;
}
.changePassword:hover {
  background-color: #7e98df;
  color: white;
}
</style>
