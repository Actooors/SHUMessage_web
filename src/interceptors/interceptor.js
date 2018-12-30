import axios from 'axios'

axios.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (err) => {
  console.log("request interceptor:", err, err.request);
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  if (res.status === 401) {
    console.log("未登录")
    window.localStorage.clear()
    res.headers.redirect = '/login'
  }
  return res
}, (err) => {
  console.log("response interceptor:", err, err.response);
  return Promise.reject(err)
})
