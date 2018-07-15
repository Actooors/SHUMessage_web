import axios from 'axios'

// axios.interceptors.request.use((config) => {
//   let token = window.localStorage.getItem("token")
//   if (token)
//     config.headers.Authorization = token
//   return config
// }, (err) => {
//   return Promise.reject(err)
// })

axios.interceptors.response.use((res) => {
  if (res.status === 401) {
    window.localStorage.clear()
    res.headers.redirect = '/login'
  }
  return res
}, (err) => {
  return Promise.reject(err)
})
