import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { ValidationProvider, extend, configure } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const config = {
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
  bails: true,
  skipOptional: true,
  mode: 'aggressive',
  useConstraintAttrs: false,
};

// Sets the options.
configure(config);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
extend('required', {
  ...required,
  message: '{_field_} is required',
});
extend('email', email);
extend('regex', regex);
Vue.component('ValidationProvider', ValidationProvider);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
