import { ref } from 'vue';
import domtoimage from 'dom-to-image-improved';
import { saveAs } from 'file-saver';

export const useSaveQuoteCard = () => {
  const card = ref<HTMLDivElement>();

  const exportCard = () => {
    const element = card.value;

    if (!element) return false;
  
    const saveIcon = element.querySelector("div.button-save");
    const classLists = [ "md:scale-150" ];
  
    element.classList.remove(...classLists);
    saveIcon?.classList.add("invisible");
  
    domtoimage.toBlob(element, {
      scale: 1.5
    }).then((blob: Blob) => {
      element.classList.add(...classLists);
      saveIcon?.classList.remove("invisible");
  
      saveAs(blob, `quotes-nyandev-id-${Date.now()}.png`);
    });
  }

  return {
    card,
    exportCard
  }
}