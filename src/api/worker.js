import request from '@/utils/axios.js'

export function findById(id) {
    return request({
        url: `/worker/query/${id}`,
        method: 'GET'
    })
}

export function listWorker() {
    return request({
        url: '/worker/list',
        method: 'GET'
    })
}

export function saveWorker(data) {
    return request({
        url: '/worker/save',
        method: 'POST',
        data
    })
}

export function updateWorker(data) {
    return request({
        url: '/worker/update',
        method: 'PUT',
        data
    })
}

export function updateStatus(workerId, status) {
    return request({
        url: `/worker/status/${status}`,
        method: 'GET',
        params: {
            workerId
        }
    })
}

export function removeWorker(workerId) {
    return request({
        url: `/worker/remove/${workerId}`,
        method: 'DELETE'
    })
}

export function listWorkerJob(workerId) {
    return request({
        url: `/worker/job/${workerId}`,
        method: 'GET'
    })
}