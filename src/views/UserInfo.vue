<template>
  <div class="info">
    <van-icon name="arrow-left" class="info-back" @click="$router.push('/')">个人中心</van-icon>

    <span class="iconfont info-more" is-link @click="showPopup">&#xe648;</span>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="set-con">
        <div class="set">
          <img :src="bgurl" />
        </div>
        <van-uploader class="upload" :max-count="1" :after-read="afterRead">
          <van-button type="primary" size="mini" class="mini"
            >更换头像</van-button
          >
        </van-uploader>
        <div class="set-item">
          <p class="set-p">昵称</p>
          <span class="info-messge">{{ name }}</span>
          <span class="iconfont set-icon">&#xe8f1;</span>
        </div>
        <div class="set-item">
          <p class="set-p">性别</p>
          <span class="info-messge">{{ sex }}</span>
          <span class="iconfont set-icon">&#xe8f1;</span>
        </div>
        <div class="set-item">
          <p class="set-p">出身日期</p>
          <!-- <van-cell title="选择单个日期"  /> -->
          <span class="info-messge">{{ birthday }}</span>
          <span class="iconfont set-icon">&#xe8f1;</span>
        </div>
        <div class="set-item">
          <p class="set-p">签名</p>
          <span class="info-messge">{{ signature }}</span>
          <span class="iconfont set-icon">&#xe8f1;</span>
        </div>
        <div class="set-item">
          <p class="set-p">手机号</p>
          <span class="info-messge">{{ phone }}</span>
          <span class="iconfont set-icon">&#xe8f1;</span>
        </div>
        <!-- <van-button type="primary" size="large" >大号按钮</van-button> -->
      </div>
      <div class="set-bottom">
        <van-button
          color="#36"
          size="large"
          plain
          class="large"
          @click="modData"
          >修改数据</van-button
        >
        <van-button color="#36" size="large" plain class="large" @click="Logout"
          >退出登录</van-button
        >
      </div>
    </van-popup>
    <div class="top-info">
      <div class="info-img">
        <div class="info-bgurl">
          <!-- <van-uploader> -->
          <img :src="bgurl" />
          <!-- </van-uploader> -->
        </div>
        <div class="ingo-title">
          {{ name }}
          <span class="info-level">Lv.{{ level }}</span>
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <div class="song-info">
        <h3 class="my-song">我的歌单({{ len }})</h3>
        <van-empty description="暂无歌单" v-show="len == 0" />
        <div class="my-info">
          <div
            :class="{
              'swiper-container': len > 3,
              'swiper-container-01': len > 3,
            }"
          >
            <div :class="{ 'swiper-wrapper': len > 3, flex: len <= 3 }">
              <div
                class="swiper-slide item info-item"
                v-for="(item, index) in usersong"
                :key="index"
                @click="playSong(item)"
              >
                <div class="item-img">
                  <img :src="item.coverImgUrl" alt="" />
                  <span class="info-play">
                    <i></i>
                    <p>{{ item.playCount | getCount }}</p>
                  </span>
                </div>
                <div class="item-title">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-01"></div>
          </div>
        </div>
      </div>

      <!-- <div class="info-set">

            </div> -->

      <!-- <div class="song-info">
        <h3 class="my-song">我喜欢的音乐({{ like }})</h3>
        <van-empty description="暂无喜欢的音乐" v-show="like == 0" />
        <ul class="like-songs">
          <li v-for="(item, index) in mylove" :key="index">
            <div class="num">{{ index + 1 }}</div>
            <div class="con">
              <div class="song-name">{{ item.name }}</div>
              <div class="singer">{{ item.ar[0].name }}</div>
            </div>
            <div class="dow">
              <span class="iconfont" v-show="item.mv != 0">&#xe6a8;</span>
              <span class="iconfont">&#xe69f;</span>
            </div>
          </li>
        </ul>
      </div> -->

      <!-- <div class="song-info">
                <h3 class="my-song">每日推荐歌单({{ recl }})</h3>
                <van-empty  description="暂无推荐"  v-show="len==0"/>
                <div class="my-info">
                    <div class="swiper-container swiper-container-01">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide item info-item" v-for="(item,index) in recommend" :key="index">
                                <div class="item-img">
                                    <img :src="item.al.picUrl" alt="">
                                </div>
                                <div class="item-title">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    <div class="swiper-pagination swiper-pagination-01"></div>
                </div>
            </div>
            </div> -->

      <!-- <div class="song-info">
                <h3 class="my-song">我喜欢的歌曲({{ like }})</h3>
                <van-empty  description="暂无喜欢
                -欢的歌曲"  v-show="len==0"/>
                <div class="my-info">
                    <div class="swiper-container swiper-container-01">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide item info-item" v-for="(item,index) in recommend" :key="index">
                                <div class="item-img">
                                    <img :src="item.al.picUrl" alt="">
                                </div>
                                <div class="item-title">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    <div class="swiper-pagination swiper-pagination-01"></div>
                </div>
            </div> 
         </div> -->
      <div class="song-info">
        <h3 class="my-song">我收藏的专辑({{ sub }})</h3>
        <van-empty description="暂无收藏" v-show="sub == 0" />
        <div class="my-info">
          <div
            :class="{
              'swiper-container': sub > 3,
              'swiper-container-01': sub > 3,
            }"
          >
            <div :class="{ 'swiper-wrapper': sub > 3, flex: sub <= 3 }">
              <div
                class="swiper-slide item info-item"
                v-for="(item, index) in sublist"
                :key="index"
                @click="playSub(item)"
              >
                <div class="item-img">
                  <img :src="item.picUrl" alt="" />
                </div>
                <div class="item-title">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-01"></div>
          </div>
        </div>
      </div>

      <div class="song-info">
        <h3 class="my-song">我收藏的专栏({{ topic }})</h3>
        <van-empty description="暂无收藏" v-show="topic == 0" />
        <div class="my-info">
          <div
            :class="{
              'swiper-container': topic > 3,
              'swiper-container-01': topic > 3,
            }"
          >
            <div :class="{ 'swiper-wrapper': topic > 3, flex: topic <= 3 }">
              <div
                class="swiper-slide item info-item"
                v-for="(item, index) in topiclist"
                :key="index"
              >
                <div class="item-img">
                  <img :src="item.picUrl" alt="" />
                </div>
                <div class="item-title">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-01"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改 -->
    <div class="mod" v-show="mod">
      <van-icon name="arrow-left" class="mod-back" @click="mod = false" >个人中心</van-icon>
      <div class="mod-txt">
        <div class="itm">
          <span class="info-title">昵称：</span>
          <input
            type="text"
            v-model="nickname"
            class="mod-name"
            ref="nickname"
          />
        </div>
        <div class="itm">
          <span class="info-title">签名：</span>
          <textarea
            id="textarea"
            cols="30"
            rows="5"
            maxlength="294"
            v-model="newsignature"
            ref="text"
          ></textarea>
        </div>
        <div class="itm itm-sex">
          <span class="info-title">性别：</span>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio
              :name="sex == '男' ? '0' : '1'"
              icon-size="16"
              @click="num(1)"
              >男</van-radio
            >
            <van-radio
              :name="sex == '女' ? '0' : '2'"
              icon-size="16"
              @click="num(2)"
              >女</van-radio
            >
            <van-radio
              :name="sex == '保密' ? '0' : '3'"
              icon-size="16"
              @click="num(0)"
              >保密</van-radio
            >
          </van-radio-group>
        </div>
        <div class="itm">
          <span class="info-title">生日：</span>
          <!-- <van-calendar v-model="isShow" @confirm="onConfirm"/> -->
          <van-cell :value="date" @click="isShow = true" />
          <van-calendar
            v-model="isShow"
            @confirm="onConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
        <div class="itm">
          <van-button type="primary" block @click="update">保存</van-button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import {
  getAccount,
  getLevel,
  getList,
  getLikelist,
  getSongInfo,
  getImg,
  getUpdate,
  getLogout,
  getSublist,
  getTopic,
} from "../assets/axios/info.js";
import { Icon, ShareSheet, Toast, Dialog, Popup, Empty,RadioGroup, Radio,Calendar,Button,Cell, CellGroup, Uploader  } from "vant";
import Swiper from "swiper";
export default {
  name: "userinfo",
  components: {
    [Icon.name]: Icon,
    [ShareSheet.name]: ShareSheet,
    [Dialog.Component.name]: Dialog.Component,
    [Popup.name]: Popup,
    [Empty.name]: Empty,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Calendar.name]: Calendar,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      account: null,
      bgurl: null, // 背景图片
      name: "", // 名字
      usersong: null, // 用户歌单
      len: 0, // 我的歌单总数
      level: 0, // 等级
      playCount: 0, // 收听人数
      recommend: null, // 每日推荐歌单
      recl: 0, // 每日推荐歌单总数
      like: 0, // 我喜欢的音乐
      bg: true, // 未加载完成显示
      mylove: [], //  我喜欢的音乐
      show: false, // 设置
      sex: 0, // 性别
      birthday: "", // 生日
      signature: "", // 用户签名
      phone: "", // 绑定手机号
      mod: false, // 修改数据
      radio: "0",
      date: "",
      isShow: false,
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(2021, 0, 31),
      nickname: "", // 修改昵称
      newsignature: "", // 修改签名
      index: 0, // 性别编号
      city: "", // 城市id
      province: "", // 省份id,
      sub: 0, // 喜欢专辑总数
      sublist: [], // 喜欢的专辑
      topic: 0, //收藏专栏总数
      topiclist: [], //收藏专栏
    };
  },
  methods: {
    // 获取音乐详情
    getSong(arr) {
      arr.forEach((ele) => {
        getSongInfo(ele).then((data) => {
          // console.log('歌曲信息=>',data.songs);
          this.mylove.push(data.songs[0]);
        });
      });
    },
    // 弹出层
    showPopup() {
      this.show = true;
    },
    // 上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log('图片信息=>',file);
      var fr = new FileReader();
      fr.readAsDataURL(file.file);
      let _this = this;
      fr.onload = (thefr) => {
        let image = new Image();
        image.src = thefr.target.result;
        image.onload = async function () {
          var formData = new FormData();
          formData.append("imgFile", file.file);
          // 获取用户信息 cookie
          if (document.cookie) {
            // console.log(this.width,this.height);
            // 修改头像;
            await getImg(document.cookie, formData).then((data) => {
              _this.bgurl = data.data.url;
            });
          }
        };
      };
    },

    // 修改
    modData() {
      this.mod = true;
    },
    formatDate(date) {
      this.data = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      return this.data;
    },
    onConfirm(date) {
      this.isShow = false;
      this.date = this.formatDate(date);
    },
    // 单选
    num(index) {
      this.sex = index;
    },
    // 修改
    update() {
      let nickname = this.$refs.nickname.value;
      let text = this.$refs.text.value;
      // console.log('当前时间=>',this.date);
      let birthday = new Date(this.date).getTime();
      // console.log('当前时间戳=>',birthday);
      getUpdate({
        gender: this.index,
        signature: text,
        city: this.city,
        nickname: nickname,
        birthday: birthday,
        province: 440000,
      }).then((data) => {
        if (data.code == 200) {
          Toast({ message: "修改成功！", position: "top" });
          this.gender = this.index;
          this.signature = text;
          this.nickname = nickname;
          this.birthday = birthday;
          this.getmyInfo();
        } else if (data.code == 400) {
          Toast({ message: data.message, position: "top" });
        } else {
          Toast({ message: "修改失败！", position: "top" });
        }
        // console.log('修改=>',data);
      });
    },
    // 获取用户信息
    getmyInfo() {
      getAccount().then((data) => {
        // console.log('用户信息=>',data);
        this.sex =
          data.profile.gender == 0
            ? "保密"
            : data.profile.gender == 1
            ? "男"
            : "女";
        this.birthday = new Date(data.profile.birthday).toLocaleDateString();
        this.signature = data.profile.signature; // 签名
        this.phone = data.profile.shortUserName; // 手机号
        this.name = data.profile.nickname;
        this.city = data.profile.city; // 城市id
        this.province = data.profile.province; // 省份id
        this.date = this.birthday; // 生日
        this.bgurl = data.profile.avatarUrl;
        this.nickname = this.name;
        this.newsignature = this.signature;
      });
    },
    // 退出登录
    Logout() {
      getLogout().then((data) => {
        if (data.code == 200) {
          Toast({ message: "退出成功！", position: "top" });
          localStorage.clear();
          this.$router.push("/");
        } else {
          Toast({ message: "退出失败！", position: "top" });
        }
      });
    },
    // 滑动
    getH() {
      this.$nextTick(function () {
        new Swiper(".swiper-container-01", {
          slidesPerView: 3, //显示个数
          paginationClickable: true,
          observer: true,
          observeParents: true,
          spaceBetween: 10, //div之间间距
        });
      });
    },
    // 歌单点击
    playSong(ele) {
      this.$router.push({
        name: "Recommend",
        query: {
          id: ele.id,
          imgurl: ele.coverImgUrl,
          title: ele.name,
          playCount: ele.playCount,
        },
      });
      // console.log(ele);
    },
    // 专辑点击
    playSub(ele) {
      // console.log(ele);
      this.$router.push({
        name: "AlbumDeatil",
        query: {
          id: ele.id,
        },
      });
    },
  },
  created() {
    // 用户信息
    this.getmyInfo();
    // 获取用户等级信息
    getLevel().then((data) => {
      // console.log('获取用户等级信息 =>',data);
      this.level = data.data.level;
    });
    // 用户歌单
    let uid = localStorage.getItem("uid");
    getList(uid).then((data) => {
      this.usersong = data.playlist;
      this.len = data.playlist.length;
      // console.log('用户歌单=>',data);
    });
    // 我收藏的专辑
    getSublist().then((data) => {
      this.sub = data.data.length;
      this.sublist = data.data;
      // console.log('我收藏的专辑=>',data.data);
    });
    // 收藏专栏
    getTopic().then((data) => {
      this.topic = data.count;
      // console.log('收藏专栏=>',data);
    });

    getLikelist().then((data) => {
      this.like = data.ids.length;
      // console.log('我喜欢的音乐=>',data.ids);
      // console.log();
      this.getSong(data.ids);
    });
  },
  filters: {
    getCount(val) {
      // 113338240 / 10000000
      let w =
        val > 100000000
          ? parseFloat(val / 100000000).toFixed(1) + "亿"
          : val > 10000
          ? parseInt(val / 10000) + "w"
          : val;
      return w;
    },
  },
  watch: {
    len: function (val) {
      if (val > 3) {
        this.getH();
      }
    },
    sub(val) {
      if (val > 3) {
        this.getH();
      }
    },
    topic(val) {
      if (val > 3) {
        this.getH();
      }
    },
  },
};
</script>


<style lang="less">
.van-toast,
.van-toast,
.van-toast--top,
.van-toast--text {
  z-index: 99999 !important;
}
.van-radio__label{
  font-size: 3.6vw !important;
}

.info {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  & > .mod {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    justify-content: center;
    left: 0;
    top: 0;
    background: #f5f5f5;
    & .mod-back {
      font-size: 4vw;
      position: absolute;
      left: 4vw;
      top: 4vw;
    }
    & .mod-txt {
      align-items: center;
      margin: 15vh auto;
      flex-direction: column;
      width: 80vw;
      min-height: 50vh;
      padding: 3vw 0;
      & .itm {
        margin-bottom: 5vw;
        width: 80vw;
        display: flex;
        min-height: 10vw;
        // align-items: center;
        color: #333;
        & span.info-title {
          display: block;
          width: 15vw;
          font-size: 4vw;
          line-height: 10vw;
        }
        & .mod-name {
          width: 65vw;
          padding: 3vw;
          font-size: 4vw;
          color: #333;
          // border-radius: 5vw;
          border: 1px solid #cccccc3b;
          outline: none;
        }
        & #textarea {
          width: 65vw;
          border: 1px solid #cccccc3b;
          padding: 3vw;
          font-size: 4vw;
        }
      }
      & .itm-sex {
        align-items: center;
        & .van-radio-group {
          display: flex;
          flex-wrap: nowrap;
          & span.van-radio__label {
            width: 10vw !important;
          }
        }
        // & p{
        // display: flex;
        // align-items: center;
        & input[type="radio"] {
          margin-top: -0.3vw;
        }
        & span {
          line-height: 8vw;
        }
        // }
      }
      & .itm:last-child {
        margin-top: 10vw;
      }
    }
  }
  & .van-popup {
    background: #f5f5f5;
  }
  & .info-bg {
    width: 100vw;
    height: 100vh;
    // background: #fff;
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
  & > .info-back {
    position: absolute;
    left: 4vw;
    top: 4vw;
    font-size: 4vw;
    color: #fff;
    z-index: 100;
  }
  & .info-more {
    position: absolute;
    right: 4vw;
    top: 4vw;
    font-size: 4.3vw;
    color: #fff;
  }
  & .top-info {
    width: 100vw;
    height: 35vh;
    background: #d43c33;
    display: flex;
    align-items: center;
    justify-content: center;
    & .info-img {
      width: 40vw;
      height: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      & .info-bgurl {
        width: 30vw;
        height: 30vw;
        background: #cccccc70 url(../assets/music.png) center center no-repeat;
        border-radius: 50%;
        overflow: hidden;
        & img {
          width: 100%;
        }
      }
      & .ingo-title {
        height: 10vw;
        line-height: 10vw;
        font-size: 5vw;
        color: #fff;
        width: 60vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        position: relative;
        & .info-level {
          display: inline-block;
          border-radius: 8vw;
          font-size: 3.2vw;
          line-height: 10vw;
          color: yellow;
          font-style: italic;
        }
      }
    }
  }
  & .bottom-info {
    width: 96vw;
    // height: 80vh;
    height: auto;
    margin: 0 auto;
    & .song-info {
      width: 95vw;
      // min-height: 30vh;
      height: auto;
      & .my-song {
        font-size: 5vw;
        font-weight: 500;
        line-height: 5vw;
        color: rgb(51, 51, 51);
        height: 8vw;
        border-bottom: 0.5vw solid #d43c33;
        margin: 0;
        margin-top: 5vw;
      }
      & .my-info {
        margin-right: 2.5vw;
        width: 95vw;
        display: flex;
        // flex-wrap: wrap;
        overflow: hidden;
        & .flex {
          display: flex;
          & > div {
            margin-right: 4vw;
          }
        }
        // & .swiper-slide,
        // & .item
        // & .info-item{
        //   margin-right: 4vw;
        // }
        & .info-item {
          width: 30vw;
          height: 40vw;
          margin-top: 4vw;
          & .item-img {
            width: 30vw;
            height: 30vw;
            overflow: hidden;
            background: #cccccc70 url(../assets/music.png) center center no-repeat;
            position: relative;
            & img {
              width: 100%;
            }
            & .info-play {
              position: absolute;
              left: 0;
              bottom: 0;
              display: flex;
              z-index: 2;
              border-radius: 0 4.267vw 0 0;
              box-sizing: border-box;
              height: 7.6vw;
              background-color: rgba(0, 0, 0, 0.3);
              align-items: center;
              min-width: 10vw;
              padding-right: 2vw;
              max-width: 30vw;
              justify-content: flex-start;
              & i {
                display: block;
                width: 0px;
                height: 0px;
                border: 2vw solid transparent;
                border-left-color: #fff;
                border-radius: 1.2vw;
                margin-left: 2vw;
              }
              & p {
                color: #fff;
                letter-spacing: 1px;
                font-size: 3.4vw;
              }
            }
          }
          & .item-title {
            width: 29vw;
            height: 10vw;
            text-align: left;
            padding-left: 1vw;
            line-height: 10vw;
            color: #333;
            font-size: 4vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      & .like-songs {
        width: 96vw;
        list-style: none;
        margin-top: 2vw;
        margin-bottom: 2vw;
        & li {
          height: 13vw;
          display: flex;
          align-items: center;
          border-bottom: 0.2vw solid #cccccc40;
          // #cccccc40
          // box-shadow: 0 0 0.5vw #cccccc40;
          & .num {
            width: 5vw;
            text-align: center;
            font-size: 4vw;
            font-weight: 700;
            color: #a1a4b3;
          }
          & .con {
            width: 73vw;
            padding-left: 3vw;
            display: flex;
            flex-direction: column;
            & .song-name {
              font-size: 3.7vw;
              font-weight: 520;
              color: #262338;
              line-height: 6vw;
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            & .singer {
              font-size: 3vw;
              display: inline-block;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #a1a4b3;
            }
          }
          & .dow {
            width: 10vw;
            display: flex;
            justify-content: flex-end;
            & span {
              display: block;
              // width: 5vw;
              text-align: right;
              font-size: 4vw;
              padding-left: 3vw;
            }
          }
        }
      }
    }
  }
  & .van-empty {
    height: 25vh;
    & .van-empty__image {
      display: flex;
      align-items: center;
      justify-content: center;
      & img {
        width: 30vw;
        height: 30vw;
      }
    }
  }
}

.set-bottom {
  width: 100%;
  height: 30vw;
  // position: absolute;
  margin: 8vw 0;
  // bottom: 2vh;
  display: flex;
  flex-direction: column;
  & .large {
    width: 100%;
    height: 15vw;
  }
}

.set-con {
  width: 100%;
  // height: 90vh;
  // margin-top: 8vh;
  // background: blue;
  & .set {
    margin: 10vw auto;
    margin-bottom: 0;
    width: 20vw;
    height: 20vw;
    overflow: hidden;
    position: relative;
    & img {
      width: 100%;
    }
  }
  & .upload {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  & .mini {
    width: 20vw;
    display: block;
    margin: 4vw auto;
  }
  & .set-item {
    width: 100%;
    min-height: 10vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc40;
    box-shadow: 0 0 0.4 0vw 0vw #cccccc40;
    padding: 3vw 0;
    background: #fff;
    & .set-p {
      font-weight: 530;
      font-size: 4.4vw;
      padding-left: 3vw;
      color: #323233;
      margin: 0;
      width: 40%;
    }
    & .info-messge {
      width: 40%;
      color: #323233;
      font-size: 4.4vw;
      text-align: right;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    & .set-icon {
      width: 8%;
      padding-right: 2vw;
      font-size: 5vw;
      color: #323233;
      font-weight: bold;
    }
    // background: blueviolet;
  }
}
</style>