import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'article-search',
      component: HomeView
    },
    {
      path: '/saved-articles',
      name: 'favorites',
      component: FavoritesView
    }
  ]
})

export default router
