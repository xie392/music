// 推荐接口
import request from "./Http";

// 登录
export function getLogin(phone,password){
    return request({
        url:"/login/cellphone",
        method:"post",
        data:{
            phone,
            password
        },
        withCredentials: true   // 自动获取cookie
    })
}

// 获取验证码
export function getCaptcha(phone){
    return request({
        url:"/captcha/sent",
        method:"get",
        params:{phone}
    })
}

// 效验验证码
export function getVeriVfy(phone,captcha){
    return request({
        url:"/captcha/verify",
        method:"get",
        params:{
            phone,
            captcha
        }
    })
}

// 效验手机号是否被注册
export function getExistence(phone){
    return request({
        url:"/cellphone/existence/check",
        method:"get",
        params:{
            phone,
        }
    })
}

// 初始化昵称
export function getNickname(nickname){
    return request({
        url:"/activate/init/profile",
        method:"get",
        params:{
            nickname,
        }
    })
}

// 注册
export function getReg(params){
    return request({
        url:"/register/cellphone",
        method:"get",
        params,
    })
}

// 邮箱登录 /login?email=xxx@163.com&password=yyy
export function getEmail(email,password){
    return request({
        url:"/login",
        method:"get",
        params:{
            email,
            password
        }
    })
}