import { RouteRecordRaw } from 'vue-router'
import { IQuote } from './types'
import { quoteRouteLists } from './utils/routes'

import QuoteGallery from './views/QuoteGallery.vue'
import QuoteNotFound from './views/QuoteNotFound.vue'

declare module 'vue-router' {
  interface RouteMeta {
    quote: IQuote
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'quote-gallery',
    component: QuoteGallery,
  },
  ...quoteRouteLists,
  {
    path: '/404',
    name: 'not-found',
    component: QuoteNotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
