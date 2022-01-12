<template>
  <div id="toplist">
    <div class="soar-img">
      <van-icon name="arrow-left" class="back" @click="$router.go(-1)"
        >排行榜</van-icon
      >
      <div
        class="bg-s"
        :style="{ background: 'url(' + $route.query.imgurl + ')' }"
      ></div>
    </div>
    <song :id="id" @get-data="showdata"></song>
  </div>
</template>

<script>
import { Icon } from "vant";
import song from "../components/Home/song.vue";

export default {
  name: "topList",
  components: {
    [Icon.name]: Icon,
    song,
  },
  data() {
    return {
      id: this.$route.query.id, // 排行榜id
    };
  },
  methods: {
    // 点击播放
    showdata(obj) {
      this.$emit("get-data", obj);
    },
  },
  watch: {
    "$route.query"() {
      if (this.$route.query.id != undefined) {
        this.id = this.$route.query.id;
      }
    },
  },
};
</script>

<style lang="less">
#toplist {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.back {
  padding: 4vw;
  font-size: 4.2vw;
  color: #fff;
  position: absolute;
  z-index: 9;
}
.soar-img {
  width: 100%;
  height: 40vh;
  position: relative;
  background: #cccccc70  url(../assets/music2.png) center center no-repeat;
  .bg-s {
    width: 100%;
    height: 40vh;
    background-size: cover !important;
    background-position-y: -14vw !important;
  }
}
</style>