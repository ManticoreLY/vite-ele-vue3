import Cookies from 'js-cookie'

const expiresTime = 1 // 过期时间1天
function set(key, value) {
    Cookies.set(key ,value, { expires: expiresTime })
}

export function get(key) {
    return Cookies.get(key)
}

function remove(key) {
    Cookies.remove(key)
}

export default { set, get, remove }