<template>
  <div>
    <!-- 登录框 -->
    <div class="container">
      <van-icon name="arrow-left" class="login-back" @click="$router.push('/')"
        >返回</van-icon
      >
      <div class="form">
        <h2>登录</h2>
        <form>
          <div class="inputBox">
            <input type="text" placeholder="手机号" v-model.trim="phone" />
          </div>
          <div class="inputBox">
            <input type="password" placeholder="密码" v-model.trim="password" />
          </div>
          <div class="inputbtn">
            <input type="button" value="登录" @click="login" />
          </div>
          <p class="forget">
            没有账户?
            <a href="javascript:;" @click="getRegister">注册</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "../assets/axios/login.js";
import { Toast, Icon } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      phone: "", // 手机号
      password: "", // 密码
      code: "", // 验证码
      num: 0, // 登录次数
      name: "", // 昵称
    };
  },
  methods: {
    // 登录效验
    login() {
      // 效验空值
      if (this.phone == "" || this.password == "") {
        Toast({ message: "输入值不能为空!", position: "top" });
        return;
      }
      // 效验次数
      this.num += 1;
      if (this.num > 5) {
        Toast({ message: "输入信息错误已超过5次!", position: "top" });
        return;
      }
      // 效验登录
      getLogin(this.phone, this.password)
        .then((data) => {
          // console.log('登录成功=>',data);
          if (data.code == 200) {
            Toast({ message: "登录成功!", position: "top" });
            // window.localStorage.setItem('login',data.cookie);
            // token 值
            // console.log('登录成功=>',data);
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("uid", data.account.id);
            this.$router.push({ name: "userinfo" });
          } else {
            Toast({
              message: "输入信息错误!你还有" + (5 - this.num) + "次机会",
              position: "top",
            });
          }
        })
        .catch(() => {
          Toast({
            message: "输入信息错误!你还有" + (5 - this.num) + "次机会",
            position: "top",
          });
        });
    },

    // 注册/登录页面跳转
    getRegister() {
      this.$router.push("/Register");
    },
  },
};
</script>



<style lang="less">
@import "../assets/css/login.css";
</style>