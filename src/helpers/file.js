export const forEachFile = (files, callback) => {
  Object.keys(files).forEach(key => {
    callback(files[key])
  })
}
