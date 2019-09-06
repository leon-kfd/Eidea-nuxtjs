// const baseURL = 'http://localhost:3001/'
// const instance = axios.create({
//   baseURL,
//   timeout: 3000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

export default ({ app }, inject) => {
  const baseURL = '/api/'
  const instance = app.$axios
  instance.setHeader('Content-Type', 'application/json')
  instance.onRequest(config => {
    return config
  })
  instance.onRequestError(err => {
    return Promise.reject(err)
  })
  instance.onResponse(response => {
    if (response.data.code == 200) {
      return response
    } else {
      return Promise.reject(new Error(response.data.message))
    }
  })
  instance.onResponseError(err => {
    return Promise.reject(err)
  })
  inject('get', (url, params) => instance.$get(baseURL + url, { params }))
  inject('post', (url, data) => instance.$post(baseURL + url, data))
  inject('baseURL', baseURL)
}
