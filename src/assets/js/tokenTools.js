export function getUserInfoFromToken(token = '') {
  if (!token) {
    token = window.localStorage.getItem('token')
  }
  let info = JSON.parse(window.atob(token.split(/\./)[1]))
  return {
    id: info['sub'],
    name: info['userName']
  }
}
