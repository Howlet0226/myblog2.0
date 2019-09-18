<template>
  <div class="wrapper">
    <div class="title">登录</div>
    <label for="username">
      <span>用户:</span>
      <el-input id="username" placeholder="请输入管理员账号" v-model="username" clearable></el-input>
    </label>
    <label for="password">
      <span>密码:</span>
      <el-input id="password" placeholder="请输入密码" v-model="password" show-password></el-input>
    </label>
    <el-button class="login" type="primary" @click="hadellogin" round>登录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    hadellogin(){
      console.log(123);
  axios.post('/api/user/login',{
    user:this.username,
    password:this.password
  }).then(res=>{
    if(!res.data.ercode){
      this.$router.replace('/').catch(err=>{
        console.log(err);
      })
    }else{
      alert('登录信息错误')
    }
  })
    }
  },
};
</script>
<style scoped lang='less'>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  // height: 200px;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    color: gray;
  }
  .login {
    margin: 20px;
  }
}
</style>