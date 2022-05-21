// token存储到本地

const Tokenkey = 'hrsass-token'  //设定一个独一无二的key

export function getToken () {
  return localStorage.getItem(Tokenkey)
}

export function setToken (token) {
  return localStorage.setItem(Tokenkey,token)
}

export function removeToken () {
  return localStorage.removeItem(Tokenkey)
}