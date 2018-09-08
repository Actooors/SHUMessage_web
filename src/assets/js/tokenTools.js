export function getUserInfoFromToken() {
  let token = window.localStorage.getItem('token')
  let info = window.atob(token.split(/\./)[1])
  return {
    id: info['sub'],
    name: info['name']
  }
}
