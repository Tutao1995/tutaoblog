
<template>
  <div class="content">
      <div class="content-item-goback">
        <goback></goback>
      </div>
    <div class="content-item">
      
      <div class="content-item-title">About Blog</div>
      <div class="content-item-content">
        <div class="content-title">
          Tutao Blog | 前端笔记
        </div>
        <div class="content-time">
          2019-07-18  到   {{nowTime}}
        </div>
        <div class="content-content">
            <p>关于博客</p>
            <ol>
                <li>1.技术栈：koa2 + vue + mongoose</li>
                <li>2.<a href="https://github.com/Tutao1995/blog" target="_blank">GitHub地址</a></li>
                <li>3.博客主要页面：
                    <ul class="erjiLi">
                        <li>a.个人价绍</li>
                        <li>b.文章详情 </li>
                        <li>c.时间线</li>
                    </ul>
                </li>
                <li>4.目的：
                     <ul class="erjiLi">
                        <li>a.利用自己所学开发自己想要的东西</li>
                        <li>b.为了找工作用来练手 </li>
                        <li>c.记录自己平时所学以及所看到的</li>
                    </ul>
                </li>
                <li>5.感谢：
                    <a href="https://www.xuanmo.xin">
                         <i class="el-icon-link"></i>
                        <span>轩陌</span>
                    </a>
                    <a href="https://ryanc.cc">
                        <i class="el-icon-link"></i>
                        <span>瑞安</span>
                    </a>
                </li>
            </ol>
        </div>
      </div>
    </div>

    <div class="content-item">
      
      <div class="content-item-title">About Tutao</div>
      <div class="content-item-content">
        <div class="content-title">
          Tutao Introduction
        </div>
        <div class="content-time">
          1995-08-14  到   {{nowTime}}
        </div>
        <div class="content-content">
            <p>一个莫名的前端程序员</p>
            <p>毕业于四川农业大学（gs一样的211），物联网工程</p>
            <p>大学一无所成，两证书：国家计算机二级，大学生英语四级</p>
            <p>个人技能：
                <ol>
                    <li>1.前端必备：Html，Css，Javascript</li>
                    <li>2.前端框架：Layui，Bootstrap，Jquery，Vue</li>
                    <li>3.后端技能：Node，Mongodb</li>
                    <li>4.后端框架：Koa2，Mongoose</li>
                    <li>5.版本控制工具：SVN，Git</li>
                    <li>6.开发工具：VSCode，Webstorm</li>
                </ol>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '../../js/http'
import commonFunc from '../../js/common'
import Goback from '../../components/goback'
export default {
    data(){
        return{
            nowTime:''
        }
    },
    components:{
      Goback
    },
    methods: {
        timeFormat(){
            let date = new Date(),
                Y = date.getFullYear(),
                M = date.getMonth() + 1,
                D = date.getDate();
            return Y + '-' + (M>9?M:'0' + M) + '-' + (D>9?D:'0' + D)
      }
    },
    mounted(){
       this.nowTime = this.timeFormat()
    }
}
</script>

<style lang="less" scoped>
@dn:none;
@allEase:all .8s ease-in-out;
//   ul,li{
//     list-style: none;
//   }
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
  .content{
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    padding: 20px;
    position:absolute;
    right:200px;
    left:360px;
    top:10px;
    // bottom:0px;
    background:#fff;
    // overflow: auto;
    box-sizing: border-box;
    box-shadow: 0 0 5px #111;
    .content-item-goback{
        display: inline-block;
        position: absolute;
        top: 25px;
        left: 0px;
      }
    .content-item{
      transition:all 1s ease;
      box-sizing: border-box;
      margin-top: 60px;
      .content-item-title{
        font-size:20px;
        font-weight:400;
        margin: 10px 0 20px;
      }
      .content-item-description{
        font-size:16px;
        box-sizing: inherit;
        // border-left: 4px solid #ddd;
        text-align: left;
        .description-title{
          background: #ddd;
          padding: 10px;
          border-left: 4px solid;
          margin-bottom: 1rem;
        }
        .description-content{
          padding: 10px;
          text-indent:2rem;
          margin-bottom: 1rem;
        }
      }
      .content-item-content{
        font-size:16px;
        box-sizing: inherit;
        text-align: left;
        .content-title{
          background: #ddd;
          padding: 10px;
          border-left: 4px solid;
          margin-bottom: 1rem;
        }
        .content-content{
          padding: 10px;
          text-indent:2rem;
          margin-bottom: 1rem;
          li{
              text-indent:3rem;
              padding: 5px 0;
          }
          p{
              padding: 5px 0;
          }
          .erjiLi{
              li{
                  padding-left: 20px;
              }
          }
        }
      }
      .content-time{
          padding: 10px;
          text-indent:2rem;
      }
      
    }
  }
  
// 整体样式 （以移动端设计稿为标准）
 
@media only screen and (min-width: 328px) and (max-width: 1366px) {
  // 区分移动端pc端的样式
  .content{
    top:110px;
    right:50px;
    left:50px;
  }
}

@media only screen and (min-width: 1367px){
  // 区分大屏幕的样式
}
</style>
