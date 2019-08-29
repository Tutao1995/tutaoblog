<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tutao
 * @Date: 2019-07-19 09:45:35
 * @LastEditDate: Do not edit
 -->
<template>
  <div>
    <Head 
      :headShow="scroll" 
      :activeIndex="activeIndex"  
    ></Head>
    <Aside 
      @handleScroll="handleScroll"
      @routerChange="routerChange"
    ></Aside>
    
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <GoTop class="goTop" @click.native="goToTop" :style="goTopStyle"></GoTop>
  </div>
</template>
<script>
import service from '../../js/http'
import commonFunc from '../../js/common'
import Head from './head'
import Content from './blog'
import Aside from './aside'
import GoTop from '../../components/gotop'
export default {
  name: 'home',
  data () {
    return {
     goTopStyle:{
       "right":"-100px"
     },
     scrollTop:0,
     scroll:true,
     activeIndex:'home'
    }
  },
  components:{
    Head,
    Aside,
    Content,
    GoTop
  },
  methods:{
    goToTop(){
      let that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    } ,
    handleScroll(val){
      this.scroll = val;
    },
    routerChange(val){
      this.activeIndex = val
    }
  },
  mounted(){
    let _THIS = this;
    window.addEventListener('scroll',function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        _THIS.scrollTop = scrollTop;
        if(scrollTop>100){//滚动条的高度，可以动态获取也可以写死
            _THIS.goTopStyle = {
             "right":"10px"
            }
        }
        else{
             _THIS.goTopStyle = {
             "right":"-100px"
            }
        }
    })
  }
}
</script>
<style lang="less" scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .goTop{
    position: fixed;
    bottom: 50px;
    transition: all 1s ease;
    cursor:pointer;
  }
</style>

