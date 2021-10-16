import { ref } from 'vue'

import { Quote } from '../types.d'

const useDialog = () => {
  const isShowDialog = ref(false)
  const selectedQuote = ref<Quote>()

  const showDialog = (quote: Quote, event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('button-save')) return

    isShowDialog.value = true
    selectedQuote.value = quote
  }
  const closeDialog = (event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('button-save')) return

    isShowDialog.value = false
    selectedQuote.value = undefined
  }

  return {
    isShowDialog,
    selectedQuote,
    showDialog,
    closeDialog,
  }
}

export default useDialog
