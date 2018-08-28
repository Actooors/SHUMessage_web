import axios from 'axios'

axios.interceptors.request.use((config) => {
  // let token = window.localStorage.getItem("token")
  let token = `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwNzc1NCIsImV4cCI6MTUzNTg3MjQ1NCwiaWF0IjoxNTM1NDQwNDU0fQ.qNm_gP6ttuPTonXKBhilb_7OBYaOtgwaQy8fbhfURJ0UaGoX4u0SkxlBAitO_fDZAyATq8l1Pfp49eYNEzjl9g`
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (err) => {
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
  return Promise.reject(err)
})
