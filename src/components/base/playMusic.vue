<template>
  <div class="main">
    <!-- 迷你音乐播放 -->
    <div class="audioplay" v-show="isShow">
      <div class="play-img">
        <img
          :src="newData.al.picUrl"
          :class="['p', { z: !isPlay }]"
          @click="playSong"
        />
      </div>

      <div class="play-info">
        <h3>{{ newData.name }}</h3>
        <p>{{ newData.ar[0].name || null }}</p>
      </div>
      <div class="right-player">
        <span class="iconfont" @click="prev">&#xe64c;</span>
        <span class="iconfont one" v-show="!isPlay" @click="player"
          >&#xe649;</span
        >
        <span class="iconfont two" v-show="isPlay" @click="player"
          >&#xe64d;</span
        >
        <span class="iconfont" @click="next">&#xe64a;</span>
      </div>
    </div>
    <!-- 播放器详情页 -->
    <div class="bgmusic" v-show="!isShow">
      <!-- <van-icon name="arrow-down" class="iconfont comeback" @click="isShow=!isShow" /> -->
      <span class="iconfont comeback" @click="isShow = !isShow">&#xe772;</span>
      <div
        class="bgcover"
        :style="{ background: 'url(' + newData.al.picUrl + ')' }"
      ></div>
      <div class="shade"></div>
      <div class="content">
        <div class="top-title">
          <h4>{{ newData.name }}</h4>
          <p>{{ newData.ar[0].name }}</p>
        </div>
        <div class="music" v-show="!lyricShow" @click="lyricShow = !lyricShow">
          <img
            :src="newData.al.picUrl"
            ref="play"
            :class="['p', { z: !isPlay }]"
          />
        </div>
        <!-- 歌词 -->
        <div class="lyric" v-show="lyricShow" @click="lyricShow = !lyricShow">
          <div class="lyric-show">
            <ul
              class="lyric-list"
              :style="{ transform: 'translateY(' + lyricTop + ')' }"
            >
              <li
                v-for="(item, index) in lyric"
                :key="index"
                :class="{ active: currentRow == index + 1 }"
              >
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>

        <div class="bottom-btn">
          <div class="bar">
            <span class="left-time">{{ timeLeft | playerTime }}</span>
            <div class="step">
              <van-slider
                @input="inputchanage"
                @change="sliderchange"
                v-model="value"
                bar-height="2px"
                active-color="#ee0a24"
                button-size="13px"
              />
            </div>
            <span class="right-time">{{ timeRight | playerTime }}</span>
          </div>
          <div class="play-btn">
            <!-- 随机播放 -->
            <span class="iconfont little" @click="random" v-show="randomPlay"
              >&#xe634;</span
            >
            <!-- 循环播放 -->
            <span class="iconfont little" v-show="!randomPlay" @click="random"
              >&#xe6af;</span
            >
            <!-- 随机播放 -->
            <!-- <span class="iconfont">&#xe6a7;</span> -->
            <!-- 上一首 -->
            <span class="iconfont" @click="prev">&#xe64c;</span>
            <!-- 暂停 -->
            <span class="iconfont play-b" v-show="!isPlay" @click="player"
              >&#xe649;</span
            >
            <!-- 播放 -->
            <span class="iconfont play-b" v-show="isPlay" @click="player"
              >&#xe64d;</span
            >
            <!-- 下一首 -->
            <span class="iconfont" @click="next">&#xe64a;</span>
            <!-- 喜欢 -->
            <span class="iconfont littl" @click="getCollect" v-show="!isCollect"
              >&#xe86f;</span
            >
            <span
              class="iconfont little live"
              v-show="isCollect"
              @click="getCollect"
              >&#xe8c3;</span
            >
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      controls
      autoplay="isPlay"
      :src="songurl"
      hidden
      @loadeddata="loadeddataFun"
    ></audio>
  </div>
</template>

<script>
import {
  play,
  getLyric,
  getLike,
  getLikelist,
} from "../../assets/axios/soar.js";
import { Toast,Dialog,Slider } from "vant";
export default {
  name: "player",
  props: ["songData", "index"],
  components: {
    [Slider.name]: Slider,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      isPlay: true, // 播放/暂停切换
      songurl: "", // 歌曲地址
      newData: this.songData[this.index], // 当前歌曲详细信息
      isShow: true, // 迷你与详细页切换
      value: 0, // 进度条初始值
      timeRight: 0, // 右边歌曲时间
      timeLeft: 0, // 左边歌曲时间
      timer: null, // 定时器
      num: this.index, // 上一首,下一首下标
      lyricShow: false, // 歌词
      lyric: [], // 存储歌词
      currentRow: 0, //歌词高亮
      lyricTop: "0vw", // 歌词移动
      randomPlay: true, // 随机/循环播放
      isTrue: true, // 随机/循环播放=>上一首/下一首
      isCollect: false, // 收藏
      id: 0, // 收藏id
      show: false,
    };
  },
  methods: {
    player() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.audio.play(); //播放音乐
        this.getTime();
      } else {
        this.$refs.audio.pause(); //暂停音乐
        clearInterval(this.timer);
      }
    },
    // 请求歌曲,判断是否喜欢该音乐
    getSong() {
      // 获取音乐 url
      play(this.newData.id).then((data) => {
        this.songurl = data.data[0].url;
      });
      let uid = localStorage.getItem("uid");
      if (uid) {
        getLikelist(uid).then((data) => {
          for (let n = 0; n < data.ids.length; n++) {
            if (data.ids[n] == this.newData.id) {
              this.isCollect = true;
              // console.log('匹配成功',this.newData,this.id);
              return;
            } else {
              this.isCollect = false;
            }
          }
        });
      } else {
        this.isCollect = false;
      }
    },
    // 歌曲详细页
    playSong() {
      this.isShow = !this.isShow;
    },
    // 返回
    onClickLeft() {
      this.isShow = !this.isShow;
    },
    // 音乐加载完成后,获取音乐数据
    loadeddataFun() {
      // console.log("音乐加载完成");
      // console.log(this.$refs.audio.duration);
      let duration = this.$refs.audio.duration;
      this.timeRight = duration;
      this.timeLeft = 0;
      this.value = 0;
      this.getTime();
      this.getLyricFun();
    },
    // 切换
    getRandom() {
      // 随机播放
      if (!this.randomPlay) {
        this.num = Math.round(Math.random() * this.songData.length - 1);
        // console.log("随机播放=>", this.num);
      } else {
        // console.log("顺序播放=>", this.num);
        if (this.isTrue) {
          this.num += 1;
          this.num = this.num >= this.songData.length ? 0 : this.num;
        //   console.log("加=>", this.num);
        } else {
          this.num = this.num <= 0 ? this.songData.length - 1 : (this.num -= 1);
        //   console.log("减=>", this.num);
        }
      }
    },
    // 滚动条滑动
    inputchanage() {
      clearInterval(this.timer);
    },

    // 进度条
    sliderchange() {
      var duration = (this.$refs.audio.duration * this.value) / 100;
      this.timeLeft = duration; //修改页面数据
      this.$refs.audio.currentTime = duration; //修改播放时间
      this.getTime();
    },
    // 下一首歌曲
    next() {
      this.isTrue = true;
      this.getRandom();
    },
    // 上一首
    prev() {
      this.isTrue = false;
      this.getRandom();
    },
    // 随机/循环播放
    random() {
      this.randomPlay = !this.randomPlay;
      if (this.randomPlay) {
        Toast("顺序播放");
      } else {
        Toast("随机播放");
      }
    },

    // 定时器
    getTime() {
      this.timer = setInterval(() => {
        if (this.$refs.audio.currentTime != undefined) {
          let currentTime = this.$refs.audio.currentTime; //实时变化时间
          let duration = this.$refs.audio.duration; //总时间
          this.timeLeft = currentTime;
          // 计算滚动条值
          this.value = (currentTime / duration) * 100;
          if (this.value == 100) {
            clearInterval(this.timer);
            // this.next();
            this.getRandom();
          }
        }
      }, 999);
    },

    // 获取歌曲歌词
    getLyricFun() {
      // this.lyricShow = !this.lyricShow;
      // if(this.lyricShow){
      getLyric(this.newData.id).then((data) => {
        // console.log(data);
        this.formatLyric(data.lrc.lyric);
      });
      // }
    },
    // 处理歌词结构
    formatLyric(text) {
      this.lyric = [];
      let arr = text.split("\n"); //把原歌词切割成字符串
      let row = arr.length; //获取数组长度
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //[00:00.000] 作词 : MK王逸杰
        let temp_arr = temp_row.split("]"); //[00:00.000 , 作词 : MK王逸杰
        let lyrictext = temp_arr.pop(); //删除数组最后一个,返回值
        temp_arr.forEach((el) => {
          // console.log(el);
          let obj = {};
          // [00:00.000 => [00,00.000]
          let time_arr = el.substr(1, el.length - 1).split(":");
          let s = time_arr[0] * 60 + Math.ceil(time_arr[1]); //把分钟变成秒
          obj.text = lyrictext;
          obj.time = s;
          if (lyrictext.length > 0) {
            this.lyric.push(obj); //每一行歌词处理后放入数组中
          }
        });
      }
      if (this.lyric.length == 0) {
        this.lyric.push({
          text: "暂无歌词",
          time: 0,
        });
      }
      // console.log(this.lyric);
    },

    // 收藏
    getCollect() {
      let uid = localStorage.getItem("uid");
      if (uid) {
        this.isCollect = !this.isCollect;
        if (this.isCollect) {
          getLike({ id: this.newData.id }).then((data) => {
            console.log(data);
            if (data.code == 200) {
              Toast("收藏成功");
            }
          });
        } else {
          Dialog.confirm({
            message: "是否确认取消收藏？",
          }).then(() => {
            getLike({ id: this.newData.id, like: false }).then((data) => {
              if (data.code == 200) {
                Toast("取消收藏");
              }
            });
          }).catch(()=>{
                this.isCollect = true;
        });
        }
      } else {
        Toast("请进行登录");
      }
    },
  },
  created() {
    // console.log("迷你播放器=>",this.newData);
    // 获取音乐
    this.getSong();
    // console.log(this.songData);
  },
  watch: {
    index(val) {
      // 歌曲信息
      this.newData = this.songData[val];
      // console.log("player => 歌曲详情",this.newData);
      this.num = this.index;
      // 歌曲 url
      this.getSong();
      // 播放状态
      this.isPlay = true;
    },
    // 左测歌时间变化
    timeLeft() {
      for (let i = 0; i < this.lyric.length; i++) {
        if (this.timeLeft <= this.lyric[i].time) {
          // console.log(this.lyric[i].time);
          this.lyricTop = -7 * i + "vw";
          this.currentRow = i; //歌词高亮
          break;
        }
      }
    },
    num(val) {
      console.log("随机/顺序 || num值发生改变=>", val);
      this.newData = this.songData[val];
      // 歌曲 url
      this.getSong();
      // 获取歌词
      this.getLyricFun();
      // 播放状态
      this.isPlay = true;
    },
  },
  filters: {
    playerTime(data) {
      let m = parseInt(data / 60); //分钟
      let s = parseInt(data % 60); //秒
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + (s < 10 ? "0" + s : s); // 01
      }
    },
  },
};
</script>

<style lang="less">
span.more-play {
  color: #fff;
  width: 10vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw !important;
  position: absolute;
  right: 3vw;
  line-height: 10vw;
  top: 2vw;
  font-weight: bold;
  z-index: 999;
}
.audioplay {
  width: 100vw;
  height: 20vw;
  background: #fff;
  left: 0vw;
  border-top-left-radius: 3vw;
  border-top-right-radius: 3vw;
  box-shadow: 8px 5px 2px #ccc;
  position: fixed;
  bottom: -1vw;
  z-index: 999;
  .play-img {
    width: 15vw;
    height: 15vw;
    position: absolute;
    left: 2vw;
    margin: auto;
    top: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: 50%;
    background: #cccccc70 url(../../assets/music.png) center center no-repeat;
    img {
      width: 100%;
    }
  }
  .play-info {
    width: 44vw;
    height: 100%;
    position: absolute;
    left: 22vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      font-weight: 560;
      margin: 0;
      font-size: 4vw;
      line-height: 7vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    p {
      margin: 0;
      font-weight: 500;
      font-size: 3.2vw;
      line-height: 6vw;
    }
  }
  .right-player {
    width: 35vw;
    height: 9vw;
    position: absolute;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    display: flex;
    justify-items: center;
    z-index: 99;
    span {
      z-index: 100;
      display: block;
      padding: 0 1.2vw;
      font-size: 9vw;
      font-weight: 400;
    }
    span.two {
      font-size: 9.1vw;
    }
  }
}
img.p {
  animation: act 15s linear infinite forwards;
}
img.z {
  animation-play-state: paused;
}
@keyframes act {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.bgmusic {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #333;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  background-size: cover;
  transform-origin: center center;
  span.comeback {
    color: #fff;
    font-size: 6vw;
    font-weight: bold;
    position: absolute;
    left: 4vw;
    top: 4vw;
    z-index: 400;
  }
  .bgcover {
    width: 100vw;
    height: 100vh;
    // background-size: 100%;
    filter: blur(25px);
    z-index: 10;
  }
  .shade {
    position: absolute;
    z-index: 300;
    left: 0px;
    bottom: 0px;
    height: 50%;
    width: 100%;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 305;
    .top-title {
      width: 100vw;
      height: 15vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h4,
      p {
        width: 50vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        text-align: center;
        color: #fff;
        line-height: 6vw;
      }
      h4 {
        font-size: 4.5vw;
      }
      p {
        font-size: 3.2vw;
      }
    }
    .music {
      width: 75vw;
      height: 75vw;
      border-radius: 50%;
      margin: 20vw auto;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
      position: relative;
      // border:3.33vw solid ;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
      }
    }
    .lyric {
      width: 100vw;
      height: 50%;
      margin: 20vw auto;
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      .lyric-show {
        width: 98vw;
        margin: 0 auto;
        height: 7vw;
        // background: blue;
        position: relative;
        .lyric-list {
          // position: absolute;
          // top:0vw;
          tab-size: center;
          list-style: none;
          width: 98vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateY(0vw);
          transition: 0.5s all linear;
          & > li {
            font-size: 3.4vw;
            color: #cfcfcf;
            width: 98vw;
            height: 7vw;
            text-align: center;
            line-height: 7vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: Arial, Helvetica, sans-serif;
          }
          & > li.active {
            transform: scale(1.3);
            color: #d43c33;
          }
        }
      }
    }
    .bottom-btn {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 45vw;
      z-index: 450;
      .bar {
        height: 20vw;
        width: 90vw;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        span {
          display: block;
          width: 5vw;
          color: #fff;
          font-size: 3.4vw;
          text-align: center;
        }
        .step {
          width: 80vw;
          margin: 0vw 3vw;
          padding: 0vw 0vw 0vw 2.2vw;
        }
      }
      .play-btn {
        height: 20vw;
        margin: 0 auto;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        & > span.iconfont {
          font-size: 9vw !important;
          color: #fff;
          font-weight: 550 !important;
        }
        span.little {
          font-family: 600;
        }
        span.play-b {
          font-size: 12vw !important;
        }
      }
    }
  }
}
.mian {
  width: 100vw;
  height: 100vh;
}

img.p {
  animation: act 15s linear infinite forwards;
}
img.z {
  animation-play-state: paused;
}
.player {
  z-index: 99;
  display: block;
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  background: #ffffff91;
  box-shadow: 0 0 5px black;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  span {
    text-align: center;
    font-size: 20vw;
  }
}
span.live {
  color: #f36 !important;
}
</style>