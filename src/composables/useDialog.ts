import { onMounted, ref } from 'vue'
import { onKeyUp } from '@vueuse/core'

import { IQuote } from '../types.d'

const useDialog = () => {
  const isShowDialog = ref(false)
  const selectedQuote = ref<IQuote>()

  const showDialog = (quote: IQuote, event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('hide-on-save')) return

    isShowDialog.value = true
    selectedQuote.value = quote
  }

  const closeDialog = (event: Event): void => {
    const element = (event.target as HTMLElement)
    if (element.classList.contains('hide-on-save') || !isShowDialog.value) return

    isShowDialog.value = false
    selectedQuote.value = undefined
  }

  onMounted(() => {
    onKeyUp('Escape', event => closeDialog(event))
  })

  return {
    isShowDialog,
    selectedQuote,
    showDialog,
    closeDialog,
  }
}

export default useDialog
