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
    <div id="wangeditor">
      <div ref="editorElem" style="text-align:left;"></div>
    </div>
    <div class="tijiao-box">
      <div class="sum-btn" @click="handelsummit">提交</div>
      <div class="uploadmd" v-if="isupload" @click="handelupmd" >上传md</div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import axios from "axios";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: "",
      blogTitle: "",
      blogText: "",
      isupload: true
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    this.editor.customConfig.uploadImgServer = "/api/upload";
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.uploadFileName = "photo";
    this.editor.create(); // 创建富文本实例
    if (this.$store.state.upid) {
      this.isupload = false;
      axios
        .get("/api/blog/get", {
          params: {
            id: this.$store.state.upid
          }
        })
        .then(
          res => {
            this.editor.txt.html(res.data[0].content);
            this.blogTitle = res.data[0].title;
            this.blogText = res.data[0].text;
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  methods: {
    handelupmd(){
      this.$router.push('/uploadmd')
    },
    handelsummit() {
      if (this.$store.state.upid) {
        axios
          .post("api/blog/fix", {
            id: this.$store.state.upid,
            title: this.blogTitle,
            text: this.blogText,
            content: this.editorContent
          })
          .then(
            res => {
              if (res.data.errcode == 0) {
                this.$store.commit("updated", "");
                this.$router.replace("/blogmanage");
              } else {
                this.$store.commit("updated", "");
                this.$router.replace("/login");
              }
            },
            err => {
              console.log(err);
            }
          );
      } else {
        axios
          .post("/api/blog/add", {
            title: this.blogTitle,
            text: this.blogText,
            content: this.editorContent
          })
          .then(
            res => {
              if (res.data.errcode == 0) {
                this.$router.replace("/blogmanage");
              } else {
                this.$router.replace("/login");
              }
            },
            err => {
              console.log(err);
            }
          );
      }
    }
  }
};
</script>
<style scoped lang="less">
#wangeditor {
  margin-top: 40px;
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
.tijiao-box {
  display: flex;
  justify-content: space-between;
  .sum-btn,
  .uploadmd {
    background-color: blue;
    width: 80px;
    height: 50px;
    border-radius: 5px;
    line-height: 50px;
    text-align: center;
    font-weight: bolder;
    color: #fff;
    margin: 40px 100px;
    cursor: pointer;
  }
}
</style> 
  
</style>