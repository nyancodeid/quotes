import { RouteRecordRaw } from 'vue-router'

import quotes from '../assets/quotes.json'
import QuotePage from '../views/QuotePage.vue'

export const quoteRouteLists: RouteRecordRaw[] = quotes.map((quote) => {
  return {
    path: `/quote/${quote.slug}`,
    name: `quote-page-${quote.id}`,
    component: QuotePage,
    meta: {
      quote,
    },
  }
})
