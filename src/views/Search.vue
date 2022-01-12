<template>
    <div class="warpper">
        <!-- 下载App -->
        <!-- <header-data></header-data> -->
        <!-- 搜索框 -->
        <div class="searchs">
            <span class="iconfont ser" @click="searchKeywords">&#xe650;</span> 
            <input type="text" class="text" placeholder="搜索你想听的歌曲" 
                v-model.trim="keywords" 
                @keyup.enter="searchKeywords">
                <span class="del iconfont" v-show="keywords!=''" @click="clear">&#xe723;</span>
                <router-link to="/" class="cancel" tag="span">取消</router-link> 
        </div>

        <!-- 热门搜索 -->
        <div class="hot" v-show="keywords=='' && isShow==false">
            <div class="hot-search">热门搜索</div>
            <ul class="list">
                <li v-for="(item,index) in searchs" :key="index" @click="getKeyword(item.searchWord)">
                    <span>{{index+1}}</span>
                    <p>{{item.searchWord}}</p>
                </li>
            </ul>
        </div>

        <div class="hot" v-show="keywords!=''&& isShow==false">
            <div class="hot-search">搜索建议</div>
            <ul class="list">
                <li v-for="(item,index) in suggest" :key="index" @click="getKeyword(item.keyword)">
                    <span>{{index+1}}</span>
                    <p>{{item.keyword}}</p>
                </li>
            </ul>
        </div>

         <div class="hot" v-show="keywords!=''&& isShow==true">
            <!-- <div class="hot-search">搜索结果</div> -->
            <ul class="song-list">
                <li v-for="(item,index) in result" :key="index" @click="onplay(index)">
                    <div class="num">{{ index+1 }}</div>
                    <div class="con">
                        <div class="song-name">{{ item.name }}</div>
                        <div class="singer">{{item.ar[0].name}}</div>
                    </div>
                    <div class="dow">
                        <span class="iconfont" v-show="item.mv>0">&#xe6a8;</span>
                        <span class="iconfont">&#xe69f;</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
// import headerData  from  '../components/headerData.vue';
import {hot,getSearch,getSuggest} from '../assets/axios/hot.js'
export default {
    name:'serach',
    // components: { 
    //   headerData 
    // },
    data() {
        return {
            searchs:[],   // 热搜
            keywords:'',
            suggest:[],   // 提示
            isShow:false,
            result:[],      // 搜索结果
        }
    },
    methods: {
        // 搜索
        searchKeywords(){
            getSearch(this.keywords).then(data=>{
                // console.log('搜索=>',data.result);
                this.result = data.result.songs;
               
            });
            this.isShow = true;
            // console.log(this.suggest);
        },

        //  搜索提示点击
        getKeyword(keyword){
            this.keywords = keyword;
            this.searchKeywords();
        },
        clear(){
            this.keywords = '';
            this.isShow = false;
        },
        // 点击播放
        onplay(index){
            this.$emit('get-data', {
              allsongs:this.result,
              index
            });
        }
    },
    created() {
        hot().then(data=>{
            this.searchs = data.data;
        })
    },
    watch:{
        keywords(val){
            if(val==""){
                this.isShow = false;
            }
            getSuggest(val).then(data=>{
                if(data.result){
                    // console.log('提示=>',data.result.allMatch);
                    this.suggest = data.result.allMatch;
                    // this.isShow = false;
                }  
            })
        }
    }
}
</script>

<style lang="less" scoped>
    // 搜索框
    .searchs{
        margin:  0 auto;
        margin-top:4vw;
        background: #f2f4f5;
        border-radius: 5.333vw;
        display: flex;
        align-items: center;
        width: 75vw;
        justify-content: flex-start;
        margin-left: 6vw;
        // height: 20vw;
        position: relative;
        span.ser{
            font-size: 5.267vw;
            padding-left: 3vw;
            font-weight: bold;
            margin-right: 1vw;
            color: #a1a4b3;
        }
        span.del{
            font-size: 4vw;
            text-align: right;
            padding-left:5vw;
        }
        .text{
            padding: 3vw 2vw;
            border: none;
            outline: none;
            background: #f2f4f5;
            color: rgba(38,35,56,.5);
            font-size: 4vw;
            font-weight: 400;
        }
        .cancel{
            position: absolute;
            left: 105%;
            display: block;
            min-width: 10vw;
            font-size: 4.267vw;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color: rgba(38,35,56,.5);
        }
    }
    // 热门搜索
    .hot{
        margin:0 auto;
        margin-top:6vw;
        width: 90vw;
       
        .hot-search{
            display: flex;
            font-size: 5.333vw;
            font-weight: bold;
            font-family: PingFangSC-Medium,PingFang SC;
            color: #262338;
        }
        .list{
            list-style: none;
            margin-top:5vw;
            li{
                height: 9.333vw;
                padding: 3vw 2vw;
                box-sizing: border-box;
                font-size: 4.267vw;
                font-weight: 400;
                color: #262338;
                line-height: 9.333vw;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                align-items: center;
                margin-top: 1.867vw;
                span{
                    display: block;
                    min-width:10vw;
                    margin-right: 1vw;
                }
                p{
                    font-size: 4.5vw;
                    font-weight: 500;
                    font-family: Arial, Helvetica, sans-serif;
                }
            }
            li span{
                color: #a1a4b3;
                font-size: 4.8vw;
                font-weight: 700;
                line-height: 5.2vw;
            }
            li:nth-child(1) span{
                color: #f84824;
            }
            li:nth-child(2) span{
                color: #f47f1b;
            }
            li:nth-child(3) span{
                color: #ffb11f;
            }
        }
    }
    // 显示数据
    .showdata{
        width: 100vw;
        height: 100vh;
        position: fixed;
        background: #fff;
        bottom: 0;
        z-index: 5;
    }

    .hot .song-list {
        width: 90vw;
        margin: 0 auto;
        list-style: none;
    }
    .hot .song-list li {
        display: flex;
        align-items: center;
        min-height: 18vw;
    }
    .hot .song-list li .num {
        text-align: left;
        font-size: 4.8vw;
        font-weight: 700;
        color: #a1a4b3;
        width: 10vw;
    }
  .hot .song-list li .con {
    display: flex;
    flex-direction: column;
    width: 60vw;
  }
  .hot .song-list li .con .song-name {
    padding-left: 2vw;
    height: 6vw;
    font-size: 4.267vw;
    font-weight: 700;
    color: #262338;
    line-height: 6vw;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .hot .song-list li .con .singer {
    padding-left: 2vw;
    font-size: 3.4vw;
    display: inline-block;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #a1a4b3;
  }
  .hot  .song-list li .dow {
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .hot .song-list li .dow span {
    display: block;
    font-size: 4.6vw;
    color: #a1a4b3;
    width: 8vw;
    margin-left: 2vw;
  }
</style>