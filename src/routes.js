import HomePage from './pages/home.vue';
import ViewPage from './pages/view.vue';
import AddPage from './pages/add.vue';
import NotFoundPage from './pages/not-found.vue';
import Favorite from './pages/favorite.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/favorite/',
    component: Favorite,
  },
  {
    path: '/view/:id',
    component: ViewPage,
  },
  {
    path: '/add/:id?',
    component: AddPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
