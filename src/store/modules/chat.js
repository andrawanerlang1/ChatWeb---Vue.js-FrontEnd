export default {
  state: {
    mode: "chat"
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    }
  },
  actions: {
    changeMode(context, payload) {
      context.commit("setMode", payload);
    }
  },
  getters: {
    getMode(state) {
      return state.mode;
    }
  }
};
