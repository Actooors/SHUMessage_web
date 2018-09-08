import axios from 'axios'

axios.interceptors.request.use((config) => {
  // let token = window.localStorage.getItem("token")
  let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjEyMTY0OSIsImV4cCI6MTUzNjYzMDU2MiwiaWF0IjoxNTM2MTk4NTYyfQ.fSy3oB92RvNk3epJmukbPrR7LK3NGgUJh-WQd6mmoeN3CP4EgdO2eW6aIb0xvcSnePh3oKIBvfUMqJYNEhqF8w`
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
