<template>
  <article class="wrapper">
    <div class="blog-header">
      <div class="title"><span class="iconfont icon-biaoti">&nbsp;</span>{{blogdata.title}}</div>
      <div>
        <p><span class="iconfont icon-zuozhe">&nbsp;</span>{{blogdata.author}}</p>
        <p><span class="iconfont icon-shijian">&nbsp;</span>{{blogdata.createtime}}</p>
      </div>
    </div>
    <div class="jianjie">
      <span class="iconfont icon-jianjie">&nbsp;</span>
      {{blogdata.text}}
    </div>
    <div class="blogcontent" v-html="blogdata.content" v-highlight ></div>
  </article>
</template>
<script>
import axios from "axios";
import moment from 'moment'
export default {
  data() {
    return {
      blogdata: {}
    };
  },
  created() {
    axios
      .get("/api/blog/get", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        res.data[0].createtime = moment(res.data[0].createtime).format('YYYY-MM-DD')
        this.blogdata = res.data[0];
      },err=>{
        console.log(err);
        
      });
  }
};
</script>
<style scoped lang='less'>
.wrapper {
  width: 90%;
  background-color: #fff;
  padding: 40px;
  margin: 40px auto;
  border-radius: 20px;
  .blog-header {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #777;
    border-bottom: 1px solid gray;
    .title {
      width: 80%;
      line-height: 18px;
      word-break: break-word;
      font-size: 18px;
      color: #222;
      padding: 10px;
      font-weight: bolder;
      span{
        font-weight: 200;
        font-size: 20px;
      }
    }
    p {
      text-indent: 1em;
      padding: 3px;
      span{
        font-size: 20px;
      }
    }
  }
  .blogcontent {
    margin-top: 20px;
    text-indent: 2em;
  }
  .jianjie {
    font-size: 17px;
    color: #555;
    margin: 20px 0px;
    padding: 10px;
    word-break: break-word;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid gray;
    span {
      font-weight: 200;
      font-size: 20px;
    }
  }
}
</style>