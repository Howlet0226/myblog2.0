<template>
  <div>
    <div class="title-box">
      <label for="title">
        请输入标题:
        <input type="text" name="title" id="title" v-model="blogTitle" />
      </label>
    </div>
    <div class="intro-box">
      <label for="intro">
        <p>简介:</p>
        <textarea name="intro" id="intro" cols="30" rows="4" v-model="blogText"></textarea>
      </label>
    </div>
    <el-upload 
      class="upload-demo"
      action="/api/uploadmd"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      accept='.md'
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能够上传md的文件</div>
    </el-upload>
    <el-button type="primary" class="blog-commit" @click="handeladd" round>上传博客</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
      return {
        fileList:[],
         blogTitle:'',
         blogText:''
      };
    },
    methods: {
      handeladd(){
        axios.post('/api/addmdblog',{
          text:this.blogText,
          title:this.blogTitle,
          content:''
        }).then(res=>{
          if(res.data.ercode == 1){
            this.$router.replace('/login')
          }else{
            this.$router.replace('/blogmanage')
          }
          console.log(res);
        }).catch(err=>{
          console.log(err)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
<style scoped lang="less">
.blog-commit{
  margin: 10px;
}
.title-box {
  font-size: 17px;
  font-weight: bolder;
  margin-left: 20px;
  #title {
    margin: 15px;
    width: 80%;
    border-radius: 5px;
    outline: none;
    padding-left: 3px;
    height: 30px;
    border: 0px solid transparent;
  }
}
.intro-box {
  font-size: 15px;
  color: #333;
  font-weight: bold;
  margin: 15px;
  p {
    margin-left: 5px;
    margin-bottom: 5px;
  }
  #intro {
    width: 100%;
    border-radius: 5px;
    outline: none;
    text-indent: 1em;
    font-size: 15px;
    padding: 3px;
    // font-weight: bold;
  }
}
.upload-demo{
  margin: 20px;
  width: 400px;
}
</style>