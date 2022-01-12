<template>
  <div id="song-list">
    <div class="top-list">
      <van-icon name="arrow-left" class="back" @click="$router.go(-1)"
        >电台</van-icon
      >
      <div class="bg-list" v-lazy:background-image="imgurl"></div>
      <div class="center-list">
        <div class="photo left-list">
          <img v-lazy="imgurl" />
          <div class="playerCon">
            <van-icon name="play" class="play-cir">
              {{total | getCount}}
            </van-icon>
          </div>
        </div>
        <div class="right-list">
          <div class="top-title">{{title}}</div>
          <br><br>
          <div class="btns">
            <van-icon name="play" class="follow" @click="play">立即播放</van-icon>&nbsp;&nbsp;&nbsp;&nbsp;
            <van-icon
              name="plus"
              class="follow"
              @click="follow"
              v-show="!isfollow"
            >
              订阅电台</van-icon
            >
            <span class="follow isfollow" @click="follow" v-show="isfollow"
              >已订阅</span
            >
          </div>
        </div>
      </div>
      <div class="bottom-radio">
        <Comment :id="id" :type="type"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, ShareSheet, Dialog, Popup,Toast } from "vant";
import Comment from "../components/base/Comment.vue";
import {getDetail} from '../assets/axios/soar.js';
export default {
  components: {
    [Icon.name]: Icon,
    [ShareSheet.name]: ShareSheet,
    [Dialog.Component.name]: Dialog.Component,
    [Popup.name]: Popup,
    Comment,
  },
  data() {
    return {
      id: this.$route.query.id,
      rid:this.$route.query.rid,
      imgurl:this.$route.query.imgurl,
      total:this.$route.query.total,
      title:'',
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "QQ", icon: "qq" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
      ],
      live: false, // 喜欢
      isfollow: false, // 订阅
      show: false, // 弹出评论
      type: 4, // 类型
      radio:[],  // 电台
    };
  },
  methods: {
    // 电台详情
    detail(rid,t){
        getDetail(rid,t).then(data=>{
            if(data.code==200 && t==1){
                Toast("订阅成功");
            }else if(data.code==200 && t==0){
                Toast("取消订阅");
            }
        })
    },
    // 点击播放
    play(){
        Toast("本应用暂未开放电台，请于网易云收听!");
    },
    // 关注
    follow() {
      let uid = localStorage.getItem('uid');
      if(!uid){
          Toast("请先登录!");
          return;
      }
      this.isfollow = !this.isfollow;
      if (this.isfollow) {
        this.detail(this.rid,1);
      } else {
        Dialog.confirm({
          message: "是否确认取消订阅？",
        })
          .then(() => {
           this.detail(this.rid,1);
          })
          .catch(() => {
            this.isfollow = true;
          });
      }
    },
    // 显示评论
    showPopup() {
      this.show = true;
    },
  },
  created() {
    this.title = this.$route.query.title;
  },
  watch: {
    "$route.query"() {
      if (this.$route.query.id != undefined) {
        this.id = this.$route.query.id;
        this.rid = this.$route.query.rid;
        this.imgurl = this.$route.query.imgurl;
        this.title = this.$route.query.title;
      }
    },
  },
  filters: {
    getCount(val) {
      let w =
        val > 100000000
          ? parseInt(val / 100000000) + "亿"
          : val > 10000
          ? parseInt(val / 10000) + "万"
          : val;
      return w;
    },
  },
};
</script>

<style lang="less">
.back {
  padding: 3vw;
  font-size: 4.2vw;
  color: #fff;
  position: absolute;
  z-index: 9;
}
.van-dialog__message {
  font-size: 16px !important;
}
.van-share-sheet__title {
  font-size: 16px;
}

#song-list {
  width: 100%;
  .top-list {
    width: 100%;
    height: 40vh;
    background: skyblue url(../assets/music2.png) center center no-repeat;
    position: relative;
    .bg-list {
      width: 100%;
      height: 40vh;
      position: relative;
      left: 0;
      top: 0;
      //   background-size: cover !important;
      -webkit-filter: brightness(0.5); //兼容不同浏览器
      -o-filter: brightness(0.5);
      -moz-filter: brightness(0.5);
      filter: brightness(0.5); //设置亮度值，范围：0-1
    }
    .center-list {
      width: 100%;
      height: 20vh;
      position: absolute;
      top: 10vh;
      display: flex;
      justify-content: center;
      .left-list {
        width: 35%;
        height: 20vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      .right-list {
        width: 60%;
        height: 20vh;
        .top-title {
          font-size: 4.3vw;
          padding-left: 4.2vw;
          color: #edebeb;
          font-weight: 700;
          line-height: 6vw;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          //   min-height: 12vw;
        }
        .btns {
          width: 95%;
          padding-top: 3vw;
          display: flex;
          align-items: center;
          padding-left: 4vw;
          .avatar {
            width: 10vw;
            height: 10vw;
            margin-right: 1.5vw;
            border-radius: 50%;
            background: #cccccc70 url(../assets/music.png) center center
              no-repeat;
            overflow: hidden;
            & > img {
              width: 100%;
            }
          }
          .nickname {
            color: #d5d5d5;
            padding-right: 1.5vw;
            width: 30%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 3.5vw;
          }
          .follow {
            border: 1px solid #ffffff4d;
            display: block;
            padding: 1.5vw 2.4vw;
            font-size: 3.4vw;
            color: #fff;
            font-weight: 600;
            border-radius: 8vw;
          }
          .isfollow {
            color: #d3c5c5c7;
            padding: 1vw 3vw;
          }
        }
        .bottom-title {
          width: 95%;
          padding-left: 4.2vw;
          font-size: 3.7vw;
          color: #fff;
          padding-top: 4vw;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .bottom-list {
      width: 95%;
      height: 10vh;
      position: absolute;
      top: 30vh;
      left: 2.5%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      & > span {
        display: block;
        width: 33.33%;
        text-align: center;
        line-height: 10vh;
        font-size: 7vw;
        color: #fff;
        font-weight: 550;
      }
      & > .like {
        font-weight: 580;
      }
      & > .live {
        font-size: 7.8vw;
      }
    }
  }
  .bottom-radio{
      width: 100%;
      position: absolute;
      top: 40vh;
  }
}
</style>