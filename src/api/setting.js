import request from '@/utils/request'

//获取全局设置
export function getSettings() {
    return request({
        url: '/api/setting',
        method: 'get'
    })
}

//修改全局设置
export function setSettings(data) {
    return request({
        url: '/api/setting',
        method: 'put',
        data
    })
}