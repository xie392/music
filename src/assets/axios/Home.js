// 推荐接口
import request from "./Http";

// 获取轮播图数据
export function getBanner(){
    return request({
        url:"/banner?type=2",
        method:"get",
    })
}

// 排行榜
export function topList(){
    return request({
        url:'/toplist/detail',
        method:'get'
    })
}

// 推荐歌单
export function recom(){
    return request({
        url:'/personalized?limit=6',
        method:'get'
    })
}


// 听书电台
export function radio(){
    return request({
        url:'/personalized/djprogram',
        method:'get'
    })
}


// 排行榜歌单分类
export function sortSong(id){
    return request({
        url:'/playlist/detail',
        method:'get',
        params:{
            id
        }
    })
}


