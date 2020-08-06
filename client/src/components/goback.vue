<template>
    <el-button type="button" @click="goBack" class="goback-btn">
        <i class="el-icon-d-arrow-left"></i>
        返回
    </el-button>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.goback-btn{
    transition: background-color 1s ease;
}
.goback-btn:hover{
    background: #111;
    color:#fff;
}
</style>


