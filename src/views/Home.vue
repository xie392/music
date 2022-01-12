<template>
  <div class="home">
    <!-- 加载 -->
    <Load :load="load"></Load>
    <!-- 头部导航栏 -->
    <Headers></Headers>
    <!-- 搜索 -->
    <router-link to="/search" class="search">
      <span class="iconfont sear">&#xe650;</span>
      <span class="text">搜索你想听的歌曲</span>
    </router-link>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe
        :autoplay="3000"
        class="list"
        indicator-color="white"
        :stop-propagation="true"
      >
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
          class="img"
        >
          <img v-lazy="image.pic"  />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 排行榜 -->
    <Rank :rankList="rankList"></Rank>

    <!-- 推荐歌单 -->
    <Recommend :songList="songList"></Recommend>

    <!-- 推荐电台 -->
    <div class="rec">
      <div class="rank">
        <div class="title">
          <p class="title-p">听书电台</p>
          <div class="more">
            <span class="iconfont home-more">更多&#xe8f1;</span>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div
          class="recommend-song"
          v-for="(item, index) in radioList"
          :key="index"
          @click="getRadio(item)"
        >
          <div class="photo">
            <img v-lazy="item.picUrl" />
            <div class="playerCon">
              <van-icon name="play" class="play-cir">{{item.program.listenerCount | getCount }}</van-icon>
            </div>
          </div>
          <div class="p-txt">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem,Icon } from "vant";
import Load from "../components/base/Load.vue";
import Rank from "../components/Home/Rank.vue";
import { getBanner, topList, recom, radio } from "../assets/axios/Home.js";
import Recommend from "../components/Home/Recommend.vue";
import Headers from "../components/base/Headers.vue";
export default {
  name: "Home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]:Icon,
    Load,
    Rank,
    Recommend,
    Headers,
  },
  data() {
    return {
      images: [], // 轮播图
      load: true, // 加载未完成时显示
      rankList: [], // 排行榜
      songList: [], // 推荐歌单
      radioList: [], // 听书电台
    };
  },
  methods: {
    // 请求轮播图
    Banner() {
      getBanner().then((data) => {
        this.images = data.banners;
      });
    },
    // 请求排行榜
    Rank() {
      topList().then((data) => {
        for (let i = 0; i < data.list.length; i++) {
          let name = data.list[i].name;
          if (name == "飙升榜" || name == "新歌榜" || name == "热歌榜") {
            this.rankList.push(data.list[i]);
          } else {
            continue;
          }
        }
      });
    },
    // 请求推荐歌单
    Recommend() {
      recom().then((data) => {
        this.songList = data.result;
      });
    },
    // 请求电台
    Radio() {
      radio().then((data) => {
        for (let i = 0; i < data.result.length / 2; i++) {
          this.radioList.push(data.result[i]);
        }
      });
    },
    // 跳转电台页面
    getRadio(ele){
      this.$router.push({
        name:'radio',
        query:{
          id:ele.id,
          rid:ele.program.radio.id,
          imgurl:ele.picUrl,
          title:ele.name,
          total:ele.program.listenerCount
        }
      })
    }
  },
  created() {
    this.Banner();
    this.Rank();
    this.Recommend();
    this.Radio();
  },
  watch: {
    // 排行榜加载完成隐藏 加载动画
    async rankList() {
      if(this.rankList.length >= 3) {
        await this.$nextTick(() => {
          this.load = false;
        });
      }
    },
  },
  filters:{
      getCount(val){
          let w = val >  100000000 ? parseInt(val/100000000)  + '亿'
                  :val > 10000 ? parseInt(val/10000)+'万':val ;
          return w;
      },
  }
};
</script>


<style lang="less">
@import "../assets/css/common.css";
.home {
  width: 100%;
  // 搜索
  .search {
    width: 90%;
    margin: 3vw auto;
    height: 9vw;
    border-radius: 5.333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e4e4e45e;
    .sear {
      font-size: 4.267vw;
      color: #c1c4cd;
      margin-top: 0.267vw;
      font-weight: bold;
    }
    .text {
      line-height: 9vw;
      font-size: 3.733vw;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      margin-left: 8px;
      color: #c1c4cd;
    }
  }
  // 轮播图
  .banner {
    width: 100%;
    height: 29vw;
    display: flex;
    overflow: auto;
    .list {
      .img {
        display: block;
        width: 100%;
        height: 29vw;
        display: flex;
        background:url(../assets/music.png) center center no-repeat;
      }
      img {
        width: 90vw;
        margin: 0 auto;
        height: 29vw;
        display: block;
        border-radius: 10px;
        background: #cccccc70;
      }
    }
  }
  // 推荐歌单
}
</style>
