<template>
    <div class="content">
      <div class="content-item" v-for="(article,index) in toContent" :key="index">
        <div class="content-item-title">{{article.title}}</div>
        <div class="content-item-other"><i class="el-icon-date"></i><span class="content-item-other-time">{{timeFormat(article.createTime)}}</span>| <i class="el-icon-folder-opened"></i><span class="content-item-other-catogeries">{{catogeriesFormat(article.catogeries)}}</span></div>
        <div class="content-item-description">{{article.description}}</div>
        <div class="content-item-btnDiv"><el-button type="button">Read more <i class="el-icon-d-arrow-right"></i></el-button></div>
        <div class="content-item-hr">
          <hr>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:['toContent']
}
</script>
