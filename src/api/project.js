import request from '@/utils/axios.js'

export function findById(id) {
    return request({
        url: `/project/find/${id}`,
        method: 'GET'
    })
}


export function listProject() {
    return request({
        url: '/project/user',
        method: 'GET',
    })
}


export function saveProject(data) {
    return request({
        url: '/project/save',
        method: 'POST',
        data
    })
}

export function updateProject(data) {
    return request({
        url: '/project/update',
        method: 'PUT',
        data
    })
}

export function updateStatus(projectId, status) {
    return request({
        url: `/project/status/${status}`,
        method: 'GET',
        params: {
            projectId
        }
    })
}

export function removeProject(projectId) {
    return request({
        url: `/project/remove/${projectId}`,
        method: 'DELETE'
    })
}