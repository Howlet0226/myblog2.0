<template>
  <div class="header">
    <div class="logo" @click="tohome">Howlet的博客</div>
    <div class="manage" @click='tomanage'>博客管理</div>
  </div>
</template>

<script>
export default {
  methods:{
    tomanage(){
      this.$router.replace('/blogmanage').catch(err => { console.log(err) })
    },
    tohome(){
      this.$router.replace('/').catch(err => { console.log(err) })
    }
  }
};
</script>
<style scoped lang="less">
.header {
  height: 40px;
  background-color: #fff;
  box-shadow: 0px 2px 5px gray;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  font-size: 20px;
  font-weight: bolder;
  color: #aaa;
  min-width: 900px;
  .logo {
    margin-left: 200px;
  }
  .manage {
    margin-right: 200px;
  }
  .logo,
  .manage {
    cursor: pointer;
    // box-shadow: 0px 0px 2px black;
    transition: all 0.1s linear;
  }
  .logo:hover,
  .manage:hover {
    transform: scale(1.1)
  }
}
</style>