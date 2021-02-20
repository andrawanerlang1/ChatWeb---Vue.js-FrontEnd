import axios from "axios";

export default {
  state: {
    friend: {},
    friendReqs: null,
    friendList: null,
    userByIdFriend: {}
  },
  mutations: {
    setFriend(state, payload) {
      state.friend = payload;
    },
    setFriendReqs(state, payload) {
      state.friendReqs = payload;
    },
    setFriendList(state, payload) {
      state.friendList = payload;
    },
    clearFriend(state) {
      state.friend = {};
      state.userByIdFriend = {};
    },
    setUserByIdFriend(state, payload) {
      state.userByIdFriend = payload;
    }
  },
  actions: {
    updateImage(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        const { user_image } = payload;
        const data = new FormData();
        data.append("user_image", user_image);
        axios
          .patch(
            `http://${process.env.VUE_APP_URL}/user/image/${payload.user_id}`,
            data
          )
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(error => {
            console.log(error.response);
            reject(error.response);
          });
      });
    },
    searchUserEmail(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://${process.env.VUE_APP_URL}/user/search?email=${payload}`)
          .then(result => {
            context.commit("setFriend", result.data.data[0]);
            resolve(result);
          })
          .catch(error => {
            context.commit("clearFriend");
            reject(error.response.data.msg);
          });
      });
    },
    searchUserNumber(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://${process.env.VUE_APP_URL}/user/search?number=${payload}`
          )
          .then(result => {
            context.commit("setFriend", result.data.data[0]);
            resolve(result);
          })
          .catch(error => {
            context.commit("clearFriend");

            reject(error.response.data.msg);
          });
      });
    },
    addFriends(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .post(`http://${process.env.VUE_APP_URL}/friend/invite`, payload)
          .then(result => {
            resolve(result.data.msg);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    },
    deleteFriends(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://${process.env.VUE_APP_URL}/friend/delete?user_id=${payload.user_id}&friend_id=${payload.friend_id}`
          )
          .then(result => {
            resolve(result.data.msg);
          })
          .catch(error => {
            console.log(error);
            reject(error.response.data.msg);
          });
      });
    },
    acceptFriends(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://${process.env.VUE_APP_URL}/friend/accept`, payload)
          .then(result => {
            resolve(result.data.msg);
          })
          .catch(error => {
            reject(error.response.data.msg);
          });
      });
    },
    getFriendReqs(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://${process.env.VUE_APP_URL}/friend/friendRequest/${payload}`
          )
          .then(result => {
            console.log(result.data.data);
            context.commit("setFriendReqs", result.data.data);
            resolve(result.data.data);
          })
          .catch(error => {
            console.log(error.response);
            reject(error.response.data.msg);
          });
      });
    },
    getFriendList(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .get(`http://${process.env.VUE_APP_URL}/friend/friendList/${payload}`)
          .then(result => {
            console.log(result.data.data);
            context.commit("setFriendList", result.data.data);
            resolve(result.data.data);
          })
          .catch(error => {
            console.log(error.response);
            reject(error.response.data.msg);
          });
      });
    },
    getUserByIdFriend(context, payload) {
      console.log(context);
      return new Promise((resolve, reject) => {
        axios
          .get(`http://${process.env.VUE_APP_URL}/user/byId/${payload}`)
          .then(result => {
            console.log(result.data.data);
            context.commit("setUserByIdFriend", result.data.data);
            resolve(result.data.data);
          })
          .catch(error => {
            console.log(error.response);
            reject(error.response.data.msg);
          });
      });
    },
    clearFriends(context) {
      context.commit("clearFriend");
    }
  },
  getters: {
    getFriend(state) {
      return state.friend;
    },
    getterFriendList(state) {
      return state.friendList;
    },
    getterFriendReqs(state) {
      return state.friendReqs;
    },
    getterUserByIdFriend(state) {
      return state.userByIdFriend;
    }
  }
};
