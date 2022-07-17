const prefix = 'musics'
import client from '@/plugins/client'

export const musicsPackages = (params = {}) => {
  return new Promise((resolve, reject) => {
    resolve({ data: ['37A', '37B', '37C', '37D', '37E'] })
  })
  // client.get(`${prefix}/packages`, { params })
}
export const autocomplete = text => client.get(`/${prefix}/autocomplete`, { params: { text } })
export const searchMusic = (page = 1, text) => client.get(`/${prefix}/search?page=${page}`, { params: { text } })
export const index = (args = {}) => client.get(`/${prefix}`, { params: args })

export default {
  musicsPackages,
}
