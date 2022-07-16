export const canInstall = callback => {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    callback(event)
  })
}

export const install = event => {
  return new Promise((res, rej) => {
    const deferredPrompt = event.prompt()

    deferredPrompt.userChoice
      .then(choiceResult => {
        res(choiceResult.outcome)
      })
      .catch(error => {
        rej(error)
      })
  })
}
