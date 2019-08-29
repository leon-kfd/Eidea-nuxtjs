import axios from 'axios'

const baseURL = 'http://localhost:3001/'
const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  if (response.data.code == 200) {
    return response.data
  } else {
    return Promise.reject(new Error(response.data.message))
  }
}, (error) => {
  return Promise.reject(error)
})

const get = (url, params) => instance.get(url, { params })
const post = (url, data) => instance.post(url, data)
export { get, post, instance }
export default ({ app }, inject) => {
  inject('get', (url, params) => instance.get(url, { params }))
  inject('post', (url, data) => instance.post(url, data))
}
