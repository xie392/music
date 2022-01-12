// 推荐接口
import request from "./Http";

// 推荐歌单 //personalized?limit=1
export function getPerson(){
    return request({
        url:"/personalized",
        method:"get",
    })
}

// 推荐电台 /personalized/djprogram
export function getPersonalized(){
    return request({
        url:"/program/recommend",
        method:"get",
    })
}