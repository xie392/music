<template>
  <div id="song-list">
    <div class="top-list">
      <van-icon name="arrow-left" class="back" @click="$router.go(-1)"
        >推荐歌单</van-icon
      >
      <div class="bg-list" v-lazy:background-image="songData.coverImgUrl"></div>
      <div class="center-list">
        <div class="photo left-list">
          <img v-lazy="songData.coverImgUrl" />
          <div class="playerCon">
            <van-icon name="play" class="play-cir">{{
              songData.playCount | getCount
            }}</van-icon>
          </div>
        </div>
        <div class="right-list">
          <div class="top-title">{{ songData.name }}</div>
          <div class="btns">
            <div class="avatar">
              <img v-lazy="avatarUrl" />
            </div>
            <span class="nickname">{{ nickname }}</span>
            <van-icon
              name="plus"
              class="follow"
              @click="follow"
              v-show="!isfollow"
            >
              关注作者</van-icon
            >
            <span class="follow isfollow" @click="follow" v-show="isfollow"
              >已关注</span
            >
          </div>
          <div class="bottom-title">
            {{ songData.description }}
          </div>
        </div>
      </div>
      <div class="bottom-list">
        <span class="iconfont" @click="showShare = true">&#xe6a5;</span>
        <span class="iconfont" @click="down">&#xe668;</span>
        <span class="iconfont" @click="showPopup">&#xe891;</span>
        <span class="iconfont like" v-show="!live" @click="getLive"
          >&#xe86f;</span
        >
        <span class="iconfont live" v-show="live" @click="getLive"
          >&#xe8c3;</span
        >

        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
          <Comment :id="id" :type="type"></Comment>
        </van-popup>
      </div>
    </div>
    <song :id="id" @get-data="showdata"></song>
  </div>
</template>

<script>
import { Icon, ShareSheet, Toast, Dialog, Popup } from "vant";
import {
  recSong,
  getSubscribe,
  getFollow,
  getFollows,
  getList,
} from "../assets/axios/soar.js";
import song from "../components/Home/song.vue";
import Comment from "../components/base/Comment.vue";
export default {
  components: {
    [Icon.name]: Icon,
    [ShareSheet.name]: ShareSheet,
    [Dialog.Component.name]: Dialog.Component,
    [Popup.name]: Popup,
    song,
    Comment,
  },
  data() {
    return {
      id: this.$route.query.id,
      songData: [], // 歌单
      text: "", // 介绍
      avatarUrl: "", // 头像地址
      nickname: "", // 昵称
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "QQ", icon: "qq" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
      ],
      live: false, // 喜欢
      isfollow: false, // 关注
      show: false, // 弹出评论
      type: 2, // 类型
      useId: "", // 用户id
    };
  },
  methods: {
    // 歌单列表
    getCon(id) {
      recSong(id).then((data) => {
        this.songData = data.playlist;
        this.avatarUrl = data.playlist.creator.avatarUrl;
        this.nickname = data.playlist.creator.nickname;
        this.text = data.playlist.description.split("\n").join("。");
        this.useId = data.playlist.creator.userId;
      });
      let uid = localStorage.getItem("uid");
      if (uid) {
        //  判断是否关注
        getFollows({ uid }).then((data) => {
          // console.log(data.follow);
          for (let i = 0; i < data.follow.length; i++) {
            if (data.follow[i].userId == this.useId) {
              this.isfollow = true;
            }
          }
        });
        // 判断是否收藏
        getList(uid).then((data) => {
        //   console.log(data);
          for (let i = 0; i < data.playlist.length; i++) {
            if (data.playlist[i].id == this.id) {
              this.live = true;
            }
          }
        });
      }
    },
    // 点击播放
    showdata(obj) {
      this.$emit("get-data", obj);
    },
    // 分享
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    // 下载
    down() {
      Toast("暂未提供下载");
    },
    // 喜欢收藏
    lives(t) {
      getSubscribe({
        t,
        id: this.id,
      }).then((data) => {
        if (data.code == 200 && t == 1) {
          Toast("收藏成功");
        } else if (data.code == 200 && t == 0) {
          Toast("取消收藏");
        }
      });
    },
    // 喜欢
    getLive() {
      this.live = !this.live;
      if (this.live) {
        this.lives(1);
      } else {
        Dialog.confirm({
          message: "是否确认取消收藏？",
        })
          .then(() => {
            this.lives(0);
          })
          .catch(() => {
            this.live = true;
          });
      }
    },
    // 关注
    getfol(t) {
      getFollow({
        t,
        id: this.useId,
      }).then((data) => {
        console.log(data);
        if (data.code == 200 && t == 1) {
          Toast("谢谢你的关注");
        } else if (data.code == 200 && t == 0) {
          Toast("取消关注");
        }
      });
    },
    // 关注作者
    follow() {
      this.isfollow = !this.isfollow;
      if (this.isfollow) {
        this.getfol(1);
      } else {
        Dialog.confirm({
          message: "是否确认取消关注？",
        })
          .then(() => {
            this.getfol(0);
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
    this.getCon(this.$route.query.id);
  },
  watch: {
    "$route.query"() {
      if (this.$route.query.id != undefined) {
        this.id = this.$route.query.id;
        this.getCon(this.$route.query.id);
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
}
</style>