<template>
  <div>
    <van-sticky :offset-top="0">
      <div id="header">
        <div class="header-login">
          <!-- <span class="iconfont login-icon"> &#xe8a0;</span> -->
          <router-link to="/userinfo" class="iconfont login-icon" tag="span">&#xe8a0;</router-link>
        </div>
        <router-link to="/" class="header-item">推荐</router-link>
        <router-link to="/video" class="header-item">视频</router-link>
        <router-link to="/album" class="header-item">专辑</router-link>
        <div class="header-more">
          <span class="iconfont more-icon"> &#xe648;</span>
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
import { Sticky } from "vant";

export default {
  name: "Headers",
  components: {
    [Sticky.name]: Sticky,
  },
};
</script>

<style lang="less">
@h: 15vw;
@w: 100%;
#header {
  width: @w;
  height: @h;
  background: #d43c33;
  // background: #fff;
  display: flex;
  box-sizing: border-box;
  // 左侧两边图标
  .header-login,
  .header-more {
    width: 15%;
    height: @h;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    & > span {
      display: block;
      font-size: 3.6vw;
      color: #fff;
      line-height: @h;
      font-weight: bold;
    }
    // 登录
    .login-icon {
      padding-left: 8vw;
    }
    // 更多
    .more-icon {
      padding-left: 2vw;
    }
  }
  // 中间div
  .header-item {
    width: 70%/3;
    height: 8vh;
    display: block;
    text-align: center;
    color: #fff;
    font-size: 3.5vw;
    letter-spacing: 0.12rem;
    line-height: @h;
    position: relative;
  }
  // 导航选中样式
  .router-link-exact-active::after {
    position: absolute;
    content: "";
    display: block;
    width: 7vw;
    height: 0.5vw;
    background: #fff;
    top: 11vw;
    margin: auto;
    left: 0;
    right: 0;
    border-radius: 1vw;
  }
}
</style>