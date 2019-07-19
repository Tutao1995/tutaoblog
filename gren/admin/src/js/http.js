import axios from 'axios'
import store from '../store';
import * as Cache from '../js/cache'
import {Message} from 'element-ui'
import router from '../router'

const BASE_URL = 'http://localhost:8888'
var service = axios.create({
    baseURL:BASE_URL,
    timeout:5000
})

service.interceptors.request.use(function(config){
    if(config.url.indexOf('/login') === -1){
        config.headers["TOKEN"] = store.state.token;
    }
    return config
},function(err){
    return Promise.reject(err)
})

service.interceptors.response.use(function(response){
    console.log(response,"resp")
    let code = response.data.code;
    if(code !== 200){   
        if(code === 501){
            Message({
                message:'登录信息失效',
                type:'error',
                duration:5*1000 
            });
            Cache.clearAllCookie();
            router.replace('/login');
            Promise.reject();
        }
        else{
            Message({
                message:response.data.msg,
                type:'error',
                duration:5*1000 
            });
            return Promise.reject();
        }   
    }
    else{
        return response
    }   
    
},function(err){
    return Promise.reject(err)
})


export default service