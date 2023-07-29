import axios from 'axios'

const server = axios.create({
    baseURL: 'http://192.168.2.14:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
})

server.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

server.interceptors.response.use(response => {
    const status = response.status
    if (status !== 200) {
        return Promise.reject(response.error)
    } else {
        const data = response.data
        if (data.code === 200) return Promise.resolve(data)
        else return Promise.reject(data.message)
    }
}, e => {
    return Promise.reject(e.error)
})

export default server