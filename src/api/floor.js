import base from '@/api/index'
import request from '@/utils/axios'

export default {
    ...base('floor'),
    saveInBatch({ floorNameList, buildingId }) {
        return request({
            url: '/floor/save/batch',
            method: 'POST',
            data: {
                floorNameList, buildingId
            }
        })
    },
    findByBuildingId(buildingId) {
      return request({
          url: `/floor/list/${buildingId}`,
          method: 'GET'
      })
    },
    listBuildingFloor(buildingId) {
        return request({
            url: `/floor/listFloor/${buildingId}`,
            method: 'GET'
        })
    },
    setFloorJob({ floorList, jobIdList }) {
        return request({
            url: '/floorJob/relate/batch',
            method: 'POST',
            data: {
                floorList,
                jobIdList
            }
        })
    },
    listFloorByJobId(jobId) {
        return request({
            url: `/floorJob/list/${jobId}`,
            method: 'GET'
        })
    }
}