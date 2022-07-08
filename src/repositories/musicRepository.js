const prefix = 'musics'
import axios from '@/plugins/axios'

export const musicsPackages = (params = {}) => {
  return new Promise((resolve, reject) => {
    resolve({ data: ['37A', '37B', '37C', '37D', '37E'] })
  })
  // client.get(`${prefix}/packages`, { params })
}
export const autocomplete = text => axios.get(`/${prefix}/autocomplete`, { params: { text } })
export const searchMusic = text => axios.get(`/${prefix}/search`, { params: { text } })
export default {
  musicsPackages,
}
