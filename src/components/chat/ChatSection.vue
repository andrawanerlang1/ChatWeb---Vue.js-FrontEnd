<template>
  <div class="chat">
    <div class="profileSection">
      <div class="userPlate">
        <div class="imagePlate">
          <img
            src="../../assets/icon/profilestock.jpg"
            style="width:70px;height:70px;border-radius:15px;"
            alt=""
          />
        </div>
        <div class="namePlate" style="margin-top:10px">
          Nama User
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
      ini bagian chat window
      <div class="output">
        <p v-if="typing.isTyping">
          <em>{{ typing.username }} is typing a message...</em>
        </p>
        <p v-for="(value, index) in messages" :key="index">
          <strong>{{ value.username }} :</strong>
          {{ value.message }}
        </p>
      </div>
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
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      socket: io("http://localhost:3000"),
      username: "",
      message: "",
      messages: [],
      room: "",
      oldRoom: "",
      typing: {
        isTyping: false
      }
    };
  },
  watch: {
    message(value) {
      value
        ? this.socket.emit("typing", {
            username: this.username,
            room: this.room,
            isTyping: true
          })
        : this.socket.emit("typing", {
            room: this.room,
            isTyping: false
          });
    }
  },
  created() {
    this.socket.on("chatMessage", data => {
      this.messages.push(data);
    });
    this.socket.on("typingMessage", data => {
      this.typing = data;
    });
  },
  methods: {
    sendMessage() {
      const setData = {
        username: this.username,
        message: this.message,
        room: this.room
      };
      this.socket.emit("roomMessage", setData);
      this.message = "";
    },
    selectRoom(data) {
      console.log(data);
      if (this.oldRoom) {
        console.log("sudah pernah masuk ke room " + this.oldRoom);
        console.log("dan akan masuk ke room " + data);
        this.socket.emit("changeRoom", {
          username: this.username,
          room: data,
          oldRoom: this.oldRoom
        });
        this.oldRoom = data;
      } else {
        console.log("belum pernah masuk ke ruang manapun");
        console.log("dan akan masuk ke room " + data);
        this.socket.emit("joinRoom", {
          username: this.username,
          room: data
        });
        this.oldRoom = data;
      }
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
