import request from '@/utils/axios'
import base from '@/api/index'

export default {
    ...base('floorJob'),
    queryFloorJobInfo(buildingId) {
        return request({
            url: '/floorJob/jobInfo',
            method: 'GET',
            params: {
                buildingId
            }
        })
    },
    saveFinishCount(id, finishCount) {
        return request({
            url: `/floorJob/finish/${id}`,
            method: 'GET',
            params: {
                finishCount
            }
        })
    },
    generateProgress(floorId) {
        return request({
            url: '/floorJob/progress',
            method: 'GET',
            params:{
                floorId
            }
        })
    }
}