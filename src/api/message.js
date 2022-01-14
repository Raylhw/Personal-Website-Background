import request from '@/utils/request'

// 分页获取留言板信息
export function getMessages(page = 1, limit = 10) {
    return request({
        url: '/api/message',
        method: 'get',
        params: {
            page,
            limit,
        }
    })
}

// 添加留言板信息
export function addMessage() {
    return request({
        url: '/api/message',
        method: 'post'
    })
}

// 删除留言板信息
export function deleteMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete'
    })
}