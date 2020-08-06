<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tutao
 * @Date: 2019-07-19 09:45:35
 * @LastEditDate: Do not edit
 -->
<template>
    <div class="header position-re" v-show="headShow">
      <div class="header-left position-ab" @click="toggleClick" :style="headerLeftStyle">
        <div class="header-left-item" :style="headerLeftItemStyle" v-for="i in 9"  :key="i" ></div>
      </div>
      <div class="small-routers" v-show="liFlag">
        <ul>
          <li @click="smallLi('home')"><i class="iconfont icon-shouye1"></i>Home</li>
          <li @click="smallLi('about')"><i class="iconfont icon-guanyuwo"></i>About</li>
          <li @click="smallLi('tags')"><i class="iconfont icon-leimupinleifenleileibie2"></i>Tags</li>
        </ul>
      </div>
      <div class="header-title position-ab">
        <div>Tutao Blog | 前端笔记</div>
        <div class="description">There is no tomorrow after tomorrow</div>
      </div>
      <div class="header-li">
        <router-link to="/blog/home">
            <div :class="home" class="header-li-item" @click="currentLi('home')"><i class="iconfont icon-shouye1"></i>Home</div>
        </router-link>
        <router-link to="/blog/about">
            <div :class="about" class="header-li-item" @click="currentLi('about')"><i class="iconfont icon-guanyuwo"></i>About</div>
        </router-link>
        <router-link to="/blog/tags">
            <div :class="tags" class="header-li-item" @click="currentLi('tags')"><i class="iconfont icon-leimupinleifenleileibie2"></i>Tags</div>
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
            home:{
              "activeLi":false,
            },
            about:{
              "activeLi":false,
            },
            tags:{
              "activeLi":false,
            },
            currentLiItem:'home',
            liFlag:false,    
        }
    },
    props:{
      headShow:Boolean,
      activeIndex:String
    },
    watch:{
      activeIndex(){
        this.currentLi(this.activeIndex)
      }
    },
    methods:{
        toggleClick(){
            this.headerLeftStyle.padding = "5px";
            this.headerLeftItemStyle.margin = "1px";
            this.liFlag = true;
        },
        coverHandle(){
            this.headerLeftStyle.padding = "0px";
            this.headerLeftItemStyle.margin = "2px";
        },
        smallLi(str){
          this.currentLi(str);
          this.liFlag = false;
          this.headerLeftStyle.padding = "0px";
          this.headerLeftItemStyle.margin = "3px";
          this.$router.push('/blog/'+str)
        },
        currentLi(str){
          this.currentLiItem = str;
          sessionStorage.setItem("currentClass",str);
          store.dispatch('set_currentClass',str);  
          let _THIS = this;
          switch(str){
            case 'home':
              _THIS.home.activeLi = true;
              _THIS.about.activeLi = false;
              _THIS.tags.activeLi = false;
            break;
            case 'about':
              _THIS.home.activeLi = false;
              _THIS.about.activeLi = true;
              _THIS.tags.activeLi = false;
            break;
            case 'tags':
              _THIS.home.activeLi = false;
              _THIS.about.activeLi = false;
              _THIS.tags.activeLi = true;
            break;
          }
        }
    },
    mounted(){
      let curC = sessionStorage.getItem("currentClass");
      if(curC){
        this[curC].activeLi = true;
      }
    },
    
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
    transition:all 1s ease;
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
    .small-routers{
      position: fixed;
      top: 84px;
      left:0;
      width: 100%;
      background: rgba(0,0,0,.5);
      li{
        padding: 16px;
        color: #fff;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        transition:all 1000 ease;
        i{
          margin: 0 10px;
          font-size: 20px;
        }
      }
      li:hover{
        background: #333;
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
      .small-routers{
        display: block;
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
   .small-routers{
     display: none;
   }
}
</style>

