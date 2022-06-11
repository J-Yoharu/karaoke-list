export const pushQueryParams = params => {
  const url = new URL(window.location.href)
  Object.keys(params).forEach(key => {
    if (params[key] == null || params[key] == '' || params[key] == []) {
      url.searchParams.delete(key)
      return
    }
    let value = typeof params[key] == 'object' ? JSON.stringify(params[key]) : params[key]
    url.searchParams.set(key, value)
  })
  history.replaceState(history.state, null, url)
  console.log('aqui')
}

export default {
  pushQueryParams,
}
