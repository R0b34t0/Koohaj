import { createRouter, createWebHashHistory } from 'vue-router'
import Unos from '../components/Unos'
import Home from '../components/Home'
import PregledUnosa from '../views/PregledUnosa'


import {auth} from '../../firebase'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/unos',
    name: 'Unos',
    component: Unos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pregledUnosa',
    name: 'PregledUnosa',
    component: PregledUnosa,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/");
    alert("Prijavite se da pristupite unosu")
  } else {
    next();
  }
});

export default router
