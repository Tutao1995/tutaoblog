<template>
  <div>
    <div class="header position-re">
      <div class="header-left position-ab" @click="toggleClick" :style="headerLeftStyle">
        <div class="header-left-item" :style="headerLeftItemStyle" v-for="i in 9"  :key="i" ></div>
      </div>
      <div class="header-title position-ab">
        <div>Tutao Blog | 前端笔记</div>
        <div class="description">There is no tomorrow after tomorrow</div>
      </div>
      <div class="header-li">
        <div class="header-li-item"><i class="iconfont icon-shouye1"></i>Home</div>
        <div class="header-li-item"><i class="iconfont icon-guanyuwo"></i>About</div>
        <div class="header-li-item"><i class="iconfont icon-leimupinleifenleileibie2"></i>Tags</div>
      </div>
    </div>
    <div class="aside" :style="asideStyle">
      <div class="aside-pic">
        <img src="@/assets/blog.png" alt="">
      </div>
      <div class="author-name">Tutao</div>
      <div class="aside-other">
        <div class="aside-posts">
          <ul>
            <li><span class="li-number">16</span></li>
            <li class="li-title">Posts</li>
          </ul>
        </div>
        <div class="aside-tags">
          <ul>
            <li><span class="li-number">16</span></li>
            <li class="li-title">Tags</li>
          </ul>
        </div>
        <div class="aside-time">
           <ul>
            <li><span class="li-number">16</span></li>
            <li class="li-title">Times</li>
          </ul>
        </div>
      </div>
      <div class="aside-connection">
        <a href="https://github.com/Tutao1995">
          <i class="iconfont icon-github"></i>
          <span>GitHub</span>
        </a>
        <a href="https://www.cnblogs.com/tuhazi">
          <i class="iconfont icon-duanxin"></i>
          <span>博客园</span>
        </a>
      </div>
      <div class="aside-link">
        <a href="https://www.xuanmo.xin">
          <i class="el-icon-link"></i>
          <span>轩陌</span>
        </a>
        <a href="https://ryanc.cc">
          <i class="el-icon-link"></i>
          <span>瑞安</span>
        </a>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(article,index) in articleList" :key="index">
        <div class="content-item-title">{{article.title}}</div>
        <div class="content-item-other"><i class="el-icon-date"></i><span class="content-item-other-time">{{timeFormat(article.createTime)}}</span>| <i class="el-icon-folder-opened"></i><span class="content-item-other-catogeries">{{catogeriesFormat(article.catogeries)}}</span></div>
        <div class="content-item-description">{{article.description}}</div>
        <div class="content-item-btnDiv"><el-button type="button">Read more <i class="el-icon-d-arrow-right"></i></el-button></div>
        <div class="content-item-hr">
          <hr>
        </div>
      </div>
    </div>
    <div class="footer">
      ——END——
    </div>
    <div class="cover-box center" @click="coverHandle" :style="coverStyle">
      <div class="cover-box-content center">
        <div class="cover-box-content-item center">
          <i class="iconfont icon-shouye"></i>
          <span>Home</span>
        </div>
        <div class="cover-box-content-item center">
          <i class="iconfont icon-guanyu"></i>
          <span>Me</span>
        </div>
        <div class="cover-box-content-item center">
          <i class="iconfont icon-github"></i>
          <span>Github</span>
        </div>
        <div class="cover-box-content-item center">
          <i class="iconfont icon-blog"></i>
          <span>Blog</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import service from '../js/http'
import commonFunc from '../js/common'

export default {
  name: 'home',
  data () {
    return {
      headerLeftStyle:{
        "padding": "0px"
      },
      headerLeftItemStyle:{
        "margin":"3px"
      },
      headerRightStyle:{
        "right":"0px",
        "opacity":"1"
      },
      coverStyle:{
        "transform":"translate3d(0,-100px,0)",
        "opacity":"0", 
        "z-index":"-1",
        "width":"0",
        "height":"100%"
      },
      asideStyle:{
        "position":"absolute",
         "top": "230px"
      },
     
      tags:['js','css','html'],
      articleList:[],
      loading:false,
    }
  },
  methods:{
    toggleClick(){
      
      this.headerLeftStyle.padding = "5px";
      this.headerLeftItemStyle.margin = "1px";
     
      this.coverStyle = {
         "transform":"translate3d(0,0,0)",
          "opacity":"1", 
          "z-index":"2",
          "width":"100%",
          "height":"100%"
      }
    },
    coverHandle(){
      this.headerLeftStyle.padding = "0px";
      this.headerLeftItemStyle.margin = "2px";
      this.coverStyle = {
         "transform":"translate3d(0,-100,0)",
          "opacity":"0", 
          "z-index":"-1",
          "width":"0",
           "height":"100%"
      }
    },
    getData(data){
      let _THIS = this;
      _THIS.loading = true;
      service({
          method:'Post',
          url:'/blog/index',
          data:data
      })
      .then(res => {
          _THIS.articleList = res.data.data ;
          console.log(res,"res")
          console.log(_THIS.articleList,"_THIS.articleList")
          // _THIS.totalPage = res.data.count;
          setTimeout(() => {
                _THIS.loading = false;
          }, 1000);
      })
      .catch( err => {
          _THIS.loading = false;
          this.$message.error(err)
      })
    },
    catogeriesFormat(catogeries){
        
        switch(catogeries){
            case 1:
                return "js";
                break
            case 2:
                return "css";
                break
            case 3:
                return "html"
                break
        }
    },
    timeFormat(time){
        return this.utcTimeFormat(time)
    },
    utcTimeFormat(d){
        let tProps = d.split('T'),zProps = tProps[1].split('Z');
        let time = new Date(tProps[0]+ " " + zProps[0]).getTime() + 1000*60*60*8;       
        let nowTime = new Date(time);            
        return commonFunc.timeFormat({date:nowTime,format:'-'})
    },
  },
  created(){
    this.getData({
        cur_page:1,
        pagesize:10,
        searchCondition:[]
    })
    let _THIS = this;
    window.addEventListener('scroll',function(){
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>100){//滚动条的高度，可以动态获取也可以写死
        _THIS.asideStyle = {
          "position":"fixed",
           "top": "30px"
        }
      }
      else{
        _THIS.asideStyle = {
          "position":"absolute",
           "top": "230px"
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
    }
  }
  .aside{
    // position: absolute;
    left: 50px;
    height:500px;
    width: 280px;
    background: #fff;
    box-shadow: 0 0 5px #111;
    .aside-pic{
      img{
        border-radius: 50%;
        width: 90px;
        padding:20px;
      }
      img:hover{
        transition: all 1s ease;
        transform: rotateZ(360deg);
      }
    }
    .author-name{
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 40px;
    }
    .aside-other{
      display: flex;
      justify-content: center;
      .aside-tags{
        border-left: 1px solid #9c8e8e;
        border-right: 1px solid #9c8e8e;
        margin: 0 10px;
        padding: 0 10px;
      }
      .li-title{
        font-size:14px;
        cursor:pointer;
      }
      .li-title:hover{
        color:red;
      }
      .li-number{
        font-weight:bolder
      }
    }
    .aside-connection,.aside-link{
      padding: 20px 0;
      border-top: 1px solid #ddd;
      // border-bottom: 1px solid #ddd;
      margin: 20px;
      a{
        color: #111;
        text-decoration: none;
        display:inline-block;
        margin:10px;
        i{
          font-size:20px
        }
      }
    }
  }
  .content{
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    padding: 20px;
    position:absolute;
    right:50px;
    left:360px;
    top:10px;
    // bottom:0px;
    background:#fff;
    // overflow: auto;
    box-sizing: border-box;
    box-shadow: 0 0 5px #111;
    .content-item{
      transition:all 1s ease;
      box-sizing: border-box;
      .content-item-title{
        font-size:20px;
        font-weight:400;
        margin: 10px 0 20px;
      }
      .content-item-other{
        font-size:12px;
        color:#999;
        margin: 0 0 60px;
        i{
          margin: 0 5px;
        }
        .content-item-other-time{
          display: inline-block;
          margin-right: 5px;
        }
      }
      .content-item-description{
        font-size:16px;
        box-sizing: inherit;
        border-left: 4px solid #ddd;
        text-align: left;
      }
      .content-item-btnDiv{
        margin:30px 0;
        button{
          transition:background-color 1s ease-in-out
        }
        button:hover{
          background:#111;
          color:#fff;
        }
      }
      .content-item-hr{
        display: flex;
        justify-content: center;
        hr{
          width:130px;
          color:#ddd;
        }
      }
    }
  }
  .footer{
    position: absolute;
    /* border: 0; */
    bottom: 50px;
    left: 310px;
    right:50px;
    text-align: center;
    height: 130px;
    line-height: 130px;
  }
  .cover-box{
    // width:100vw;
    // height: 100vh;
    background: #e6e3e3;
    opacity: 0;
    position: absolute;
    top:0;
    left: 0;
    transition:all 2s ease-in-out;
    .cover-box-content{
      width: 600px;
      flex-wrap: wrap;
      background: #111;
      opacity: .8;
      padding: 25px;
      height: 600px;
      overflow: hidden;
      border-radius: 10px;
      .cover-box-content-item{
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        border: 1px solid;
        margin:7px;
        font-size: 50px;
        flex-wrap: wrap;
        padding: 10px;
        color: #fff;
        border-radius: 10px;
      }
      .cover-box-content-item:hover{
        position: relative;
        
        animation: move 1s ease
      }
      i{
        font-size: 110px;
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
    position: fixed;
    width: 100%;
    z-index: 2;
    .header-li{
        display: @dn;
      }
  }
  .content{
    top:110px;
  }
  .aside{
      display:@dn;
  }
  .content{
      left:50px;
    }
}

@media only screen and (min-width: 769px) and (max-width: 1366px) {
  // 区分中屏幕的样式
  //
   .header{
      background: #fff;
      position: fixed;
      width: 100%;
      z-index: 2;
      .header-li{
        display: @dn;
      }
      .header-title{
        color:#111;
      }
    }
    .content{
      left:50px;
      top:110px;
    }
    .aside{
      display:@dn;
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

