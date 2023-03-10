import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/onShow/:id/seasons/:season/episodes/:episode',
    name: 'episode',
    component: loadPage('EpisodePage')
  },
  {
    path: '/movie/:id',
    name: 'movie',
   component: loadPage('MoviePage'),
  },
  {
    path: '/onShow/:id',
    name: 'activeShow',
   component: loadPage('activeShowPage'),
  },
  {
    path: '/show',
    name: 'show',
   component: loadPage('ShowsPage'),
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
