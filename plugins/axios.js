import axios from 'axios'
const baseURL = '/api/'
const onRequest = (config) => {
  return config
}
const onRequestError = (err) => {
  return Promise.reject(err)
}
const onResponse = (response) => {
  if (response.data.code == 200) {
    return response
  } else {
    return Promise.reject((response.data && response.data.message) || '未知错误')
  }
}
const onResponseError = (err) => {
  return Promise.reject(err)
}
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
instance.interceptors.request.use((config) => onRequest(config), (err) => onRequestError(err))
instance.interceptors.response.use((response) => onResponse(response), (err) => onResponseError(err))
const get = (url, params) => instance.get(url, { params })
const post = (url, data) => instance.post(url, data)
export { get, post }
export default ({ app, store }, inject) => {
  const nuxtAxios = app.$axios
  nuxtAxios.setHeader('Content-Type', 'application/json')
  nuxtAxios.onRequest(config => onRequest(config))
  nuxtAxios.onRequestError(err => onRequestError(err))
  nuxtAxios.onResponse(response => onResponse(response))
  nuxtAxios.onResponseError(err => onResponseError(err))
  inject('get', (url, params) => nuxtAxios.$get(baseURL + url, { params }))
  inject('post', (url, data) => nuxtAxios.$post(baseURL + url, data))
  inject('baseURL', baseURL)
}
