const prefix = 'users'

export const musicsPackages = (params = {}) => {
  return new Promise((resolve, reject) => {
    resolve({ data: ['37A', '37B', '37C', '37D', '37E'] })
  })
  // client.get(`${prefix}/packages`, { params })
}

export default {
  musicsPackages,
}
