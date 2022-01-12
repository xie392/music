<template>
  <div>
    <div class="top-deatil">
      <van-icon name="arrow-left" class="radio-back" @click="$router.push('/album')">专辑</van-icon>
      <!-- <div class="iconfont radio-back" @click="$router.push('/album')">
        &#xe60c;专辑
      </div> -->
      <div
        class="top-copy"
        :style="{ background: 'url(' + albums.blurPicUrl + ')' }"
      ></div>
      <div class="top-list">
        <div class="left-img">
          <img :src="albums.picUrl" />
        </div>
        <div class="right-con">
          <div class="title">{{ albums.name }}</div>
          <div class="mod">
            <van-button round type="info" class="info" @click="startPlay">
              <van-icon name="play-circle" class="play" />立即播放
            </van-button>
          </div>
        </div>
      </div>
      <div class="top-det">
        {{ albums.description }}
      </div>
    </div>
    <div class="bottom-com">
      <div class="bottom-title">
        <div :class="['dat', { active: isShow }]" @click="togo">歌曲</div>
        <div :class="['alb', { active: !isShow }]" @click="togo">评论</div>
      </div>
      <div class="left-con" v-show="isShow">
        <ul class="song-list">
          <li
            v-for="(item, index) in song"
            :key="index"
            @click="onclickfn(index)"
          >
            <div class="num">{{ index + 1 }}</div>
            <div class="con">
              <div class="song-name">{{ item.name }}</div>
              <div class="singer">{{ item.ar[0].name }}</div>
            </div>
            <div class="dow">
              <span class="iconfont" v-show="item.mv != 0">&#xe6a8;</span>
              <span class="iconfont">&#xe69f;</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="right-con" v-show="!isShow">
        <div class="comment-item">
          <textarea class="text" value="发表评论" v-model="text"></textarea>
          <van-button type="primary" size="small" class="small" @click="sumbit">提交</van-button>
        </div>
        <div class="com-con" v-for="(item, index) in comments" :key="index">
          <div class="com-img">
            <div class="imgs">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="com-name">
              <div class="name">{{ item.user.nickname }}</div>
              <span
                class="zan iconfont"
                @click="getLike(item.commentId, index)"
                v-show="index != num[index]"
              >
                &#xe611;<i>{{ item.likedCount }}</i>
              </span>
              <span
                class="zan q iconfont"
                @click="quLike(item.commentId, index)"
                v-show="index == num[index]"
              >
                &#xe611;<i>{{ item.likedCount }}</i>
              </span>
              <div class="time">{{ item.timeStr }}</div>
            </div>
          </div>
          <div class="com-content">
            {{ item.content }}
          </div>
        </div>
        <p v-show="comments.length == 0">暂无评论</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumComment, getLikecomment, getAl} from "../assets/axios/album.js";
import { Toast,Button,Icon } from "vant";
export default {
  components:{
    [Button.name]:Button,
    [Icon.name]:Icon
  },
  data() {
    return {
      isShow: true, // 介绍和评论切换
      albums: [], // 专辑
      comments: [], // 评论
      num: [], // 点赞
      song: [], // 歌曲
      text:'',  // 发表评论
    };
  },
  methods: {
    async getId() {
      await getAl(this.$route.query.id).then((data) => {
        this.albums = data.album;
        // console.log("专辑信息=>", data);
        this.song = data.songs;
      });
      // 评论
      await getAlbumComment(this.$route.query.id).then((data) => {
        this.comments = data.comments;
        let len = data.comments.length;
        for (let i = 0; i < len; i++) {
          this.num.push(-(i + 1));
        }
      });
    },
    // 介绍和评论切换
    togo() {
      this.isShow = !this.isShow;
    },
    // 点赞评论
    getLike(id, index) {
      let uid = localStorage.getItem("uid");
      if (!uid) {
        Toast({ message: "请先登录！", position: "top" });
        return;
      }
      this.num.splice(index, 1, index);
      getLikecomment(this.$route.query.id, id, 1).then((data) => {
        if (data.code == 200) {
          Toast({ message: "点赞成功", position: "top" });
        }
      });
    },
    // 取消点赞
    quLike(id, index) {
      this.num.splice(index, 1, -(index + 1));
      getLikecomment(this.$route.query.id, id, 0).then((data) => {
        if (data.code == 200) {
          Toast({ message: "取消点赞", position: "top" });
        }
      });
    },
    // 开始播放
    startPlay() {
      this.$emit("get-data", {
        allsongs: this.song,
        index: 0,
      });
    },
    // 发表评论
    sumbit(){
        if(this.text==""){
            Toast({message: '请先输入内容',position: 'top'});
            return;
        }
        Toast({message: '发表成功！',position: 'top'});
        this.text='';
    },
    // 点击播放
    onclickfn(index) {
      // 把下标传入 迷你播放器中
      this.$emit("get-data", {
        allsongs: this.song,
        index,
      });
    },
  },
  filters: {
    getCount(val) {
      let w =
        val > 100000000
          ? parseFloat(val / 100000000).toFixed(1) + "亿"
          : val > 10000
          ? parseInt(val / 10000) + "万"
          : val;
      return w;
    },
  },
  watch: {
    "$route.query"() {
      if(this.$route.query.id != undefined) {
            this.$nextTick(()=>{
                this.getId();
            });
      }
    },
  },
};
</script>

<style lang="less">
.top-deatil {
  width: 100vw;
  height: 40vh;
  background: skyblue;
  // 返回
  .radio-back {
    font-size: 4.2vw;
    color: #fff;
    position: absolute;
    left: 3vw;
    top: 3vw;
    z-index: 9;
  }
  // top-list 内容
  .top-list {
    width: 90vw;
    height: 20vh;
    left: 5vw;
    position: absolute;
    top: 10vh;
    display: flex;
    align-items: center;

    .left-img {
      width: 30vw;
      height: 30vw;
      overflow: hidden;
      background: rgb(9, 174, 240);
      border-radius: 3vw;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 3vw;
      }
    }
    .right-con {
      width: 58vw;
      height: 30vw;
      .title {
        width: 58vw;
        height: 15vw;
        margin-left: 4vw;
        color: #fff;
        font-size: 4.4vw;
        font-weight: 600;
        line-height: 7vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .mod {
        width: 58vw;
        height: 15vw;
        margin-left: 2vw;
        display: flex;
        align-items: center;
        .info {
          width: 28vw;
          height: 9vw;
          padding: 1vw;
          display: flex;
          align-items: center;
          justify-content: center;
          .play {
            font-size: 4vw;
            padding-right: 1vw;
            display: inline-block;
            line-height: 10vw;
          }
        }
      }
    }
  }
  .top-det {
    width: 95vw;
    left: 2.5vw;
    position: absolute;
    top: 34vh;
    line-height: 5vw;
    font-size: 3.5vw;
    color: #fff;
    text-indent: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  // 内容
  .top-copy {
    width: 100vw;
    height: 40vh;
    // background: blueviolet;
    -webkit-filter: brightness(0.5); //兼容不同浏览器
    -o-filter: brightness(0.5);
    -moz-filter: brightness(0.5);
    filter: brightness(0.5); //设置亮度值，范围：0-1
    background-size: cover !important;
  }
}
.bottom-com {
  width: 95vw;
  margin: 3vw auto;
  height: 30vw;
  // background: chocolate;
  .bottom-title {
    width: 95vw;
    height: 10vw;
    display: flex;
    .dat,
    .alb {
      width: 47.5vw;
      height: 10vw;
      color: #333333ba;
      display: flex;
      font-weight: 600;
      justify-content: center;
      align-items: center;
      font-size: 3.4vw;
      position: relative;
      cursor: pointer;
    }
    div.active::after {
      content: "";
      width: 8vw;
      border-right: 0.3vw;
      height: 0.5vw;
      background: #f36;
      position: absolute;
      top: 85%;
      margin: auto;
      left: 0;
      right: 0;
    }
  }

  .left-con {
    width: 95vw;
    // height: 30vh;
    margin-top: 5vw;
    padding-bottom: 20vw;
    & > p {
      color: #1a1a1a;
      font-size: 4vw;
      font-weight: 540;
      margin: 0;
      min-height: 7vw;
      width: 95vw;
      text-indent: 2em;
      line-height: 7vw;
      word-break: normal;
      white-space: pre-warp;
      word-wrap: break-word;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  .right-con {
    margin-top: 5vw;
    width: 95vw;
    height: 30vh;
    // background: rgb(8, 0, 255);
    // 评论
    .com-con {
      width: 95vw;
      align-items: center;
      margin-top: 3vw;
      border-radius: 1.5vw;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 0.12vw solid #cccccc69;
      .com-img {
        width: 95vw;
        height: 15vw;
        position: relative;
        display: flex;
        justify-content: flex-start;
        .imgs {
          width: 13vw;
          height: 13vw;
          border-radius: 50%;
          background: darkred;
          overflow: hidden;
          margin-top: 2vw;
          & img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .com-name {
          width: 78vw;
          margin-left: 2vw;
          height: 15vw;
          // background: chartreuse;
          .name {
            color: #666666;
            padding: 2vw;
            font-weight: 600;
            font-size: 4.2vw;
          }
          .time {
            padding-left: 2vw;
            font-size: 3.6vw;
            color: #acacac;
          }
          .zan {
            width: 10vw;
            height: 10vw;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 3vw;
            font-size: 4vw;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #acacac;
            & i {
              font-style: normal;
              font-size: 3.6vw;
              padding: 1vw 1vw;
              color: #acacac;
            }
          }
          span.q {
            color: #f36;
          }
        }
      }
      .com-content {
        margin-left: 15.5vw;
        margin-top: 2vw;
        width: 85vw;
        min-height: 10vw;
        // background: chartreuse;
        color: #333;
        line-height: 6.5vw;
        font-size: 3.8vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .com-con:last-of-type {
      padding-bottom: 20vw;
    }
  }
}

.comment-item {
  width: 95vw;
  // height: 20vw;
  margin-top: 4vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  // background: chartreuse;
  .text {
    width: 95vw;
    height: 12vw;
    border: 1px solid #ccc;
    border-radius: 1vw;
    outline: none;
    padding: 2vw;
    font-size: 4vw;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
  }
  .small {
    margin-top: 3vw;
    margin-right: 1vw;
    width: 18vw;
  }
}

.left-con .song-list {
  width: 90vw;
  margin: 0 auto;
  list-style: none;
}
.left-con .song-list li {
  display: flex;
  align-items: center;
  min-height: 18vw;
}
.left-con .song-list li .num {
  text-align: left;
  font-size: 4.8vw;
  font-weight: 700;
  color: #a1a4b3;
  width: 10vw;
}
.left-con .song-list li .con {
  display: flex;
  flex-direction: column;
  width: 60vw;
}
.left-con .song-list li .con .song-name {
  padding-left: 2vw;
  height: 6vw;
  font-size: 4.267vw;
  font-weight: 700;
  color: #262338;
  line-height: 6vw;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.left-con .song-list li .con .singer {
  padding-top: 2vw;
  padding-left: 2vw;
  font-size: 3.4vw;
  display: inline-block;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #a1a4b3;
}
.left-con .song-list li .dow {
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.left-con .song-list li .dow span {
  display: block;
  font-size: 4.6vw;
  color: #a1a4b3;
  width: 8vw;
  margin-left: 2vw;
}

.left-con .song-list li:last-child {
  margin-bottom: 25vw;
}
</style>