// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
export const observerElement = (element, callback, options = {}) => {
  const observer = new IntersectionObserver(callback, options)
  observer.observe(element)
}
