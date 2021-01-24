import axios from "axios";

export default {
  state: {
    chatRoom: [],
    mode: "chat"
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    },
    setChatRoom(state, payload) {
      state.chatRoom = payload;
    }
  },
  actions: {
    changeMode(context, payload) {
      context.commit("setMode", payload);
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
    }
  }
};
