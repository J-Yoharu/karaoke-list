import client from '@/plugins/client'

/**
 *
 * @param {string} username Endereço de e-mail
 * @param {String} password Senha do usuário
 * @returns {Promise}
 */
export const signUp = (username, password) => client.post('/login', { email: username, password })

/**
 *
 * @param {String} email Endereço de e-mail do usuário ex: joao@teste.com.br
 * @param {String} password Senha para autenticação
 * @returns {Promise}
 */
export const signIn = (email, password) => client.post('/login', { email, password })

/**
 *
 * @param {String} email Endereço de e-mail que receberá o link para redefinir a senha
 * @returns {Promise}
 */
export const sendEmailResetPassword = email => sendPasswordResetEmail(getAuth(), email)
