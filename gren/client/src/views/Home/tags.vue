
<template>
  <div class="content">
    <el-timeline>
        <el-timeline-item class="year" :timestamp="utcTimeYear(article.createTime)" placement="top" v-for="article in articleList" :key="article._id">
            <el-card class="position-re card">
                <h4>{{article.title}}</h4>
                <div class="monthDay">{{utcTimeMonthDay(article.createTime)}}</div>
            </el-card>
        </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import service from '../../js/http'
import commonFunc from '../../js/common'
import Goback from '../../components/goback'
export default {
    data(){
        return{
            articleList:[],
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
              console.log(res,'res');
              _THIS.articleList = res.data.data;
              setTimeout(() => {
                      _THIS.loading = false;
              }, 1000);
          })
          .catch( err => {
              _THIS.loading = false;
              this.$message.error(err)
          })
        },
        
        utcTimeYear(d){
            let tProps = d.split('T'),
              zProps = tProps[1].split('Z');
            let time = new Date(tProps[0]+ " " + zProps[0]).getTime() + 1000*60*60*8;       
            let nowTime = new Date(time);
            let Y = nowTime.getFullYear();
            return Y+''
        },
        utcTimeMonthDay(d){
            let tProps = d.split('T'),
              zProps = tProps[1].split('Z');
            let time = new Date(tProps[0]+ " " + zProps[0]).getTime() + 1000*60*60*8;       
            let nowTime = new Date(time);
            let M = nowTime.getMonth() + 1;
            let D = nowTime.getDate();
            return (M>9?M:'0'+M) + '/' + (D>9?D:'0'+D)
        }
    },
    mounted(){
      this.getData({
          cur_page:1,
          pagesize:100000,
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
    .year{
        text-align: left;
        .card{
            .monthDay{
                display: inline;
                position: absolute;
                top: 20px;
                right: 30px;
            }
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
