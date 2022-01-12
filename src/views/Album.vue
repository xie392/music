<template>
    <div>  
        <headers></headers>
        <div class="album">
            <div class="album-item" v-for="(item,index) in albums" :key="index" @click="togo(item.id)">
                <div class="ablum-img">
                    <img :src="item.picUrl">
                </div>
                <div class="ablum-con">
                    <div class="ablum-title">
                        {{ item.name }}
                    </div>
                    <div class="ablum-singer">
                        <span class="singer">{{ item.company }}</span>
                        <!-- <span class="time">时间</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getAlbum} from '../assets/axios/album.js';
import Headers from '../components/base/Headers.vue';
export default {
    components: { Headers },
    data() {
        return {
            albums:[],      // 专辑
        }
    },
    async created() {
        await getAlbum().then(data=>{
            this.albums = data.albums;
        })
    },
    methods: {
        togo(id){
            // console.log(id);
            this.$router.push({
                name:'AlbumDeatil',
                query:{
                    id
                }
            })
        }
    },

}
</script>

<style lang="less">
    .album{
        width: 95vw;
        margin:0vw auto;
        .album-item{
            width: 95vw;
            height: 15vw;
            border-radius: 3vw;
            display: flex;
            // background: #f5f5f5;
            margin-top: 5vw;
            .ablum-img{
                width: 15vw;
                height: 15vw;  
                border-radius: 3vw;
                overflow: hidden;
                background:#cccccc70 url(../assets/music.png) center center no-repeat;
                & .img{
                    width: 100%;
                    border-radius: 3vw;
                }
            }
            .ablum-con{
                width: 78vw;
                height: 15vw;
                display: flex;
                flex-direction: column;
                .ablum-title{
                    width: 100%;
                    height: 7.5vw;
                    font-weight: 600;
                    color: #333333d9;
                    line-height: 7.5vw;
                    font-size: 4vw;
                    padding-left: 3vw;
                }
                 .ablum-singer{
                    width: 80vw;
                    height: 7.5vw;
                    font-size: 3.4vw;
                    &>span.singer{
                        display:inline-block;
                        width: 70vw;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: 7.5vw;
                        padding: 0 3vw;
                        color: #959090ba;
                    }
                 }
            }
        }
    }
</style>


