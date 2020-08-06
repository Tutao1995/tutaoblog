import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router'

Vue.use(Vuex);

const state = {
    base_url:'http://127.0.0.1:8888',
    routers:[],
    token:'',
    addRouters:[],
    name:'',
    currentClass:'',
}

const getters = {
    getRouters(state){
       return state.routers;
    },
    getToken(state){
        return state.token;
    },
    getName(state){
        return state.name;
    },
    getCurrentClass(state){
        return state.currentClass
    }
}

const mutations = {
    SET_TOKEN(state,val){
        state.token = val
    },
    SET_ROUTERS(state,val){
        state.routers = val
    },
    SET_ADDROUTERS(state,val){
        state.addRouters = val
    },
    SET_NAME(state,val){
        state.name = val
    },
    SET_CURRENTCLASS(state,val){
        state.currentClass = val
    },
}

const actions = {
    set_routers(context){
        context.commit('SET_ROUTERS');
    },
    set_token(context,val){
        context.commit('SET_TOKEN',val);
    },
    set_addrouters(context,val){
        //data处理

        //更新到store
        context.commit('SET_ADDROUTERS',val);
    },

    set_currentClass(context,val){
        context.commit('SET_CURRENTCLASS',val);
    },



    set_name(context,val){
        context.commit('SET_NAME',val);
    },
    userLogin(context,info){
        let {name,password} = info;
        return new Promise((resolve,reject) => {
            axios({
                method: 'Post',
                url: 'http://127.0.0.1:8888/login',
                data:info,
                dataType: "json",
                contentType: "application/json",
            })
            .then( res => {
                if(res.data.code === 200){
                    
                    //token存   routers存
                    let token = res.data.token,roles = res.data.data.roles,name = res.data.data.name;
                    console.log(res,"res")
                    console.log(dataHandle(roles),"rrrr");
                    context.commit('SET_TOKEN',token);
                    context.commit('SET_ADDROUTERS',roles);
                    context.commit('SET_NAME',name);
                    sessionStorage.setItem('token',token);
                    sessionStorage.setItem('name',name);
                    sessionStorage.setItem('roles',JSON.stringify(roles));
                    resolve(res);
                }
                else{
                    reject(res)
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}   

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

function dataHandle(data){
    let tem = data.slice();
    let map1 = tem.map(function(cur,index,arr){
        cur.url = '/'+cur.url;
        return cur;
    })
    return map1
}


export default store