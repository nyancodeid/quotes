import { ref } from 'vue';
import { toBlob } from 'html-to-image';
import { changeDpiBlob } from 'changedpi';
import { saveAs } from 'file-saver';
import { scale } from './helpers';

export const useSaveQuoteCard = () => {
  const card = ref<HTMLDivElement>();

  const exportCard = async () => {
    const element = card.value;

    if (!element) return;
    
    const BASE_DPI = 72;
    const SCALE_FACTOR = 2;

    let image = await toBlob(element, {
      width: scale(element.offsetWidth, SCALE_FACTOR),
      height: scale(element.offsetHeight, SCALE_FACTOR),
      style: {
        transform: `scale(${SCALE_FACTOR})`,
        transformOrigin: 'top left',
        width: element.offsetWidth + 'px',
        height: element.offsetHeight + 'px'
      },
      filter: (node) => !node.classList?.contains('button-save')
    });

    if (image) image = await changeDpiBlob(image, BASE_DPI * SCALE_FACTOR);
    if (!image) return;
    
    saveAs(image, `quotes-nyandev-id-${Date.now()}.png`);
  }

  return {
    card,
    exportCard
  }
}