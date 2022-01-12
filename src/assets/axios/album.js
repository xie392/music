// 推荐接口
import request from "./Http";

// 获取最新专辑 /album/newest
export function getAlbum(){
    return request({
        url:"/album/newest",
        method:"get",
    })
}

// 数字专辑  /album/list?limit=10
export function getAlbumList(limit){
    return request({
        url:"/album/newest",
        method:"get",
        params:{
            limit
        }
    })
}

// 专辑详情 /album/detail?id=84547195
export function getAlbumDetail(id){
    return request({
        url:"/album/detail",
        method:"get",
        params:{
            id
        }
    })
}

// 专辑评论 /comment/album?id=32311
export function getAlbumComment(id){
    return request({
        url:"/comment/album",
        method:"get",
        params:{
            id
        }
    })
}


// 评论点赞 type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
// /comment/like?id=29178366&cid=12840183&t=1&type=0
export function getLikecomment(id,cid,t){
    return request({
        url:'/comment/like',
        method:'get',
        params:{
            id,
            cid,
            t,
            type:3
        }
        
    })
}

// 播放歌曲
export function play(id){
    return request({
        url:"/song/url",
        params:{
            id,
        },
        method:"get",
    })
}

// 专辑歌曲
export function getAl(id){
    return request({
        url:"/album",
        method:"get",
        params:{
            id
        }
    })
}

// 发送评论 /comment /comment?t=1&type=1&id=5436712&content=test
export function getCom(id,content){
    return request({
        url:"/comment",
        method:"get",
        params:{
            t:1,
            type:3,
            id,
            content,
        }
    })
}
