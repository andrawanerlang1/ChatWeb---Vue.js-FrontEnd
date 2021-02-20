<template>
  <div class="chat">
    <div class="profileSection">
      <div class="userPlate" @click="showProfile">
        <div class="imagePlate">
          <img
            v-if="!chatActive.user_image"
            style="width:70px;height:70px;border-radius:15px;"
            src="../../assets/icon/profilestock.jpg"
          />
          <img
            id="imageUploads"
            class="imgUpload"
            style="width:70px;height:70px;border-radius:15px;"
            v-if="chatActive.user_image"
            :src="`http://${URL}/user/` + chatActive.user_image"
          />
        </div>
        <div class="namePlate" style="margin-top:10px">
          {{ chatActive.user_name }}
          <br />
          Online
        </div>
      </div>
      <div class="menuPlate">
        <img
          src="../../assets/icon/profileMenu.png"
          style="width:20px;height:20px;margin-top:20px"
          alt=""
        />
      </div>
    </div>

    <div class="chat-window">
      <div class="history">
        <div v-for="(value, index) in messagesHistory" :key="index">
          <div class="leftChat" v-if="value.user_name === user.user_name">
            <span> {{ value.message }}</span>
            <img
              class="imageChatRoom"
              v-if="!user.user_image"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="user.user_image"
              :src="`http://${URL}/user/` + user.user_image"
            />
          </div>

          <div class="rightChat" v-else>
            <img
              v-if="!chatActive.user_image"
              class="imageChatRoom"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="chatActive.user_image"
              :src="`http://${URL}/user/` + chatActive.user_image"
            />
            <span> {{ value.message }}</span>
          </div>
        </div>
      </div>
      <div class="output">
        <div v-for="(value, index) in messages" :key="index">
          <div class="leftChat" v-if="value.username === user.user_name">
            <span> {{ value.message }}</span>
            <img
              class="imageChatRoom"
              v-if="!user.user_image"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="user.user_image"
              :src="`http://${URL}/user/` + user.user_image"
            />
          </div>

          <div class="rightChat" v-else>
            <img
              v-if="!chatActive.user_image"
              class="imageChatRoom"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="chatActive.user_image"
              :src="`http://${URL}/user/` + chatActive.user_image"
            />
            <span> {{ value.message }}</span>
          </div>
        </div>
      </div>
      <br />
      <p v-if="typing.isTyping" style="text-align:center">
        <em v-if="typing.username === chatActive.user_name"
          >{{ typing.username }} is typing a message...</em
        >
      </p>
    </div>
    <div class="input-window">
      <form v-on:submit.prevent="sendMessage">
        <input
          class="message"
          v-model="message"
          type="text"
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      URL: process.env.VUE_APP_URL + "/fileUploadsApi3",
      socket: io(`http://${process.env.VUE_APP_SOCKET}`),
      message: "",
      coordinate: {
        lat: 10,
        lng: 10
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      chatActive: "getterChatActive",
      messages: "getterMessages",
      typing: "getterTyping",
      messagesHistory: "getterMessagesHistory",
      userByIdFriend: "getterUserByIdFriend"
    })
  },
  watch: {
    message(value) {
      value
        ? this.socket.emit("typing", {
            username: this.user.user_name,
            room: this.chatActive.room_id,
            isTyping: true
          })
        : this.socket.emit("typing", {
            room: this.chatActive.room_id,
            isTyping: false
          });
    }
  },
  methods: {
    ...mapGetters(["setUser", "getterChatActive"]),
    ...mapActions(["sendMessages", "getUserByIdFriend", "changeMode"]),

    sendMessage() {
      const setData = {
        username: this.user.user_name,
        message: this.message,
        room: this.chatActive.room_id
      };
      this.socket.emit("roomMessage", setData);
      const sendNotif = {
        username: this.user.user_name,
        room: this.chatActive.user_id,
        notif: true
      };
      this.socket.emit("roomMessage", sendNotif);

      const dataMessage = {
        room_id: this.chatActive.room_id,
        sender: this.user.user_id,
        receiver: this.chatActive.user_id,
        message: this.message
      };
      this.sendMessages(dataMessage);
      this.message = "";
    },
    async showProfile() {
      const id = this.chatActive.user_id;
      await this.getUserByIdFriend(id);
      await this.changeMode("friendProfile");
    }
  }
};
</script>

<style scoped>
.chat {
  background-color: rgb(247, 242, 242);
  border-left: 1px solid rgb(235, 227, 227);
  width: 100%;
}
.chat-window {
  height: 500px;
  padding: 20px;
  overflow: auto;
}
.chat-window::-webkit-scrollbar {
  display: none;
}
.leftChat {
  color: white;
  text-align: right;
}
.leftChat span {
  background-color: #7e98df;
  padding: 10px;
  border-radius: 15px 15px 0px 15px;
}
.rightChat {
  color: white;
}
.rightChat span {
  background-color: #7e98df;
  border-radius: 15px 15px 15px 0px;
  padding: 10px;
}
.imageChatRoom {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
.profileSection {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-right: 30px;
}
.userPlate {
  display: flex;
  justify-content: left;
}
.userPlate:hover {
  font-weight: bold;
  color: #7e98df;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
}
.userPlate div {
  margin-right: 20px;
}
.input-window {
  background-color: white;
  padding: 20px;
  width: 100%;
}
.input-window input {
  width: 85%;
  border: 0px;
  background-color: rgb(233, 227, 227);
  height: 50px;
  padding: 10px;
  border-radius: 15px;
  margin-right: 5%;
}
.input-window button {
  background-color: #7e98df;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  border: 0px;
  padding: 10px;
}
</style>
