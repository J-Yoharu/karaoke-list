import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

/**
 *
 * @param {string} username Endereço de e-mail
 * @param {String} password Senha do usuário
 * @returns {Promise}
 */
export const signUp = (username, password) => createUserWithEmailAndPassword(getAuth(), username, password)

/**
 *
 * @param {String} email Endereço de e-mail do usuário ex: joao@teste.com.br
 * @param {String} password Senha para autenticação
 * @returns {Promise}
 */
export const signIn = (email, password) => signInWithEmailAndPassword(getAuth(), email, password)
