import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import Maps from "../views/Maps.vue";
import Chat from "../views/Chat.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
