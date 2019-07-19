<template>
    <div class="header position-re">
      <div class="header-left position-ab" @click="toggleClick" :style="headerLeftStyle">
        <div class="header-left-item" :style="headerLeftItemStyle" v-for="i in 9"  :key="i" ></div>
      </div>
      <div class="header-title position-ab">
        <div>Tutao Blog | 前端笔记</div>
        <div class="description">There is no tomorrow after tomorrow</div>
      </div>
      <div class="header-li">
        <router-link to="/blog/home">
            <div :class="homeClass" class="header-li-item" @click="currentLi('homeClass')"><i class="iconfont icon-shouye1"></i>Home</div>
        </router-link>
        <router-link to="/blog/about">
            <div :class="aboutClass" class="header-li-item" @click="currentLi('aboutClass')"><i class="iconfont icon-guanyuwo"></i>About</div>
        </router-link>
        <router-link to="/blog/tags">
            <div :class="tagsClass" class="header-li-item" @click="currentLi('tagsClass')"><i class="iconfont icon-leimupinleifenleileibie2"></i>Tags</div>
        </router-link>
      </div>
    </div>
</template>
<script>
import store from '../../store/index'
export default {
    data(){
        return {
            headerLeftStyle:{
                "padding": "0px"
            },
            headerLeftItemStyle:{
                "margin":"3px"
            },
            homeClass:{
              "activeLi":false,
            },
            aboutClass:{
              "activeLi":false,
            },
            tagsClass:{
              "activeLi":false,
            },
            currentLiItem:'homeClass',
        }
    },
    props:[],
    methods:{
        toggleClick(){
            this.headerLeftStyle.padding = "5px";
            this.headerLeftItemStyle.margin = "1px";
            
            //   this.coverStyle = {
            //      "transform":"translate3d(0,0,0)",
            //       "opacity":"1", 
            //       "z-index":"2",
            //       "width":"100%",
            //       "height":"100%"
            //   }
        },
        coverHandle(){
            this.headerLeftStyle.padding = "0px";
            this.headerLeftItemStyle.margin = "2px";
            //   this.coverStyle = {
            //      "transform":"translate3d(0,-100,0)",
            //       "opacity":"0", 
            //       "z-index":"-1",
            //       "width":"0",
            //        "height":"100%"
            //   }
        },
        currentLi(str){
          console.log(this.$store,"this.$store")
          this.currentLiItem = str;
          sessionStorage.setItem("currentClass",str);
          store.dispatch('set_currentClass',str);  
          let _THIS = this;
          switch(str){
            case 'homeClass':
              _THIS.homeClass.activeLi = true;
              _THIS.aboutClass.activeLi = false;
              _THIS.tagsClass.activeLi = false;
            break;
            case 'aboutClass':
              _THIS.homeClass.activeLi = false;
              _THIS.aboutClass.activeLi = true;
              _THIS.tagsClass.activeLi = false;
            break;
            case 'tagsClass':
              _THIS.homeClass.activeLi = false;
              _THIS.aboutClass.activeLi = false;
              _THIS.tagsClass.activeLi = true;
            break;
          }
        }
    },
    mounted(){
      let curC = sessionStorage.getItem("currentClass");
      this[curC].activeLi = true;
    }
}
</script>
<style lang="less">
    @dn:none;
    @allEase:all .8s ease-in-out;
  ul,li{
    list-style: none;
  }
  .center{
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .position-ab{
    position:absolute;
  }
  .position-re{
    position: relative;
  }
  .header{
    height: 4rem;
    background: #111;
    padding:10px;
    
    box-shadow: 0 0 5px #111;
    .header-left{
      display: flex;
      width: 35px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      box-sizing: border-box;
      transition: @allEase;
      cursor: pointer;
      top: 50%;
      transform: translate(0,-50%);
      left: 10px;
      .header-left-item{
        width:5px;
        height: 5px;
        background: red;
        transition: @allEase
      }
    }
    .header-title{
      left: 50%;
      // transform: translateX(-50%);
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color:#fff;
      .description{
        font-size: 13px;
        margin-top: 6px;
        border-top: 1px solid #c7c1c1;
        padding: 3px;
      }
    }
    .header-right{
      padding: 10px;
      font-size: 30px;
      top: 50%;
      transform: translate(0,-50%);
      transition: @allEase;
      cursor: pointer;
    }
    .header-li{
      position: absolute;
      top: 85px;
      padding: 20px 0;
      width: 280px;
      box-sizing: border-box;
      text-align: left;
      background: #fff;
      left: 0;
      box-shadow: 0 0 5px #111;
      .header-li-item{
        transition:background-color 1s ease;
        cursor: pointer;
        padding: 5px 10px;
        i{
          margin-right:6px;
        }
      }
      .header-li-item:hover{
        background:#ddd; 
      }
      .activeLi{
        background:#ddd;
        color: #111;
        font-weight: bold;
        box-shadow: 0 0 5px #111;
      }
    }
  }
  @keyframes move {
    0% {
      
      transform:rotate(45deg);
      
    }
    20%{
      
      transform:rotate(-40deg);
      
    }
    30%{
      
      transform:rotate(35deg);
      
    }
     40%{
      
      transform:rotate(-30deg);
      
    }
     50%{
       
      transform:rotate(25deg);
      
    }
     60%{
       
      transform:rotate(-20deg);
      
    }
    70%{
       
      transform:rotate(15deg);
      
    }
    80%{
       
      transform:rotate(-10deg);
      
    }
    90%{
       
      transform:rotate(5deg);
      
    }
    100%{
      
      transform:rotate(0deg);
      
    }
    
  } 
// 整体样式 （以移动端设计稿为标准）
@media only screen and (min-width: 328px) and (max-width: 769px) {
  // 区分移动端pc端的样式
    .header{
    position: fixed !important;
    width: 100%;
    z-index: 2;
    .header-li{
        display: @dn;
        }
    }
}
@media only screen and (min-width: 769px) and (max-width: 1366px) {
   .header{
      background: #fff;
      position: fixed !important;
      width: 100%;
      z-index: 2;
      .header-li{
        display: @dn;
      }
      .header-title{
        color:#111;
      }
    }
}

@media only screen and (min-width: 1367px){
  // 区分大屏幕的样式
  .header{
    left: 50px;
    top: 10px;
    bottom: 50px;
    width: 260px;
    .header-left{
      display:@dn;
    }
    .header-title{
        width: 100%;
        left: 140px;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        font-size: 20px;
      }
   }
}
</style>

