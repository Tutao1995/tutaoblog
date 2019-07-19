
<template>
    <div class="content">
      <div class="content-item" v-for="(article,index) in articleList" :key="index">
        <div class="content-item-title">{{article.title}}</div>
        <div class="content-item-other"><i class="el-icon-date"></i><span class="content-item-other-time">{{timeFormat(article.createTime)}}</span>| <i class="el-icon-folder-opened"></i><span class="content-item-other-catogeries">{{catogeriesFormat(article.catogeries)}}</span></div>
        <div class="content-item-description">{{article.description}}</div>
        <div class="content-item-btnDiv"><el-button type="button" @click="gotoBlog(article._id)">Read more <i class="el-icon-d-arrow-right"></i></el-button></div>
        <div class="content-item-hr">
          <hr>
        </div>
      </div>
    </div>
</template>
<script>
import service from '../../js/http'
import commonFunc from '../../js/common'
export default {
    data(){
        return{
            articleList:[],
            loading:false,
        }
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
                _THIS.articleList = res.data.data ;
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
        gotoBlog(id){
            this.$router.push({ name: 'blog', params: { id: id }})
        }
        
    },
    created(){
        this.getData({
            cur_page:1,
            pagesize:10,
            searchCondition:[]
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
