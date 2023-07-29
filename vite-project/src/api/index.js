import request from '@/utils/axios.js'
const base = (name) => {
    return {
        list() {
            return request({
                url: `/${name}/list`,
                method: 'GET'
            })
        },
        find(id) {
          return request({
              url: `/${name}/find/${id}`,
              method: 'GET'
          })
        },
        save(data) {
            return request({
                url: `/${name}/save`,
                method: 'POST',
                data
            })
        },
        update(data) {
            return request({
                url: `/${name}/update`,
                method: 'PUT',
                data
            })
        },
        remove(id) {
            return request({
                url: `/${name}/remove/${id}`,
                method: 'DELETE'
            })
        }
    }
}

export default base