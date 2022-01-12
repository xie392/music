<template>
    <div class="more-rank">
        <van-loading type="spinner" color="#1989fa" class="load-spinner" v-show="load" />
        <header-data></header-data>
        <!-- 排行榜 -->
        <div class="rank-content" v-if="page==0">
            <!-- <div class="rank-item" v-for="(item,index) in playList" :key="index"></div> -->
            <router-link 
                class="rank-item" 
                v-for="(item,index) in playList" 
                :key="index"
                :to="'/SoarSong?id='+item.id"
                tag="div">
                <div class="imgs">
                    <img :src="item.coverImgUrl">
                </div>
                <div class="content">
                    <p>{{ item.name }}<span class="iconfont">&#xe8f1;</span></p>
                    <div class="txt">
                       <p v-for="(el,i) in item.tracks" :key="i" v-show="i<3">
                            {{i+1}}.{{el.name}}
                        </p>
                    </div>
                </div>
        </router-link>
        </div>
        <!-- 推荐歌单 -->
        <div class="rank-content" v-if="page==1">
            <div class="recommend">
                 <div class="recommend-song"
                    v-for="(item,index) in song" :key="index"
                    @click="recommend(index)">
                    <div class="photo">
                        <img :src="item.picUrl" alt="">
                        <span class="playerCon">
                            <van-icon name="play" class="more-play"/>
                            <span class="more-count"> {{ item.playCount | getCount }} </span>
                        </span>
                    </div>
                    <div class="p-txt">{{item.name}} </div>
                </div>
            </div> 
        </div>
        <!-- 听书电台 -->
         <div class="rank-content" v-if="page==2">
            <div class="recommend">
                 <div class="recommend-song"
                    v-for="(item,index) in radios" :key="index"
                    @click="getRadio(item)">
                    <div class="photo">
                        <img :src="item.coverUrl" alt="">
                        <span class="playerCon">
                            <van-icon name="play" class="more-play"/>
                            <span class="more-count">{{ item.listenerCount | getCount }} </span>
                        </span>
                    </div>
                    <div class="p-txt">{{item.name}}</div>
                </div>
            </div> 
        </div>
    </div>
</template>


<script>
import HeaderData from '../components/base/headerData.vue';
import {topList,sortSong} from '../api/home.js';
import {getPerson,getPersonalized} from '../api/more.js';
export default {
  components: { HeaderData },
    data() {
        return {
            load:true,      // 加载未完成显示
            playList:[],    // 所有排行榜 
            newList:[],     // 要渲染的数据排行
            num:-1,          // 每次要拿的数量
            page:-1,           // 不同page显示不同页面
            song:[],        // 每日推荐歌单
            radios:[],      // 推荐电台
        }
    },
    methods: {
        getPlaylist(){ 
            topList().then(data=>{
                let list = data.list;
                for(let i = 0;i < list.length;i++){
                    let id = list[i].id;
                    // 第二接口
                    sortSong(id).then(data=>{
                        this.playList.push({
                            id:data.playlist.id,
                            coverImgUrl:data.playlist.coverImgUrl,
                            name:data.playlist.name,
                            tracks:[
                                data.playlist.tracks[0],
                                data.playlist.tracks[1],
                                data.playlist.tracks[2]
                            ],
                        });
                    })
                }
                this.num = 0;
                this.page = this.$route.query.page;
            })
           
        },
        // 一次拿十条数据
        getData(num){
            for(let i=num;i<this.playList.length;i++){
              if(i>=(this.num+7)){
                  return;
                }
                this.newList.push(this.playList[i]);
            }
        },
        // 推荐歌单
        getsong(){
          getPerson().then(data=>{
            //   console.log(data.result);
              this.song = data.result;
              this.page = this.$route.query.page;
          })  
        },
        // 推荐歌单页面
        recommend(index){
            this.$router.push({name:'Recommend',query:{
                id:this.song[index].id,
                imgurl:this.song[index].picUrl,
                title:this.song[index].name,
                playCount:this.song[index].playCount
            }});
            
        },
        // 推荐电台
        radio(){
            getPersonalized().then(data=>{
                // console.log(data);
                this.radios = data.programs;
                this.page = this.$route.query.page;
            })
        },
        // 打开电台
        getRadio(ele){
            // console.log(ele);
            this.$router.push({ 
                name:'Radio',
                params: {
                    id:ele.id,
                    imgurl:ele.coverUrl,
                    title:ele.name,
                    blururl:ele.blurCoverUrl,
                    listenerCount:ele.listenerCount,
                    createTime:ele.createTime,
                    description:ele.reason,
                    rid:ele.radio.id
                }
            })
        },
        change(page){
            if(page==0){
                this.getPlaylist();
            }else if(page==1){
                this.getsong();
            }else{
                this.radio()
            }
        }
    },
    created() {
       this.change(this.$route.query.page);
    },
    mounted() {
      window.onscroll = ()=>{
        if(this.$route.query.page!=0){
            return;
        }
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if(scrollHeight - (scrollTop+windowHeight) <= 10 ){
              setTimeout(()=>{
                if(this.num >= this.playList.length){
                    return;
                }
                this.num += 7;
              },600)
          } 
      }
    },
    watch:{
        page(){
            this.$nextTick(()=>{
                this.load = false;
            });
        },
        // 排行榜
        num(val){
            this.getData(val);   
        },
        "$route.query"(){
            if(this.$route.query.page !=undefined){
                this.page = this.$route.query.page
                this.change(this.page);
            }
        }
    },
    filters:{
        getCount(val){
            let w = val >  100000000 ? parseFloat(val/100000000).toFixed(1)  + '亿'
                    :val > 10000 ? parseInt(val/10000)+'w':val ;
            return w;
        },
    }

}
</script>


<style lang="less">
    .more-rank{
        width: 100vw;
        height: 100vh;
        & .top-nav div.rec:after{
            content: "";
            width: 7vw;
            height: 0.5vw;
            position: absolute;
            background: #fff;
            margin: auto;
            left: 0;
            right: 0;
            top:11vw;
        }
        // 加载未完成显示
        & .load-spinner{
            width: 100vw;
            height: 85vh;
            position: fixed;
            left: 0;
            top:15vw;
            z-index: 100;
            &>span{
                position: absolute;
                width: 10vw;
                height: 10vw;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
               
            }
        }

        // 内容
        & .rank-content{
            width: 100vw;
            margin-top:17vw;
            // 排行榜
            & .rank-item{
                width: 95vw;
                margin: 2vw auto;
                max-height: 30vw;
                border-radius: 8px;
                background: #fff;
                // background: blueviolet;
                display: flex;
                & .imgs{
                    margin-top:2.2vw;
                    width: 25vw;
                    height: 25vw;
                    border-radius: 15px;
                    overflow: hidden;
                    background: #2ba5e2a6;
                    & img{
                        width: 25vw;
                    }
                }
                & .content{
                        margin-left: 5vw;
                        overflow: hidden;
                        & p{
                            margin-top:3vw;
                            font-size: 3.733vw;
                            font-family: PingFangSC-Medium,PingFang SC;
                            font-weight: 500;
                            color: #262338;
                            line-height: 5.333vw;
                            margin-bottom: 5px;
                        }
                        & .txt p{
                            padding: 0;
                            margin: 0;
                            font-size: 2.933vw;
                            font-family: PingFangSC-Regular,PingFang SC;
                            font-weight: 400;
                            color: #a1a4b3;
                            line-height: 4.2vw;
                            margin-bottom: 0.933vw;
                            width: 57.333vw;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            width: 53.333vw;
                        }
                }

            }
            & .rank-item:last-child{
                padding-bottom: 20vw !important;
            }
            // 歌单
            & .recommend{
                width: 96vw;
                margin: 0 3vw;
                // background: chartreuse;
                // height: 80vh;
                display: flex;
                flex-wrap: wrap;
                & .recommend-song{
                    width: 30vw;
                    height: 40vw;
                    border-radius: 3vw;
                    // background: slateblue;
                    margin-right: 2vw;
                    margin-top: 2vw;
                    & .photo{
                        width: 30vw;
                        height: 30vw;
                        background: skyblue;
                        border-radius: 3vw;
                        position: relative;
                        & img{
                            border-radius: 3vw;
                            width: 100%;
                        }
                        & .playerCon{
                            display: block;
                            max-width: 25vw;
                            min-width: 18vw;
                            height:7vw ;
                            background: #33333387;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            border-top-right-radius: 5vw;
                            border-bottom-left-radius: 3vw;
                            display: flex;
                            align-items: center;
                            & .more-play{
                                font-size: 4vw;
                                color: #fff;
                                border-radius: 3vw;
                                padding: 0 1vw;
                            }
                            & .more-count{
                                line-height: 8vw;
                                color: #fff;
                                font-weight: 700;
                                font-size: 3.467vw;
                            }
                        }
                    }
                    & .p-txt{
                        width: 28vw;
                        height: 10vw;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #333;
                        padding:0 1.1vw ;
                        font-size: 3.7vw;
                        line-height: 10vw;
                        font-weight: 500;
                        font-family: Arial, Helvetica, sans-serif;
                    }
                }
            }
            & .recommend{
                padding-bottom: 20vw !important;
            }
            
        }
    }
    
</style>