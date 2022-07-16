import { isNumber, isString } from '@/helpers'
import Vue from 'vue'

Vue.directive('mask', {
  inserted(element, binding) {
    const { value: mask, arg } = binding

    const input = element.querySelector('input')

    if (input.value.length) {
      input.value = unformat(input.value, mask)
    }

    input.addEventListener('keypress', e => {
      if (mask.match(/[^#]/g).includes(e.key)) e.preventDefault()

      if (input.value.length > mask.length - 1) e.preventDefault()

      switch (arg) {
        case 'number':
          if (!isNumber(e.key)) e.preventDefault()
          break
        case 'string':
          if (!isString(e.key)) e.preventDefault()
          break
      }
    })

    input.addEventListener('input', event => {
      const { inputType } = event
      if (inputType == 'deleteContentBackward') return

      let unformattedValue = unformat(input.value, mask)

      input.value = format(unformattedValue, mask)
    })
  },
})

export const format = (value, mask) => {
  let specials = mask.match(/[^#]/g)
  let lastSpecialIndex = 0

  specials.forEach(c => {
    let insertIndex = mask.indexOf(c, lastSpecialIndex)
    lastSpecialIndex = insertIndex + 1

    if (value.length < insertIndex) return
    value = [value.slice(0, insertIndex), c, value.slice(insertIndex)].join('')
  })

  return value
}

export const unformat = (value, mask) => {
  let specials = mask.match(/[^#]/g)

  specials.forEach(c => {
    value = value.replace(c, '')
  })
  return value
}
