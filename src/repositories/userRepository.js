import client from '@/plugins/client'

const prefix = 'users'

export const createUser = (data = {}) => client.post(`${prefix}`, data)
