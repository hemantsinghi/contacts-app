import Vue from 'vue';
import Router from 'vue-router';
import AddContact from './views/AddContact.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: AddContact,
    },
    {
      path: '/view-edit',
      name: 'view-edit',
      component: () => import(/* webpackChunkName: "about" */ './views/ViewEditContacts.vue'),
    },
  ],
});
