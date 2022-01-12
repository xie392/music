<template>
  <div class="rec">
    <div class="rank">
      <div class="title">
        <p class="title-p">推荐歌单</p>
        <div class="more">
          <span class="iconfont home-more">更多&#xe8f1;</span>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div
        class="recommend-song"
        v-for="(item, index) in songList"
        :key="index"
        @click="getRecommend(item.id)"
      >
        <div class="photo">
          <img v-lazy="item.picUrl" />
          <div class="playerCon">
            <van-icon name="play" class="play-cir">{{
              item.playCount | getCount
            }}</van-icon>
          </div>
        </div>
        <div class="p-txt">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";

export default {
  name: "Recommend",
  props: ["songList"],
  components: {
    [Icon.name]: Icon,
  },
  methods: {
    getRecommend(id) {
      this.$router.push({
        name: "songList",
        query:{
          id
        }
      });
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
@import "../../assets/css/common.css";
</style>