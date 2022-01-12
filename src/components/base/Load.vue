<template>
    <div id="load" v-show="load">
        <van-loading type="spinner" size="28px" class="loading" />
    </div>
</template>

<script>

import { Loading } from 'vant';

export default {
    name:'Load',
    props:['load'],
    components:{
        [Loading.name]:Loading
    },
    data() {
        return {
        }
    },
    watch:{
        load(newLoad){
            this.loading = newLoad;
        }
    }
}
</script>


<style lang="less" scoped>
    #load{
        width: 100%;
        height: 100vh;
        position: fixed;
        bottom: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>




