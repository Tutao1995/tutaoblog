<template>
  <div class="header">
    <div class="collapse-btn">
      
      <img src="~@/assets/img/blog.png" alt="Tutao | 前端笔记">
    </div>
    <div class="logo">blog后台管理系统</div>
    <div class="header-right">
      <el-dropdown :hide-on-click="false" placement="bottom" @command="handleCommand">
        <span class="el-dropdown-link">
          {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logOut">注销</el-dropdown-item>
          <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="重置密码" :visible.sync="resetPwdDialog" width="30%" top="30vh"> 
        <el-form ref='resetPwdForm' :model="resetPwdForm" label-width="80px">
            <el-form-item label="密码">
                <el-input placeholder="请输入" v-model="resetPwdForm.oldpwd" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input placeholder="请输入" v-model="resetPwdForm.newpwd" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitPwd">提交</el-button>
                <el-button @click="canclePwd">取消</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>

export default {
  name: "Header",
  data() {
    return {
        name:'',
        resetPwdDialog:false,
        resetPwdForm:{
            newpwd:'',
            oldpwd:''
        }
        

    };
  },
  methods: {
    handleCommand(command) {
      if (command == "logOut") {
        this.logOut();
      } else {
        this.resetPwd();
      }
    },
    logOut() {
        
    },
    resetPwd() {
        this.resetPwdDialog = true;
    },
    onSubmitPwd(){
        
    },
    canclePwd(){
        this.resetPwdDialog = false;
    }
  },
  created(){
    this.name = this.$store.state.name;
    console.log(this.$store.state.name);
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  background: #EDD0BE;
  color: #fff;
  box-sizing: border-box;
  height: 100px;
  position: relative;
}
.collapse-btn {
  font-size: 50px;
  position: absolute;
  top: 16%;
  left: 20px;
}
.logo {
  position: absolute;
  top: 33%;
  left: 90px;
  font-size: 24px;
}
.header-right {
  position: absolute;
  right: 50px;
  top: 40%;
}
.el-dropdown-link,
.el-dropdown-link i {
  color: #fff;
}
.el-dropdown{
  cursor:pointe;
}
</style>


