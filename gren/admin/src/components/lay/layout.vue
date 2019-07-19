<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar class="sidebar"></v-sidebar>
        <div class="content-box">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive >
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from '@/components/lay/Header.vue'
import vSidebar from '@/components/lay/Navbar.vue'
export default {
    name:'layout',
    data(){
        return{
            
        }
    },
    methods:{
        footerShowHide(){

        }
    },
    components:{
        vHead,
        vSidebar,
    },
    created(){
        let token = sessionStorage.getItem('token'),
            name = sessionStorage.getItem('name'),
            roles = sessionStorage.getItem('roles');
        if(token && roles){
            this.$store.dispatch('set_token',token);
            this.$store.dispatch('set_name',name);
            this.$store.dispatch('set_addrouters',JSON.parse(roles));
        }
    }
}
</script>
<style>
*{
    padding:0;
    margin:0;
}
.wrapper{
    width:100%;
    height: 100%;
}
.content-box{
    width:calc(100% - 163px);
    position: relative;
    left: 162px;
    overflow: hidden;
}
@media (max-width:768px) { 
    .sidebar{
        left:-165px;
    }
    .content-box{
        left: 0px;
        width:100%;
    }
    #footer{
        width: 267px;
        left: 50px;
        /* display:none; */
    }
    .search{
        top:10px;
    }
 }
@media (min-width:768px ) and (max-width:992px ) { }
@media (min-width: 992px) and (max-width: 1200px) { }
</style>


