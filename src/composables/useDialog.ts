import { ref } from 'vue'

import { IQuote } from '../types.d'

const useDialog = () => {
  const isShowDialog = ref(false)
  const selectedQuote = ref<IQuote>()

  const showDialog = (quote: IQuote, event: Event): void => {
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
