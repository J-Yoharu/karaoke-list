import { observerElement } from '@/helpers/intersectionObserver'
import Vue from 'vue'

Vue.directive('observe', {
  inserted(element, binding) {
    if (typeof binding.value == 'function') {
      observerElement(element, (entries, observer) => {
        let isVisible = entries[0].isIntersecting
        return binding.value(isVisible, { arg: binding.arg, element, entries, observer })
      })
    }
  },
})
