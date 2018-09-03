import axios from 'axios'

axios.interceptors.request.use((config) => {
  // let token = window.localStorage.getItem("token")
  let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjEyMjEzMSIsImV4cCI6MTUzNjQwNjUzMSwiaWF0IjoxNTM1OTc0NTMxfQ.5NqCl9cLpNB54BGJBhszMBprhMvyB_47vYsc4HLidWZNCVzd_oE6WFB7thw6TF17cBH27JAWjp_0Fy06qFlRcA`
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
