import Vue from "vue";
import Vuex from "vuex";
import router from "./routes";
import StoreData from "./store";
import { initialize } from "./auth/headers";
import App from "./components/App.vue";

import "./assets/styles.css";

import "jquery/src/jquery";
import "popper.js";
import "startbootstrap-sb-admin-2/vendor/jquery/jquery.min.js";
import "startbootstrap-sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "startbootstrap-sb-admin-2/vendor/jquery-easing/jquery.easing.min.js";
import "startbootstrap-sb-admin-2/js/sb-admin-2.min.js";
import "./assets/js/datatables.min";

require("./bootstrap");

import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";

import Vuelidate from "vuelidate";
import "vuelidate/dist/vuelidate.min.js";

window.toastr = require("toastr");

Vue.use(VueToastr2);
Vue.use(Vuex);
Vue.use(Vuelidate);

const store = new Vuex.Store(StoreData);

initialize(store, router);

const app = new Vue({
    router: router,
    store,
    components: { App },
    render: h => h(App)
}).$mount("#app");
