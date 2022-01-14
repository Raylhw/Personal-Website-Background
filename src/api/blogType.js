// 向服务器发送请求,获取文章分类
import request from '@/utils/request'

//获取所有
export function getBlogTypes() {
    return request({
        url: "/api/blogtype",
        method: "get"
    })
}

//添加
export function addBlogType(data) {
    return request({
        url: "/api/blogtype",
        method: "post",
        data
    })
}

//编辑
export function editBlogType(data) {
    return request({
        url: `/api/blogtype/${data.id}`,
        method: "put",
        data
    })
}


//删除
export function deleteBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: "delete"
    })
}