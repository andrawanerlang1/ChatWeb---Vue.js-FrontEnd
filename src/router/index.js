import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Maps from "../views/Maps.vue";
import Chat from "../views/Chat.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
