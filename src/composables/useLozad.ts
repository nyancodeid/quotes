import { nextTick } from 'vue'
import lozad from 'lozad'

const useLozad = (element: string) => {
  let observer: lozad.Observer

  function setObserver() {
    observer = lozad(element)
  }

  function reObserver() {
    if (!observer) setObserver()

    nextTick(() => {
      observer?.observe()
    })
  }

  return {
    reObserver,
  }
}

export default useLozad
