// 推荐接口
import request from "./Http";

// 获取排行榜歌单数据
export function soar(id){
    return request({
        url:"/playlist/detail",
        params:{
            id,
        },
        method:"get",
    })
}

// 获取推荐歌单数据
export function recSong(id){
    return request({
        url:"/playlist/detail",
        params:{
            id,
        },
        method:"get",
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

// 获取歌词
// /lyric?id=1811921555
export function getLyric(id){
    return request({
        url:"/lyric",
        method:"get",
        params:{id}
    })
}

// 喜欢音乐 /like?id=347230
export function getLike(params){
    return request({
        url:"/like",
        method:"get",
        params
    })
}

// 获取喜欢的音乐 /likelist
export function getLikelist(uid){
    return request({
        url:"/likelist",
        method:"get",
        params:{
            uid
        }
    })
}

// 获取评论
// id : 资源 id, 如歌曲 id,mv id
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型  
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
// 可选参数
// pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
export function getComment(params){
    return request({
        url:"/comment/new",
        method:"get",
        params,
    })
}

// 评论点赞 type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
// /comment/like?id=29178366&cid=12840183&t=1&type=0
export function getLikecomment(params){
    return request({
        url:'/comment/like',
        method:'get',
        params
        
    })
}

// 发表评论 /comment?t=1&type=1&id=5436712&content=test
export function getCom(id,type,content){
    return request({
        url:'/comment',
        method:'get',
        params:{
            t:1,
            type,
            id,
            content
        }  
    })
}

// 收藏/取消收藏歌单 /playlist/subscribe?t=1&id=106697785 
export function getSubscribe(params){
    return request({
        url:'/playlist/subscribe',
        method:'get',
        params
    })
}

// 关注/取消用户 /follow?id=32953014&t=1
export function getFollow(params){
    return request({
        url:'/follow',
        method:'get',
        params
    })
}

// 获取用户关注列表 /user/follows?uid=32953014
export function getFollows(params){
    return request({
        url:'/user/follows',
        method:'get',
        params
    })
}

// 获取用户歌单 /user/playlist?uid=32953014
export function getList(uid){
    return request({
        url:"/user/playlist",
        method:"get",
        params:{
            uid,
        }
    })
}

// 订阅电台节目 /dj/sub?rid=336355127&t=1
export function getDetail(rid,t){
    return request({
        url:"/dj/sub",
        method:"get",
        params:{
            rid,
            t
        }
    })
}
