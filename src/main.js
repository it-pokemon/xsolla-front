import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import SuiVue from 'semantic-ui-vue'
import VueTheMask from 'vue-the-mask'
import money from 'v-money';

Vue.config.productionTip = false;

Vue.use(SuiVue);
Vue.use(VueTheMask);
Vue.use(money, {
  decimal: '.',
  thousands: ' ',
  precision: 2,
  masked: true
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
