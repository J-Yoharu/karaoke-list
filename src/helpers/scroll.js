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
