var iconv = require('iconv-lite');

export function getUserInfoFromToken(token = '') {
  if (!token) {
    token = window.localStorage.getItem('token')
  }
  let info = JSON.parse(iconv.encode(window.atob(token.split(/\./)[1]), 'ISO-8859-1'))
  return {
    id: info['sub'],
    name: info['userName']
  }
}
