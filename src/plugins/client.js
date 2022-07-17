// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_API,
  // timeout: 1000,
  headers: { Accept: 'application/json' },
})

axiosIns.interceptors.request.use(
  config => {
    // Do something before request is sent

    const accessToken = localStorage.getItem('accessToken')

    // eslint-disable-next-line no-param-reassign
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => Promise.reject(error),
)

export default axiosIns
