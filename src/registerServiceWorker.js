if ('serviceWorker' in navigator) {
  if (navigator.serviceWorker.controller) console.log('PWA Builder active service worker found, no need to register')
  else
    navigator.serviceWorker
      .register(`service-worker.js`, {
        scope: './',
      })
      .then(res => {
        console.log(`PWA Register ${res.scope}`)
      })
      .catch(error => {
        console.error('falha ao regiostrar sw')
      })
}
