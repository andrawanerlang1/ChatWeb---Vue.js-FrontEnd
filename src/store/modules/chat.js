import axios from "axios";

export default {
  state: {
    chatRoom: [],
    chatActive: {},
    chatMode: false,
    mode: "chat",
    messages: [],
    typing: {}
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    },
    setChatRoom(state, payload) {
      state.chatRoom = payload;
    },
    setChatActive(state, payload) {
      state.chatActive = payload;
    },
    setChatMode(state, payload) {
      state.chatMode = payload;
    },
    pushMessages(state, payload) {
      state.messages.push(payload);
    },
    pushtyping(state, payload) {
      state.typing = payload;
    }
  },
  actions: {
    changeMode(context, payload) {
      context.commit("setMode", payload);
    },
    changeChatActive(context, payload) {
      context.commit("setChatActive", payload);
      context.commit("setChatMode", true);
    },
    clearChatMode(context) {
      context.commit("setChatMode", false);
    },
    createRoomChat(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .post(`http://${process.env.VUE_APP_URL}/chat/room`, payload)
          .then(result => {
            resolve(result.data.msg);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    },
    getChatRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://${process.env.VUE_APP_URL}/chat/room/${payload}`)
          .then(result => {
            context.commit("setChatRoom", result.data.data);
            resolve(result);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    }
  },

  getters: {
    getMode(state) {
      return state.mode;
    },
    getChatRoom(state) {
      return state.chatRoom;
    },
    getterChatActive(state) {
      return state.chatActive;
    },
    getterChatMode(state) {
      return state.chatMode;
    },
    getterMessages(state) {
      return state.messages;
    },
    getterTyping(state) {
      return state.typing;
    }
  }
};
