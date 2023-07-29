import request from '@/utils/axios.js'

export function findById(id) {
    return request({
        url: `/user/query/${id}`,
        method: 'GET'
    })
}

export function login({phoneNum, password}) {
    return request({
        url: '/user/access',
        method: 'POST',
        data: {
            phoneNum, password
        }
    })
}

export function queryUserList({ userName, phoneNum, status }) {
    return request({
        url: '/user/all',
        method: 'GET',
        params: {
            userName, phoneNum, status
        }
    })
}

export function saveUser(data) {
    return request({
        url: '/user/save',
        method: 'POST',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/user/update',
        method: 'PUT',
        data
    })
}

export function updateStatus(userId, status) {
    return request({
        url: `/user/status/${status}`,
        method: 'GET',
        params: {
            userId
        }
    })
}

export function removeUser(userId) {
    return request({
        url: `/user/remove/${userId}`,
        method: 'DELETE'
    })
}