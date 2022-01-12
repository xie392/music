// 推荐接口
import request from "./Http";

// 获取账户信息  /user/account
export function getAccount(){
    return request({
        url:"/user/account",
        method:"get",
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量 /user/subcount
export function getSubcount(){
    return request({
        url:"/user/subcount",
        method:"get",
    })
}

// 获取用户等级信息 /user/level
export function getLevel(){
    return request({
        url:"/user/level",
        method:"get",
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

// 用户详情 /user/detail
export function getDetail(uid){
    return request({
        url:"/user/detail",
        method:"get",
        params:{
            uid,
        }
    })
}

// 用户电台 /user/dj?uid=32953014
export function getDj(uid){
    return request({
        url:"/user/dj",
        method:"get",
        params:{
            uid,
        }
    })
}

// 每日推荐歌单
export function getRecommend(){
    return request({
        url:"/recommend/songs",
        method:"get",
    })
}

// 我喜欢的音乐 /likelist?uid=32953014
export function getLikelist(uid){
    return request({
        url:"/likelist",
        method:"get",
        params:{
            uid,
        }
    })
}

// 获取音乐信息 song/detail?ids=1815759242
export function getSongInfo(ids){
    return request({
        url:"song/detail",
        method:"get",
        params:{
            ids,
        }
    })
}

// 请求获取传头像的url /user/detail?uid=32953014&timestamp=${Date.now()}
export function getUrl(params){
    return request({
        url:"/user/detail",
        method:"get",
        params,
        withCredentials: true, 
    })
}

// 修改头像  url: `/user/detail?uid=32953014&timestamp=${Date.now()}`, withCredentials: true, //关键
export function getImg(cookie,data){
    return request({
        url:`avatar/upload?
                cookie=${cookie}&
                imgSize=300&
                imgX=300&
                imgY=300&
                timestamp=${Date.now()}`,
        method:"post",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data
    })
}

// 修改 /user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000
export function getUpdate(params){
    return request({
        url:"/user/update",
        method:"get",
        params,
    })
}

// 退出登录 /logout
export function getLogout(){
    return request({
        url:"/logout",
        method:"get"
    })
}

// 已收藏的专辑 /album/sublist
export function getSublist(){
    return request({
        url:"/album/sublist",
        method:"get"
    })
}

// 收藏的歌手列表 /artist/sublist
export function getSinger(){
    return request({
        url:"/artist/sublist",
        method:"get"
    })
}

// 收藏专栏 /topic/sublist
export function getTopic(){
    return request({
        url:"/topic/sublist",
        method:"get"
    })
}

// 收藏的 /mv/sublist
