import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import toasted from "vue-toasted";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";

Vue.use(VueSweetalert2);
Vue.use(VueGeolocation);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCNBqVrRQSZ93YtY0WmoXMG3T75SKIxE00",
    libraries: "places" // This is required
  }
});
Vue.use(toasted, {
  duration: 10000,
  position: "top-right",
  action: {
    text: "Close",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
