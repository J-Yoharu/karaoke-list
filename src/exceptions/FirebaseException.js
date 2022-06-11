export default class FirebaseException {
  #codes = {
    'auth/email-already-in-use': 'E-mail já foi utilizado',
    'auth/weak-password': 'Senha utilizada não atende a complexidade exigida',
    'auth/wrong-password': 'Senha incorreta',
    'auth/user-not-found': 'Usuário não encontrado',
  }

  constructor(error) {
    this.message = this.messageHandler(error.code)
  }

  messageHandler(code) {
    return this.#codes[code] ? this.#codes[code] : code
  }
}
