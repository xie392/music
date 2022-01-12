<template>
    <div> 
        <!-- 登录框 -->
        <div class="container">
            <div class="form">
                <h2>
                    注册
                    <a href="javascript:;"  @click="$router.push('/Login');" class="re-back">返回</a> 
                </h2> 
                <form>
                    <div class="inputBox">
                        <input type="text" placeholder="昵称"  v-model.trim="name"/>
                    </div>
                    <div class="inputBox">
                        <input type="text" placeholder="手机号" v-model.trim="phone" />
                    </div>
                    <div class="inputBox">
                        <input type="password" placeholder="密码"  v-model.trim="password"/>
                    </div>
                    <div class="inputBox code">
                        <input type="text" placeholder="请输入验证码" v-model.trim="code"/>
                        <button type="button" class="get-code" @click="getCode">
                            {{ isCode ? min +'s' : '发送' }}
                        </button>
                    </div>
                     <div class="inputbtn" >
                        <input type="button" value="确定" @click="register">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {getCaptcha,getExistence,getVeriVfy,getReg} from '../assets/axios/login.js';
import { Toast} from 'vant';
export default {
  
    data() {
        return {
            phone:'',         // 手机号
            password:'',      // 密码
            code:'',          // 验证码   
            min:60,           // 发送成功后显示秒数
            name:'',          // 昵称    
            isCode:false      // 发送验证码切换秒数      
        }
    },
    methods: {
        // 返回
        goBack(){
            this.$router.push('/');
        },
        // 获取验证码
        getCode(){
            if(this.phone==""){
                Toast({message: '请输入手机号！',position: 'top'});
                return;
            }
            // 匹配手机号
            let phe = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if(!phe.test(this.phone)){
                Toast({message: '请输入正确的手机号！',position: 'top'});
                return;
            }
            if(!this.isCode){
                this.isCode = true;
                // 发送验证码
                getCaptcha(this.phone).then(data=>{
                    if(data.data){
                        // console.log('发送验证码=>',data);
                        Toast({message: '发送成功',position: 'top'});
                    }else{
                        Toast({message: data.message,position: 'top'});
                    }
                });
                // 开启定时器，60秒内不能发送验证码
                let timer = setInterval(()=>{
                    this.min -= 1;
                    if(this.min <= 0){
                        clearInterval(timer);
                        this.min = 60;
                        this.isCode = false;
                    }
                },1000); 
            }else{
                Toast({message: '请于'+this.min+'秒后再发送！',position: 'top'});
            }
        },

        // 注册效验
        register(){
            let flag = this.match();
            if(!flag) return;
            // 效验手机号是否被注册
            let isReg = this.isRegister();
            if(isReg){
                Toast({message: '该手机号已被注册！',position: 'top'});
                return;
            }else{
                // 效验验证码
                getVeriVfy(this.phone,this.code).then(data=>{
                    // console.log('效验验证码=>',data);
                    if(data.data){
                        // 效验手机号是否被注册
                        let isReg = this.isRegister();
                        if(isReg){
                            getReg({
                                phone:this.phone,
                                password:this.password,
                                captcha:this.code,
                                nickname:this.nickname
                            }).then( data=>{
                                if(data.token){
                                    // 登录
                                    Toast({message: '注册成功！请进行登录!',position: 'top'});
                                    this.$router.push('/Login');
                                }else{
                                    Toast({message: '注册失败',position: 'top'});
                                }
                                // console.log("注册成功=>",data);
                               
                            }) 
                        }else{
                            Toast('该手机号已被注册！')
                        }
                    }
                }).catch(()=>{
                    Toast('验证码输入错误！');
                    return;
                });
            }   
        },
        // 判断注册
        isRegister(){
            getExistence(this.phone).then(data=>{
                // console.log("手机号是否已经注册=>",data);
                return data.hasPassword;
            });
        },

        // 匹配
        match(){
            // 效验空值
            if(this.nickname=="" || this.phone=="" || this.password=="" || this.code==""){
                Toast({message: '输入值不能为空！',position: 'top'});
                return false;
            }
            // 匹配手机号
            let phe = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if(!phe.test(this.phone)){
                Toast({message: '请输入正确的手机号！',position: 'top'});
                return false;
            }
            // 效验昵称
            let name = /[0-9a-zA-Z_]{4,16}/;
            // 匹配昵称
            if(!name.test(this.name)){
                Toast({message: '昵称必须为4位，且要包含字母！',position: 'top'});
                return false;
            }
            // 匹配密码
            let pwd = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,20}$/;
            if(!pwd.test(this.password)){
                Toast({message: '密码必须包含字母，且长度不能少于6位',position: 'top'});
                return false;
            }
            // 匹配验证码
            if(this.code.length< 4){
                Toast({message: '验证码输入错误！',position: 'top'});
                return false;
            }
            return true;
        }

    },
}
</script>


<style lang="less">
@import "../assets/css/base.css";
</style>