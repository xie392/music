<template>
  <div class="comment">
    <van-tabs v-model="active">
      <van-tab title="最新">
        <div class="com-con" v-for="(item, index) in newComments" :key="index">
          <div class="com-img">
            <div class="imgs">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="com-name">
              <div class="name">{{ item.user.nickname }}</div>
              <van-icon
                name="good-job"
                :class="['zan', { q: index == num1[index] }]"
                @click="getlike(item.commentId, index)"
                >{{ item.likedCount | getCount }}</van-icon
              >
              <div class="time">{{ item.timeStr }}</div>
            </div>
          </div>
          <div class="com-content">{{ item.content }}</div>
        </div>
      </van-tab>
      <van-tab title="最热">
        <div class="com-con" v-for="(item, index) in hotComments" :key="index">
          <div class="com-img">
            <div class="imgs">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="com-name">
              <div class="name">{{ item.user.nickname }}</div>
              <van-icon
                name="good-job"
                :class="['zan', { q: index == num2[index] }]"
                @click="getlike2(item.commentId, index)"
                >{{ item.likedCount | getCount }}</van-icon
              >
              <div class="time">{{ item.timeStr }}</div>
            </div>
          </div>
          <div class="com-content">{{ item.content }}</div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="bottom-hid"></div>
    <div class="btns-com">
      <div class="btn-s">
        <input
          type="text"
          class="text"
          placeholder="留下你的精彩评论吧"
          v-model="value"
        />
        <span class="cancel" @click="submit">发表</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Icon, Search, Button, List, Toast } from "vant";
import { getComment, getLikecomment, getCom } from "../../assets/axios/soar.js";

export default {
  props: ["id", "type"],
  name: "Comment",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button,
    [List.name]: List,
  },
  data() {
    return {
      active: 0,
      page: 1, // 页数
      pageNum: 50, // 数据
      cursor: "", //当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
      newComments: [], // 最新评论
      hotComments: [], // 最热评论
      value: "", // 评论
      num1: [], // 用于记录下标，最新
      num2: [], // 热评
    };
  },
  methods: {
    // 请求评论数据
    getData(page, pageNum, type, arr, arr2) {
      getComment({
        id: this.id,
        type: this.type,
        sortType: type,
        pageNo: page,
        pageSize: pageNum,
      }).then((data) => {
        data.data.comments.forEach((ele, i) => {
          arr.push(ele);
          arr2.push(-(i + 1));
        });
        this.cursor = data.data.cursor;
      });
    },
    // 点赞函数
    getLove(t, cid) {
      getLikecomment({
        type: this.type,
        id: this.id,
        t,
        cid: cid,
      }).then((data) => {
        if (data == 200 && t == 1) {
          Toast("点赞成功");
        } else if (data == 200 && t == 0) {
          Toast("取消点赞");
        }
      });
    },

    // 点赞
    getlike(cid, index) {
      let uid = localStorage.getItem("uid");
      if (uid) {
        if (this.num1[index] != index) {
          this.getLove(1, cid);
          this.num1.splice(index, 1, index);
          Toast("点赞成功");
        } else {
          this.getLove(0, cid);
          this.num1.splice(index, 1, -1);
          Toast("取消点赞");
        }
      } else {
        Toast("请先登良!");
      }
    },
    getlike2(cid, index) {
      let uid = localStorage.getItem("uid");
      if (uid) {
        if (this.num2[index] != index) {
          this.getLove(1, cid);
          this.num2.splice(index, 1, index);
          Toast("点赞成功");
        } else {
          this.getLove(0, cid);
          this.num2.splice(index, 1, -1);
          Toast("取消点赞");
        }
      } else {
        Toast("请先登良!");
      }
    },
    // 发表评论
    submit() {
      let uid = localStorage.getItem("uid");
      if (uid) {
        if (this.text == "") {
          Toast("请先输入内容");
          return;
        }
        getCom(this.id, this.type, this.value).then((data) => {
          if (data.code == 200) {
            Toast("发表成功");
            this.value = "";
          }
        });
      } else {
        Toast("请先登录!");
      }
    },
  },
  created() {
    this.getData(this.page, this.pageNum, 3, this.newComments, this.num1);
    this.getData(this.page, this.pageNum, 2, this.hotComments, this.num2);
  },
  filters: {
    getCount(val) {
      let w = val > 10000 ? parseInt(val / 10000) + "w" : val;
      return w;
    },
  },
  watch: {
    id(val) {
      this.newComments = [];
      this.hotComments = [];
      this.num1 = [];
      this.num2 = [];
      this.id = val;
      this.getData(this.page, this.pageNum, 3, this.newComments, this.num1);
      this.getData(this.page, this.pageNum, 2, this.hotComments, this.num2);
    },
  },
};
</script>


<style lang="less">
// 导航文字
.van-tab__text {
  color: #333333ba;
  font-weight: 600;
  font-size: 3.4vw;
}
// 导航选中样式
.van-tabs__line {
  width: 25px;
  height: 2px;
  bottom: 20px;
}
// 按钮
.van-button--mini {
  padding: 0 4vw;
}

.van-tabs__nav {
  position: relative;
  z-index: 9;
}
.van-tabs__nav {
  background: #fff;
}

@w: 95%;
.comment {
  width: 100%;
  margin: 0vw auto;
  position: relative;
  //   .van-tabs__wrap {
  //     position: fixed;
  //     width: 100%;
  //     z-index: 9;
  //     margin-top: -1px;
  //     border-bottom: 1px solid #dfdfdf;
  //   }
  .com-con {
    width: 95vw;
    margin: 0 auto;
    align-items: center;
    // margin-top: 3vw;
    border-radius: 1.5vw;
    display: flex;
    flex-wrap: wrap;
    // border-bottom: 0.12vw solid #cccccc69;
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
        background: skyblue url(../../assets/music.png) center center no-repeat;
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
        .q {
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
  //   底部
  .bottom-hid {
    width: 100%;
    height: 15vw;
  }
  //   发表
  .btns-com {
    position: fixed;
    width: 100vw;
    height: 15vw;
    bottom: 0;
    display: flex;
    background: #fff;
    border-top: 1px solid #dfdfdf;
    align-items: center;
    justify-content: center;
    .btn-s {
      margin: 0 auto;
      background: #f2f4f5;
      border-radius: 5.333vw;
      display: flex;
      align-items: center;
      width: 75vw;
      justify-content: flex-start;
      margin-left: 6vw;
      position: relative;
      .text {
        border-radius: 5.333vw;
        padding: 3vw 4vw;
        border: none;
        outline: none;
        background: #f2f4f5;
        color: rgba(38, 35, 56, 0.5);
        font-size: 4vw;
        font-weight: 400;
      }
      .cancel {
        position: absolute;
        left: 105%;
        display: block;
        min-width: 10vw;
        font-size: 4.267vw;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 35, 56, 0.5);
      }
    }
  }
}
</style>