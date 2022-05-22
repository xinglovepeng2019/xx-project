// token存储到本地
import Cookies from 'js-cookie'
const Tokenkey = 'hrsass-token'  //设定一个独一无二的key
const TimeKey = "hrsass-timestamp"

export function getToken () {
  return localStorage.getItem(Tokenkey)
}

export function setToken (token) {
  return localStorage.setItem(Tokenkey,token)
}

export function removeToken () {
  return localStorage.removeItem(Tokenkey)
}

/* 
获取时间戳
*/
export function getTimeStamp () {
  return Cookies.get(TimeKey)
}
/* 
设置时间戳
*/
export function setTimeStamp () {
  return Cookies.set(TimeKey,Date.now())
}