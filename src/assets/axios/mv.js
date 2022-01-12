// 推荐接口
import request from "./Http";

// 获取mv /mv/all?area=港台
export function getMv(area,type){
    return request({
        url:"/mv/all",
        method:"get",
        params:{
            area:area || '',
            type:type || ''
        }
    })
}

// 播放Mv
export function getPlay(id){
    return request({
        url:"/mv/url",
        method:"get",
        params:{
            id
        }
    })
}

// 视频分类列表 /video/category/list
export function getCategory(){
    return request({
        url:"/video/category/list",
        method:"get",
    })
}

// 获取视频标签/分类下的视频 /video/group?id=1101
export function getGroup(id){
    return request({
        url:"/video/group",
        method:"get",
        params:{
            id
        }
    })
}


// 视频播放 /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getVideo(id){
    return request({
        url:"/video/url",
        method:"get",
        params:{
            id
        }
    })
}

//  相关推荐 /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function geRelated(id){
    return request({
        url:"/related/allvideo",
        method:"get",
        params:{
            id
        }
    })
}

// 视频评论 /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getComment(id){
    return request({
        url:"/comment/video",
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
            type:5
        }
        
    })
}

// 收藏视频 /video/sub?id=vid&t=1
export function getSub(id,t){
    return request({
        url:'/video/sub',
        method:'get',
        params:{
            id,
            t,
        }
        
    })
}