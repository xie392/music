<template>
  <div class="rank">
    <div class="title">
      <p class="title-p">排行榜</p>
      <div class="more">
        <span class="iconfont home-more">更多&#xe8f1;</span>
      </div>
    </div>
    <div class="wrap">
      <div class="item" v-for="(item, index) in rankList" :key="index" @click="getList(item.id,item.coverImgUrl)">
        <div class="imgs">
          <img v-lazy="item.coverImgUrl" lazy-load />
          <!-- <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image> -->
        </div>
        <div class="content">
          <p>
            {{ item.name }} <span class="iconfont home-more">&#xe8f1;</span>
          </p>
          <div class="txt">
            <p v-for="(ele, i) in item.tracks" :key="i">
              {{ i + 1 }}.{{ ele.first }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Rank",
  props: ["rankList"],
  methods:{
    // 点击跳转
    getList(id,imgurl){
      this.$router.push({
        name:'topList',
        query:{
          id,
          imgurl
        }
      })
    }
  }
};
</script>


<style lang="less">
.rank {
  margin: 2vw auto;
  width: 90vw;
}
.title {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  .title-p {
    margin-top: 5vw;
    margin-bottom: 3vw;
    margin-left: 1vw;
    font-size: 5vw;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #262338;
    // color: #fff;
    line-height: 7.467vw;
    display: inline-block;
  }
  .more > span {
    margin-top: 5vw;
    margin-bottom: 3vw;
    margin-left: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.wrap {
  width: 90vw;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
  .item:first-child {
    margin-top: 0vw;
  }
  .item {
    margin-top: 2vw;
    width: 90vw;
    max-height: 30vw;
    border-radius: 8px;
    // background: #f7f7f7;
    display: flex;
    .imgs {
      background:#cccccc70 url(../../assets/music.png) center center no-repeat;
      // background-size: cover;
      margin-top: 2.2vw;
      width: 25vw;
      height: 25vw;
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 25vw;
      }
    }
    .content {
      margin-left: 5vw;
      overflow: hidden;
      p {
        margin-top: 3vw;
        font-size: 3.733vw;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #262338;
        // color: #fefbfc;
        line-height: 5.333vw;
        margin-bottom: 5px;
      }
      .txt p {
        padding: 0;
        margin: 0;
        font-size: 2.933vw;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #a1a4b3;
        // color: #fff;
        line-height: 4.5vw;
        margin-bottom: 0.933vw;
        width: 57.333vw;
        text-overflow: ellipsis;
        width: 53.333vw;
      }
    }
  }
}
// span 更多
span.home-more {
  color: #c1c4cd;
  font-size: 3.4vw;
}
</style>