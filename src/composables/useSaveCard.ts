import { ref } from 'vue'
import { toBlob } from 'html-to-image'
import { changeDpiBlob } from 'changedpi'
import { saveAs } from 'file-saver'
import { scale } from '../utils/helpers'

const useSaveCard = () => {
  const card = ref<HTMLDivElement>()

  const saveCard = async() => {
    const element = card.value

    if (!element) return

    const BASE_DPI = 72
    const SCALE_FACTOR = 2

    let image = await toBlob(element, {
      width: scale(element.offsetWidth, SCALE_FACTOR),
      height: scale(element.offsetHeight, SCALE_FACTOR),
      style: {
        transform: `scale(${SCALE_FACTOR})`,
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
      filter: node => !node.classList?.contains('hide-on-save'),
    })

    if (image) image = await changeDpiBlob(image, BASE_DPI * SCALE_FACTOR)
    if (!image) return

    saveAs(image, `quotes-nyan-my-id-${Date.now()}.png`)
  }

  return {
    card,
    saveCard,
  }
}

export default useSaveCard
