
<template>
    <div class="aside" :style="asideStyle">
      <div class="aside-pic">
        <img src="@/assets/blog.png" alt="">
      </div>
      <div class="author-name">Tutao</div>
      <div class="aside-other">
        <div class="aside-posts">
          <ul>
            <li class="li-title" @click="goPosts">Posts</li>
          </ul>
        </div>
        <div class="aside-tags">
          <ul>
            <li class="li-title" @click="goTags">Tags</li>
          </ul>
        </div>
        <div class="aside-time">
           <ul>
            <li class="li-title" @click="goTimes">Times</li>
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
</template>

<script>
export default {
    data(){
        return{
            asideStyle:{
                "position":"absolute",
                "top": "230px"
            },
        }
    },
    methods:{
      goPosts(){
        this.$router.push('/home')
      },
      goTags(){
        this.$router.push('/about')
      },
      goTimes(){
        this.$router.push('/tag')
      }
    },
    created(){
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
// 整体样式 （以移动端设计稿为标准）
 
@media only screen and (min-width: 328px) and (max-width: 769px) {
  // 区分移动端pc端的样式
  .aside{
      display:@dn;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1366px) {
  // 区分中屏幕的样式
 
  
    
    .aside{
      display:@dn;
    }
}

@media only screen and (min-width: 1367px){
  // 区分大屏幕的样式
 
}
</style>
