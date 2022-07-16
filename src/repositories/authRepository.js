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
 * @param {Object} data Valores para a identificação do usuário, deve-se passar value e type=sms|email
 * @returns {Promise}
 */
export const sendResetPasswordNotification = (data = {}) => client.post('/reset-password/send-notification', data)

/**
 *
 * @param {Object} data Valor para a identifacão do código, objeto de code e value
 * @returns {Promise}
 */
export const validCode = (data = {}) => client.post('/reset-password/valid-code', data)

/**
 *
 * @param {Object} data Valores necessários para redefinir a senha, ex: code, value, password
 * @returns {Promise}
 */
export const resetPassword = (data = {}) => client.post('/reset-password', data)
