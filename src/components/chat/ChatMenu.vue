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
    <div class="profileImage">
      <img v-if="!user.user_image" src="../../assets/icon/profilestock.jpg" />
      <img
        id="imageUploads"
        class="imgUpload"
        v-if="user.user_image"
        :src="'http://localhost:3000/user/' + user.user_image"
      />
    </div>
    <div class="namePlate">
      <div>
        {{ user.user_name }}
      </div>
      <p>
        {{ user.user_bio }}
      </p>
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
        <img
          @click="$bvModal.show('modalFriendList')"
          src="../../assets/icon/Plus.png"
          alt=""
        />
        <b-modal id="modalFriendList" hide-footer>
          <template #modal-title>
            Friend i would like to chat
          </template>
          <div class="friend">
            <div
              class="friendRequestBox"
              v-for="(item, index) in friendList"
              :key="index"
            >
              <b-container fluid @click="createRoom(item.user_id)">
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
                </b-row>
              </b-container>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    {{ chatRoom }}
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
  created() {
    this.getFriendList(this.user.user_id);
    this.getChatRoom(this.user.user_id);
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      chatRoom: "getChatRoom",
      friendList: "getterFriendList"
    })
  },
  methods: {
    ...mapGetters(["setUser"]),
    ...mapActions([
      "changeMode",
      "logout",
      "getUserByIds",
      "getFriendList",
      "createRoomChat",
      "getChatRoom"
    ]),
    getUserById() {
      this.getUserByIds(this.user.user_id);
    },
    createRoom(id) {
      const setData = {
        user_a: this.user.user_id,
        user_b: id
      };
      this.createRoomChat(setData)
        .then(result => {
          this.$toasted.success(result);
        })
        .catch(error => {
          this.$toasted.error(error);
        });
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
.profileImage {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
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
  margin-bottom: 40px;
}
.namePlate div {
  font-size: 27px;
  font-weight: bold;
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
