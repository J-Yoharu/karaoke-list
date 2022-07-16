import { debounce } from 'lodash'

export const getScrollPercentDistance = element => {
  if (!element) return false
  const scrollHeight = element.scrollHeight - element.clientHeight
  const { scrollTop } = element
  return (scrollTop * 100) / scrollHeight
}

export const scrollToTop = element => {
  element.scroll({
    behavior: 'smooth',
    left: 0,
    top: 0,
  })
}

export const monitoringScroll = (element, callback, delay = 1000) => {
  let isScrolling = false

  const debounceFunc = debounce(() => {
    isScrolling = false
    callback(isScrolling)
  }, delay)

  return element.addEventListener('scroll', function () {
    isScrolling = true
    debounceFunc()
    callback(isScrolling)
  })
}
