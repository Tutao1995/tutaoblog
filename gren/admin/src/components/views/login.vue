<template>
  <div class="all">
    <div class="loginbox">
      <div class="login-title">welcome</div>
      <div class="divbox">
        <i class="el-icon-user-solid"></i>
        <el-input v-model="name" placeholder="请输入账号" maxlength="16" id="nameInput" @keydown.enter.native="login"></el-input>
      </div>
      <div class="divbox">
        <i class="iconfont icon-mima"></i>
        <el-input v-model="password" placeholder="请输入密码" @keydown.enter.native="login" maxlength="16"></el-input>
      </div>
      <div class="btnbox">
        <el-button type="button" @click.native="login" v-preventReClick='3000'>登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import commonFunc from "../../js/common";
import service from '../../js/http'
export default {
  data() {
    return {
      name: "",
      password: "",
      btnDisabled: false
    };
  },
  methods: {
    async login() {
        let _this = this;
        if(this.isEmpty(this.name, "请输入账号")){
            return false
        }
        if(this.checkLength(this.name, 5, "账号长度至少为6个字符")){
            return false
        }
        if(this.isEmpty(this.password, "请输入密码")){
            return false
        }
        if(this.checkLength(this.password, 5, "密码长度至少为6个字符")){
            return false
        }
        console.log('send data');
        //发送ajax请求
        let data = {
            name:this.name,
            password:this.password,
        }
        try{
          let res = await _this.$store.dispatch('userLogin', data);
          console.log(res);
          this.$router.push('/layout')
        }
        catch(e){
          console.log(e,'e')
          _this.$message.error(JSON.stringify(e.data));
        }
    },
    isEmpty(attr, notice) {
      if (attr === "") {
        this.$message(notice);
        return true;
      }
      return false;
    },
    checkLength(attr, attrLen, notice) {
      if (attr.length < attrLen) {
        this.$message(notice);
        return true;
      }
      return false;
    }, 
  },
  mounted() {
    document.getElementById("nameInput").focus();
  },
  directives:{
      'preventReClick':{
          inserted (el, binding) {
            el.addEventListener('click', () => {
                if (!el.disabled) {
                    el.disabled = true
                    setTimeout(() => {
                    el.disabled = false
                    }, binding.value || 2000)
                }
            })
        }
      }
  }
};
</script>
<style lang="less">
@btn-color:#868282;
@btn-hover-color:#5f5f58;
.all {
  background: url("~@/assets/img/login-bg.jpg");
  width: 100vh;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginbox {
    width: 330px;
    .login-title {
      text-align: center;
      font-size: 24px;
      margin-bottom: 16px;
    };
    .divbox {
      position: relative;
      padding: 10px;
      opacity: 1;
      border: 2px solid #c5bebe;
      border-radius: 28px;
      margin: 0px 0 35px 0;
      i {
        position: absolute;
        font-size: 24px;
        top: 7px;
      };
      input {
        background: transparent;
        border: none;
        position: absolute;
        top: -24px;
        left: 20px;
        height: 38px;
        width: 240px;
        color: #fff;
        font-size: 16px;
      }
    };
    .btnbox {
      button {
        width: 330px;
        height: 45px;
        border-radius: 28px;
        background: @btn-color;
        color: #eee;
        border: none;
      };
      button:hover {
        background: @btn-hover-color;
        color: #111;
      };

      button:focus {
        background: @btn-hover-color;
        color: #111;
      }
    }
  };  
}
</style>


