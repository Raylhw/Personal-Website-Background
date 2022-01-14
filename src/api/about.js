import request from '@/utils/request'

//获取url
export function getAboutUrl() {
    return request({
        url: '/api/about',
        method: 'get'
    })
}

//设置url
export function setAboutUrl(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}