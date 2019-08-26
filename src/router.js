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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ViewEditContacts.vue'),
    },
  ],
});
