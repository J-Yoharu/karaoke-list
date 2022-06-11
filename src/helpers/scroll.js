export const getScrollPercentDistance = element => {
  if (!element) return false
  const scrollHeight = element.scrollHeight - element.clientHeight
  const { scrollTop } = element
  return (scrollTop * 100) / scrollHeight
}
