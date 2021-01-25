<template>
  <div class="chat">
    <div class="profileSection">
      <div class="userPlate">
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
            :src="'http://localhost:3000/user/' + chatActive.user_image"
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
      <div class="output">
        <div v-for="(value, index) in messages" :key="index">
          <div class="leftChat" v-if="value.username === user.user_name">
            <img
              class="imageChatRoom"
              v-if="!user.user_image"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="user.user_image"
              :src="'http://localhost:3000/user/' + user.user_image"
            />
            <span> {{ value.message }}</span>
          </div>

          <div class="rightChat" v-else>
            <span> {{ value.message }}</span>

            <img
              v-if="!chatActive.user_image"
              class="imageChatRoom"
              src="../../assets/icon/profilestock.jpg"
            />
            <img
              id="imageUploads"
              class="imageChatRoom"
              v-if="chatActive.user_image"
              :src="'http://localhost:3000/user/' + chatActive.user_image"
            />
          </div>
        </div>
      </div>
      <br />
      <p v-if="typing.isTyping" style="text-align:center">
        <em>{{ typing.username }} is typing a message...</em>
      </p>
    </div>
    <div class="input-window">
      <input
        class="message"
        v-model="message"
        type="text"
        placeholder="Message"
      />
      <button class="send" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      socket: io("http://localhost:3000"),
      message: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "setUser",
      chatActive: "getterChatActive",
      messages: "getterMessages",
      typing: "getterTyping"
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
    sendMessage() {
      const setData = {
        username: this.user.user_name,
        message: this.message,
        room: this.chatActive.room_id
      };
      this.socket.emit("roomMessage", setData);

      //kode untuk kirim message ke DATABASE message ==============================================
      const dataMessage = {
        room_id: this.chatActive.room_id,
        sender: this.user.user_id,
        receiver: this.chatActive.user_id,
        message: this.message
      };
      console.log("ini msg ke database");
      console.log(dataMessage);

      // ========================================================
      this.message = "";
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
  height: 800px;
  padding: 20px;
  overflow: auto;
}
.chat-window::-webkit-scrollbar {
  display: none;
}
.leftChat {
  color: white;
}
.leftChat span {
  background-color: #7e98df;
  padding: 10px;
  border-radius: 15px 15px 15px 0px;
}
.rightChat {
  color: white;
  text-align: right;
}
.rightChat span {
  background-color: #7e98df;
  border-radius: 15px 15px 0px 15px;
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
.userPlate div {
  margin-right: 20px;
}
.input-window {
  background-color: white;
  padding: 20px;
}
</style>
