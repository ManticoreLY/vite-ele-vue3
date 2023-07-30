import request from '@/utils/axios'

export function saveBudgetItem(data) {
    return request({
        url: '/budget/save',
        method: 'POST',
        data
    })
}

export function updateBudgetItem(data) {
    return request({
        url: '/budget/update',
        method: 'PUT',
        data
    })
}

export function removeBudget(id) {
    return request({
        url: `/budget/remove/${id}`,
        method: 'DELETE'
    })
}

export function queryBudgetList({ name }) {
    return request({
        url: '/budget/list',
        method: 'GET',
        params: {
            name
        }
    })
}