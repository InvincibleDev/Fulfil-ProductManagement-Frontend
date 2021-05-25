import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { LayoutPlugin } from 'bootstrap-vue'
import { VBScrollspyPlugin } from 'bootstrap-vue'
import { TablePlugin } from 'bootstrap-vue'
import Notifications from "vue-notification";
import { ModalPlugin } from 'bootstrap-vue'
import { ProgressPlugin } from 'bootstrap-vue'
import UUID from "vue-uuid";

Vue.use(UUID);
Vue.use(ProgressPlugin)
Vue.use(ModalPlugin)
Vue.use(Notifications);
Vue.use(VBScrollspyPlugin)
Vue.use(TablePlugin)
Vue.use(LayoutPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
