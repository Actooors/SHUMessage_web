var Base64 = require('js-base64').Base64;

export function getUserInfoFromToken(token = '') {
  if (!token) {
    token = window.localStorage.getItem('token')
  }
  let info = JSON.parse(decodeURIComponent(Base64.decode(token.split(/\./)[1])));
  return {
    id: info['sub'],
    name: info['userName']
  }
}
