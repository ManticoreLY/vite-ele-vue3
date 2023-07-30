import base from '@/api/index'
import request from '@/utils/axios'

export default {
    ...base('account'),
    query({ businessId, personId, start, end }) {
        return request({
            url: '/account/list',
            method: 'GET',
            params: {
                businessId,
                personId,
                start,
                end
            }
        })
    },
    queryBusinessList(name) {
        return request({
            url: '/business/query',
            method: 'GET',
            params: {
                name
            }
        })
    },
    listBusiness() {
        return request({
            url: '/business/list',
            method: 'GET'
        })
    },
    saveBusiness(data) {
        return request({
            url: '/business/save',
            method: 'POST',
            data
        })
    },
    removeBusiness(id) {
        return request({
            url: `/business/remove/${id}`,
            method: 'DELETE'
        })
    }
}