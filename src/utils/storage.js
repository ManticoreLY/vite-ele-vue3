
export function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getData(key) {
    const obj = localStorage.getItem(key)
    return JSON.parse(obj);
}

export function removeData(key) {
    localStorage.removeItem(key)
}