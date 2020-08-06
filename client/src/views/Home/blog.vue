
<template>
  <div class="content">
    <div class="content-item">
      <div class="content-item-goback">
        <goback></goback>
      </div>
      <div class="content-item-title">{{articleList.title}}</div>
      <div class="content-item-other">
        <i class="el-icon-date"></i>
        <span class="content-item-other-time">{{utcTimeFormat(articleList.createTime)}}</span>
        | 
        <i class="el-icon-folder-opened"></i>
        <span class="content-item-other-catogeries">{{catogeriesFormat(articleList.catogeries)}}</span>
      </div>
      <div class="content-item-description">
        <div class="description-title">概要</div>
        <div class="description-content">{{articleList.description}}</div>
      </div>
      <div class="content-item-content">
        <div class="content-title">
          文章详情
        </div>
        <div class="content-content">
          {{articleList.content}}
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
            articleList:{},
            loading:false,
        }
    },
    components:{
      Goback
    },
    methods: {
        getData(data){
          let _THIS = this;
          service({
              method:'Post',
              url:'/blog/index',
              data:data
          })
          .then(res => {
              _THIS.articleList = res.data.data[0] ;
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
        utcTimeFormat(d){
          let tProps = d.split('T'),
              zProps = tProps[1].split('Z');
          let time = new Date(tProps[0]+ " " + zProps[0]).getTime() + 1000*60*60*8;       
          let nowTime = new Date(time);            
          return commonFunc.timeFormat({date:nowTime,format:'-'})
        },
    },
    mounted(){
      this.getData({
          cur_page:1,
          pagesize:10,
          searchCondition:[{"_id":this.$route.params.id}]
      })
    }
}
</script>

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
        }
      }
      .content-item-goback{
        display: inline-block;
        position: absolute;
        top: 40px;
        left: 0px;
      }
    }
  }
  
// 整体样式 （以移动端设计稿为标准）
 
@media only screen and (min-width: 328px) and (max-width: 1366px) {
  // 区分移动端pc端的样式
  .content{
    top:110px;
    left:50px;
    right:50px;
  }
}
@media only screen and (min-width: 1367px){
  // 区分大屏幕的样式
}
</style>
