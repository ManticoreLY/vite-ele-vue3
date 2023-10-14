import request from '@/utils/axios.js'

export function listAll({ userId, start, end }) {
    return request({
        url: '/record/list',
        method: 'GET',
        params: {
            userId, start, end
        }
    })
}

export function saveRecord(data) {
    return request({
        url: '/record/save',
        method: 'POST',
        data
    })
}

export function removeItem(id) {
    return request({
        url: `/record/remove/${id}`,
        method: 'DELETE'
    })
}