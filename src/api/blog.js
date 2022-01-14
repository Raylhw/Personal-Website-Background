// 向服务器发送请求,获取文章
import request from '@/utils/request'

//分页获取文章
export function getBlogs(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}

//获取单篇文章
export function getBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get'
    })
}

//发布文章
export function addBlog(data) {
    return request({
        url: "/api/blog",
        method: "post",
        data
    })
}

//修改文章
export function editBlog(id, data) {
    return request({
        url: `/api/blog/${id}`,
        method: 'put',
        data
    })
}

//删除文章
export function deleteBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "delete",
    })
}