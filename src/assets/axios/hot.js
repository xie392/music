// 推荐接口
import request from "./Http";

// 热搜
export function hot(){
    return request({
        url:"/search/hot/detail",
        method:"get",
    })
}

// 搜索 /search?keywords
export function getSearch(keywords){
    return request({
        url:"/cloudsearch",
        method:"get",
        params:{
            keywords
        }
    })
}

// 搜索提示 /search/suggest?keywords= 海阔天空&type=mobile
export function getSuggest(keywords){
    return request({
        url:"/search/suggest?keywords="+keywords+"&type=mobile",
        method:"get",
    })
}

