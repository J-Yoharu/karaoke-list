export const getNestedPath = (object, path) => {
  return path.split('.').reduce((itemAccumulator, field) => {
    if (itemAccumulator[field] == undefined) {
      return itemAccumulator
    }
    return itemAccumulator[field]
  }, object)
}
