<template>
  <div>
    <!-- <div class="top-back"> -->
    <span class="iconfont det-back" @click="$router.go(-1)">&#xe60c;视频</span>
    <!-- </div> -->
    <div class="top-det">
      <video :src="url" autoplay controls id="video"></video>
    </div>
    <div class="bottom-com">
      <div class="bottom-title">
        <div :class="['dat', { active: isShow }]" @click="togo">相关</div>
        <div :class="['alb', { active: !isShow }]" @click="togo">评论</div>
      </div>
      <div class="left-con" v-show="isShow">
        <div
          class="album-item"
          v-for="(item, index) in video"
          :key="index"
          @click="getItem(item.vid)"
        >
          <div class="ablum-img">
            <img :src="item.coverUrl" />
          </div>
          <div class="ablum-con">
            <div class="ablum-title">
              {{ item.title }}
            </div>
            <div class="ablum-singer">
              <span class="singer"> {{ item.creator[0].userName }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-con" v-show="!isShow">
        <Comment :id="id" :type="type"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideo, geRelated } from "../assets/axios/mv.js";
import Comment from "../components/base/Comment.vue";
import { Toast } from "vant";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      url: "", // 视频地址
      isShow: true,
      video: [],
      comments: [], // 评论
      num: [],
      type: 5,
      id: this.$route.params.id,
    };
  },
  created() {
    this.all(this.$route.params.id);
  },
  methods: {
    togo() {
      this.isShow = !this.isShow;
    },
    all(id) {
      getVideo(id).then((data) => {
        this.url = data.urls[0].url;
      });
      geRelated(id).then((data) => {
        // console.log(data.data);
        this.video = data.data;
      });
    },
    // 点赞评论
    getLike(index) {
      let uid = localStorage.getItem("uid");
      if (!uid) {
        Toast({ message: "请先登录！", position: "top" });
        return;
      }
      this.num.splice(index, 1, index);
      Toast({ message: "点赞成功", position: "top" });
    },
    // 取消点赞
    quLike(index) {
      this.num.splice(index, 1, -(index + 1));
      Toast({ message: "取消点赞", position: "top" });
    },
    // 点击播放视频
    getItem(id) {
      this.all(id);
    },
  },
  watch: {
    "$route.params"() {
      //   console.log(this.$route.params.id);
      if (this.$route.params.id != undefined) {
        this.id = this.$route.params.id;
        this.all(this.$route.params.id);
      }
    },
  },
};
</script>

<style lang="less">
// .top-back {
//   width: 100vw;
//   height: 7vh;
//   background: #d43c33;
//   position: relative;
.det-back {
  font-size: 4vw;
  position: absolute;
  left: 3vw;
  line-height: 7vh;
  color: #fff;
  z-index: 100;
}
// }
.top-det {
  width: 100vw;
  height: 30vh;
  //   margin-top: 1vw;
  background: black;

  #video {
    width: 100%;
    height: 30vh;
  }
}
.bottom-com {
  width: 95vw;
  margin: 3vw auto;
  height: 30vw;
  &>.van-tabs__nav,.van-tabs__nav--line{
    display: none;
  }
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
    .album-item {
      width: 95vw;
      height: 30vw;
      border-radius: 3vw;
      display: flex;
      // background: #f5f5f5;
      margin-top: 5vw;
      .ablum-img {
        width: 40vw;
        height: 20vw;
        border-radius: 3vw;
        overflow: hidden;
        background: #2b6ae278;
        & .img {
          width: 100%;
          border-radius: 3vw;
        }
      }
      .ablum-con {
        width: 45vw;
        height: 20vw;
        display: flex;
        flex-direction: column;
        .ablum-title {
          width: 100%;
          height: 10vw;
          font-weight: 600;
          color: #333333d9;
          line-height: 5vw;
          font-size: 4vw;
          padding-left: 3vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .ablum-singer {
          width: 45vw;
          height: 10vw;
          font-size: 3.4vw;
          & > span.singer {
            display: inline-block;
            width: 45vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 10vw;
            padding: 0 3vw;
            color: #959090ba;
          }
        }
      }
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
  }
}
</style>