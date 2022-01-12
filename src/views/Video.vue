<template>
  <div class="mv">
    <headers></headers>
    <van-tabs background="#fff" @click="onChange">
      <van-tab v-for="(item, index) in title" :key="index" :title="item.name">
        <!-- 视频 -->
        <div class="con-mv" v-for="(ele, i) in video" :key="i">
          <div class="cover">
            <!-- <Video :id="ele.data.vid" :index="num" @startPlay="startPlay"></Video> -->
            <video
              :src="url"
              controls
              class="video"
              v-show="num == i"
              :ref="index"
            ></video>
            <div class="control">
              <!-- 文字 -->
              <div class="mv-title">
                <span class="van-multi-ellipsis--l2">
                  <!-- 标题 -->
                  {{ isMV ? ele.data.name : ele.data.title }}
                </span>
              </div>
              <!-- 播放按钮 -->
              <div class="mv-play">
                <van-icon
                  name="play-circle"
                  class="icon-play"
                  v-show="num != i"
                  @click="startPlay(ele.data.vid, i, ele)"
                />
                <van-icon
                  name="pause-circle"
                  class="icon-play"
                  v-show="num == i"
                  @click="stopPlay(i)"
                />
              </div>
              <div class="bottom-play">
                <div class="left-play-mv">
                  <!-- 播放按钮 -->
                  <van-icon name="play" class="icon-playCount" />
                  <!-- <van-icon name="pause-circle" class="icon-playCount" v-show="play" @click="startPlay" /> -->

                  <span class="playCount">
                    <!-- 播放量 -->
                    {{
                      isMV ? ele.data.playCount : ele.data.playTime | getCount
                    }}
                  </span>
                </div>
                <div class="play-time">
                  <!-- 播放时长 -->
                  {{
                    isMV ? ele.data.duration : ele.data.durationms | playerTime
                  }}
                </div>
              </div>
            </div>
            <!-- 封面 -->
            <div
              class="bg-cover"
              :style="{
                background: 'url(' + ele.data.coverUrl + ') no-repeat',
              }"
              v-show="num != i"
            ></div>
            <div class="comment">
              <div class="left-title-mv">
                <div class="mv-logo" @click="getDetail(ele.data.vid)">
                  <!-- 作者图片 -->
                  <img
                    :src="
                      isMV
                        ? ele.data.artists[0].img1v1Url
                        : ele.data.creator.avatarUrl
                    "
                  />
                  <!-- {{ ele.data.artists.img1v1Url}} -->
                </div>
                <div class="text-nickname">
                  <!-- 作者名字 -->
                  {{
                    isMV ? ele.data.artists[0].name : ele.data.creator.nickname
                  }}
                </div>
              </div>
              <div class="right-title-mv">
                <div class="item-mv">
                  <!-- 收藏 -->
                  <!-- <span class="iconfont icon" v-show="isMV">&#xe60d;</span> -->
                  <span class="iconfont icon" @click="cat">&#xe86f;</span>
                  <span class="p"
                    >{{
                      isMV
                        ? ele.data.likeCount
                        : ele.data.praisedCount | getCount
                    }}
                  </span>
                </div>
                <div class="item-mv">
                  <span class="iconfont icon">&#xe891;</span>
                  <span class="p">{{ ele.data.commentCount | getCount }}</span>
                </div>
                <van-share-sheet
                  v-model="showShare"
                  title="立即分享给好友"
                  :options="options"
                  @select="onSelect"
                />
                <span class="share iconfont" @click="showShare = true"
                  >&#xe6a5;</span
                >
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getMv,getCategory,getGroup,getVideo } from "../assets/axios/mv.js";
import { Icon, ShareSheet, Toast, Tab, Tabs } from "vant";
import Headers from "../components/base/Headers.vue";
export default {
  components: {
    [Icon.name]: Icon,
    [ShareSheet.name]: ShareSheet,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Headers,
  },
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      data: [], // 歌曲数据
      bg: true,
      play: false,
      id: null,
      num: -1,
      url: "", // 视频地址
      title: [], // 分类
      ids: [], // 存储视频id
      video: [], // 视频
      isMV: false, // 判断是否是mv
      bgCover: -1, //封面
      i: 0,
    };
  },
  methods: {
    // 获取mv
    getPlay(area,type) {
        getMv(area || "", type || "").then((data) => {
          this.data = data.data;
        //   console.log('MV=>',this.data);
        });
      // 获取分类列表
      getCategory().then((data) => {
        // console.log("分类列表=>", data.data);
        this.title = data.data;
        data.data.forEach((ele) => {
          this.ids.push(ele.id);
        });
        // console.log("ids=>", this.ids);
        this.showGroup(this.ids[0]);
      });
    },

    // 显示视频
    showGroup(id) {
      this.video.splice(0, this.video.length);
      // console.log('this.video=>',this.video);
      // console.log("id=>",id);
      getGroup(id).then((data) => {
        // console.log('视频=>',data.datas);
        this.video = data.datas;
      });
    },
    // 分享
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    // 切换
    onChange(name, title) {
      if (title == "MV") {
        this.isMV = true;
      } else {
        this.isMV = false;
      }
      this.num = -1;
      this.i = name;
      this.bg = true;
      this.showGroup(this.ids[name]);
    },
    // 开始播放
    startPlay(id, index, ele) {
      console.log(ele);
      this.$refs[this.i].forEach((ele) => {
        ele.pause();
      });
      this.num = index; // 按钮切换
      getVideo(id).then((data) => {
        this.url = data.urls[0].url;
        console.log(this.$refs);
        setTimeout(() => {
          this.$refs[this.i][index].play(); //开始播放
        }, 500);
      });
    },
    // 暂停播放
    stopPlay(index) {
      this.num = -1;
      this.$refs.video[index].pause(); //开始播放
      console.log(index);
    },
    // 进入详情
    getDetail(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id: id,
        },
      });
    },
    // 收藏视频
    cat() {
        Toast("收藏成功");
    },
  },
  created() {
    this.getPlay();
  },
  filters: {
    // 播放时长
    playerTime(data) {
      let d = parseInt(data / 1000);
      let m = parseInt(d / 60); //分钟
      let s = parseInt(d % 60); //秒
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + (s < 10 ? "0" + s : s); // 01
      }
    },
    // 播放数量
    getCount(val) {
      let w =
        val > 100000000
          ? parseFloat(val / 100000000).toFixed(1) + "亿"
          : val > 10000
          ? parseInt(val / 10000) + "w"
          : val;
      return w;
    },
  },
  watch: {},
};
</script>

<style lang="less">
.mv {
  //   margin-top: 15vw;
  height: 100vh;
  width: 100vw;
  background: #fff;
  & .info-bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    & .info-load {
      width: 10vw;
      height: 10vw;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}
.con-mv {
  width: 100vw;
  // mv播放
  & .cover {
    width: 95vw;
    height: 38vh;
    margin: 0 auto;
    margin-top: 3vw;
    border-radius: 1.5vw;

    position: relative;
    & .video {
      width: 100%;
      height: 30vh;
      border-radius: 1.5vw;
      // display: none;
      position: absolute;
      z-index: 10;
    }
    & .bg-cover {
      width: 100%;
      height: 30vh;
      border-radius: 1.5vw;
      background-size: cover !important;
      position: absolute;
      left: 0;
      top: 0;
      background: #33333369;
      -webkit-filter: brightness(0.5); //兼容不同浏览器
      -o-filter: brightness(0.5);
      -moz-filter: brightness(0.5);
      filter: brightness(0.5); //设置亮度值，范围：0-1
    }
  }
  // 控件
  & .control {
    position: absolute;
    width: 100%;
    height: 30vh;
    top: 0;
    left: 0;
    border-radius: 1.5vw;
    z-index: 9;
    // background: darkgreen;
    & .mv-title {
      margin: 0vw auto;
      height: 12.5vw;
      width: 90vw;
      margin-top: 2vw;
      display: flex;
      text-indent: 2vw;
      font-weight: 600;
      color: #fff;
      font-size: 3.6vw;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 6vw;
      padding: 0vw 1vw;
    }
    // 播放按钮
    & .mv-play {
      width: 15vw;
      height: 15vw;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      // background: #33333354;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      & .icon-play {
        color: #fff;
        font-size: 14vw;
      }
    }
    & .bottom-play {
      width: 95vw;
      height: 5vh;
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 0vw;
      // 播放量
      & .left-play-mv {
        min-width: 30vw;
        max-width: 50vw;
        margin-left: 2vw;
        display: flex;
        align-items: center;
        & .icon-playCount {
          color: #fff;
          font-size: 4.5vw;
        }
        & .playCount {
          color: #fff;
          font-size: 3.4vw;
          padding-left: 1vw;
          font-weight: 550;
        }
      }
      // 播放时间
      & .play-time {
        width: 20vw;
        height: 10vw;
        margin-right: 3vw;
        color: #fff;
        text-align: right;
        line-height: 10vw;
        font-size: 3vw;
        font-weight: 600;
      }
    }
  }

  // 底部
  & .comment {
    width: 100%;
    height: 8vh;
    position: absolute;
    bottom: 0;
    // background: #f7f7f7;
    // border-bottom-left-radius: 1.5vw;
    // border-bottom-right-radius: 1.5vw;
    display: flex;
    & .left-title-mv {
      width: 40%;
      height: 8vh;
      // background: blue;
      display: flex;
      // justify-content: center;
      align-items: center;
      & .mv-logo {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
        margin-left: 2vw;
        border-radius: 50%;
        & img {
          width: 100%;
        }
      }
      & .text-nickname {
        line-height: 16px;
        font-weight: 500;
        font-size: 3.6vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 2vw;
        color: #a1a1a1;
      }
    }
    & .right-title-mv {
      display: flex;
      width: 60%;
      height: 8vh;
      align-items: center;
      justify-content: flex-end;
      & .item-mv {
        width: 20%;
        margin-right: 5vw;
        display: flex;
        align-items: center;
        & span.icon {
          color: #a1a1a1;
          padding: 0 1vw;
          font-size: 4.2vw;
          line-height: 8vh;
          vertical-align: middle;
        }
        & span.p {
          color: #a1a1a1;
          line-height: 9vh;
          font-size: 3.2vw;
        }
      }
      & .share {
        padding-right: 2vw;
        color: #a1a1a1;
        font-size: 4.2vw;
      }
    }
  }

  & .van-overlay {
    background: transparent;
  }
}
</style>