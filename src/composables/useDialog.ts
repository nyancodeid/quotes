import { ref } from 'vue'
import { onKeyUp } from '@vueuse/core'

import { Quote } from '../types.d'

const useDialog = () => {
  const isShowDialog = ref(false)
  const selectedQuote = ref<Quote>()

  const closeDialog = (event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('button-save')) return

    isShowDialog.value = false
    selectedQuote.value = undefined
  }

  const showDialog = (quote: Quote, event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('button-save')) return

    isShowDialog.value = true
    selectedQuote.value = quote
    // listen to escape event only when show dialog is open
    onKeyUp('Escape', closeDialog)
  }

  return {
    isShowDialog,
    selectedQuote,
    showDialog,
    closeDialog,
  }
}

export default useDialog
