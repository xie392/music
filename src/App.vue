<template>
  <div>
    <!-- 头部导航栏 -->
    <!-- <Headers></Headers> -->
    <keep-alive>
      <router-view @get-data="showdata"></router-view>
    </keep-alive>
    <div id="footer"></div>
    <play-music
      :songData="allsongs"
      :index="index"
      v-if="index >= 0"
    ></play-music>
  </div>
</template>

<script>
import PlayMusic from "../src/components/base/playMusic.vue";

export default {
  components: {
    PlayMusic,
  },
  data() {
    return {
      allsongs: [],
      index: -1,
    };
  },
  methods: {
    showdata(obj) {
      this.allsongs = obj.allsongs;
      this.index = obj.index;
    },
  },
};
</script>

<style lang="less">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  box-sizing: border-box;
  // background: #f5f5f5;
  background: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  #footer {
    width: 100%;
    height: 18vw;
  }
}
</style>




