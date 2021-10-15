import { ref } from "vue";
import { useStorage } from "@vueuse/core";

export const isFavoriteShow = ref(false);
export const favoriteLists = useStorage<string[]>("favorite-lists", []);

export function toggleFavoriteShow (){
  isFavoriteShow.value = !isFavoriteShow.value
}

export function isFavorite (id: string): boolean {
  const found = favoriteLists.value.find(quoteId => quoteId === id);

  return (!!found);
}

export function toggleIsFavorite (id: string): void {
  if (isFavorite(id)) {
    favoriteLists.value = favoriteLists.value.filter(quoteId => quoteId !== id);
  } else {
    favoriteLists.value.push(id);
  }
}