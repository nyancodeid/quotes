import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import QuoteGallery from './views/QuoteGallery.vue'
import QuotePage from './views/QuotePage.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'quote-gallery',
    component: QuoteGallery,
  },
  {
    path: '/quote/:slug?',
    name: 'quote-page',
    component: QuotePage,
    beforeEnter: (to, from, next) => {
      if (!to.params.slug) return false

      next()
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
