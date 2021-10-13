import { Quote } from "../types";
import {ref} from "vue"

export const isShowLike = ref(false)
export function showLikeToggle(){
  isShowLike.value = !isShowLike.value
}

export function isQuoteLike(quoteId: string) {
  const savedLike = localStorage.getItem(quoteId);
  return savedLike ? true : false
}

export function likeTriggerQuote(quote: Quote) {
  if (isQuoteLike(quote.id)) {
    localStorage.removeItem(quote.id);
  } else {
    localStorage.setItem(quote.id, JSON.stringify(quote));
  }
}
