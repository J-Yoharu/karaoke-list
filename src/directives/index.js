import { capitalize } from '@/helpers'
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

Vue.directive('format', {
  inserted(element, binding) {
    const { value, arg: formatter } = binding
    let formatterFunction = null

    if (typeof value == 'function') formatterFunction = value

    switch (formatter) {
      case 'capitalize':
        formatterFunction = capitalize
        break
    }

    if (formatterFunction == null) return

    element.querySelector('input').addEventListener('input', event => {
      let value = formatterFunction(event.target.value)
      if (value) event.target.value = value
    })
  },
})
