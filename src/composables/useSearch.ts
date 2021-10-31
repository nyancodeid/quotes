import { ref, reactive, computed } from 'vue'

import { IQuote, SearchType } from '../types.d'
import { NotEmpty } from '../utils/helpers'

export const type = ref(SearchType.Main)
export const filter = ref('quotes')
export const count = ref(0)

export const keyword = reactive({
  main: '',
  favorite: '',
})

export const search = computed({
  get: () => {
    if (type.value === SearchType.Favorite)
      return keyword.favorite

    else
      return keyword.main
  },
  set: (value) => {
    if (type.value === SearchType.Favorite)
      keyword.favorite = value

    else
      keyword.main = value
  },
})

export const searchFilter = (quotes: IQuote[]) => {
  if (search.value.length === 0) return quotes

  return quotes.filter((quote) => {
    switch (filter.value) {
      case 'quotes':
        return (quote.text.toLowerCase().includes(search.value.toLowerCase()))
      case 'from':
        return (quote.author.toLowerCase().includes(search.value.toLowerCase()))
      case 'user':
        if (!quote.github?.available)
          return (quote.username.toLowerCase().includes(search.value.toLowerCase()))

        return (quote.github?.name.toLowerCase().includes(search.value.toLowerCase()))
      default:
        return true
    }
  })
}

/**
 * The list of quotes is filtered first by only displaying
 * the quotes that are in the `favoriteLists` followed by
 * filtering the search. So we have 2 layer filtering
 * process here.
 */
export const favoriteFilter = (lists: string[], quotes: IQuote[]): IQuote[] => {
  const filtered = lists.map((quoteId) => {
    const item = quotes.find(quote => quote.id === quoteId)

    return item || null
  }).filter(NotEmpty)

  return searchFilter(filtered)
}
