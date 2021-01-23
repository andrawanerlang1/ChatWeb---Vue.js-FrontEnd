<template>
  <div class="mainWrapper">
    <div class="topMenu">
      <div>Andtalk</div>
      <div class="dropdown">
        <b-dropdown
          id="dropdown-right"
          right
          text="Right align"
          variant="white"
          class="m-2"
          no-caret
        >
          <template slot="button-content">
            <img src="../../assets/icon/Menu.png" />
          </template>

          <b-dropdown-item
            @click="selectMode('profile')"
            variant="primary"
            class="dropOption"
            ><img src="../../assets/icon/setting.png" />
            Settings</b-dropdown-item
          >
          <b-dropdown-item
            @click="selectMode('contact')"
            variant="primary"
            class="dropOption"
            ><img
              src="../../assets/icon/contact.png"
            />Contacts</b-dropdown-item
          >
          <b-dropdown-item
            @click="selectMode('invite')"
            variant="primary"
            class="dropOption"
            ><img src="../../assets/icon/invite.png" />Invite
            Friends</b-dropdown-item
          >
          <b-dropdown-item href="#" variant="primary" class="dropOption"
            ><img src="../../assets/icon/faq.png" />Andtalk
            Faqs</b-dropdown-item
          >
          <b-dropdown-item
            @click="loggingout"
            variant="primary"
            class="dropOption"
            ><img src="../../assets/icon/logout.png" />Logout</b-dropdown-item
          >
        </b-dropdown>
      </div>
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
          placeholder="Type your message .."
        ></b-form-input>
      </div>
      <div class="searchImage">
        <img src="../../assets/icon/Plus.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
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
    ...mapActions(["changeMode", "logout", "getUserByIds"]),
    getUserById() {
      this.getUserByIds(this.user.user_id);
    },
    selectMode(param) {
      this.changeMode(param);
    },
    loggingout() {
      this.logout();
    }
  }
};
</script>

<style scoped>
.mainWrapper {
  padding: 20px;
}
.topMenu {
  display: flex;
  justify-content: space-between;
  color: #7e98df;
  font-weight: bold;
  font-size: 23px;
}
.dropdown {
  top: -7px;
}
.dropOption {
  line-height: 30px;
}
.dropOption:hover {
  color: black;
  background-color: black;
  line-height: 50px;
  font-size: 20px;
}
.dropOption img {
  margin-right: 20px;
  width: 25px;
}
.searchMessage {
  display: flex;
  justify-content: space-between;
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

@media screen and (max-width: 500px) {
}
</style>
