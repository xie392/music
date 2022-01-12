<template>
  <div class="soar-con">
    <!-- 加载 -->
    <Load :load="load"></Load>
    <van-sticky :offset-top="0" @change="getChange">
      <div :class="['soar-title', { active: isStyle }]">
        <h2>共{{ songList.length }}首歌曲</h2>
        <div class="playall">
          <van-icon name="play" class="play" />
          <span class="all" @click="playAll">播放全部</span>
        </div>
      </div>
    </van-sticky>

    <ul class="song-list">
      <li v-for="(item, index) in songList" :key="index">
        <div class="num">
          {{ index + 1 }}
          <!-- <van-icon name="plus" class="icon-dow" /> -->
        </div>
        <div class="con">
          <div class="song-name">{{ item.name }}</div>
          <div class="singer">{{ item.ar[0].name }}</div>
        </div>
        <div class="dow">
          <van-icon name="video" class="icon-dow" v-show="item.mv != 0" />
          <!-- <van-icon name="plus" class="icon-dow" /> -->
          <van-icon name="play-circle"  class="icon-dow" @click="onPlay(index)"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon, Sticky } from "vant";
import { sortSong } from "../../assets/axios/Home.js";
import Load from '../../components/base/Load.vue';

export default {
  name: "song",
  props: ["id"],
  components: {
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    Load
  },
  data() {
    return {
      songList: [], // 所有歌曲
      isStyle: false, // 吸顶样式
      load:true,  // 加载
    };
  },
  methods: {
    // 请求数据
    getSong(id) {
      sortSong(id).then((data) => {
        this.songList = data.playlist.tracks;
      });
    },
    // 页面滚动
    getChange() {
      this.isStyle = !this.isStyle;
    },
    // 点击播放
    onPlay(index) {
      // 把下标传入 迷你播放器中
      this.$emit("get-data", {
        allsongs: this.songList,
        index,
      });
    },
    // 播放全部
    playAll() {
      this.$emit("get-data", {
        allsongs: this.songList,
        index: 0,
      });
    },
  },
  created() {
    this.getSong(this.id);
  },
  watch: {
    id(val) {
      this.getSong(val);
    },
    async songList(){
        await this.$nextTick(()=>{
            this.load = false;
        })  
    }
  },
};
</script>

<style lang="less">
@import "../../assets/css/base.css";
</style>