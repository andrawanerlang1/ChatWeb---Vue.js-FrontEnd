import axios from "axios";

export default {
  state: {
    chatRoom: [],
    chatActive: {},
    chatMode: false,
    mode: "chat",
    messages: [],
    messagesHistory: [],
    typing: {}
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    },
    setChatRoom(state, payload) {
      state.chatRoom = payload;
    },
    clearChatRoom(state) {
      state.chatRoom = [];
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
    setMessagesHistory(state, payload) {
      state.messagesHistory = payload;
    },
    clearMessages(state) {
      state.messages = [];
      state.messagesHistory = [];
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
          .post(`https://${process.env.VUE_APP_URL}/chat/room`, payload)
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
          .get(`https://${process.env.VUE_APP_URL}/chat/room/${payload}`)
          .then(result => {
            context.commit("setChatRoom", result.data.data);
            resolve(result);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    },
    getMessagesHistory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://${process.env.VUE_APP_URL}/chat/message/${payload}`)
          .then(result => {
            const historyMessage = result.data.data.slice(
              Math.max(result.data.data.length - 200, 0)
            );
            context.commit("setMessagesHistory", historyMessage);
            resolve(result);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    },
    sendMessages(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .post(`https://${process.env.VUE_APP_URL}/chat/message`, payload)
          .then(result => {
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
    getterMessagesHistory(state) {
      return state.messagesHistory;
    },
    getterTyping(state) {
      return state.typing;
    }
  }
};
