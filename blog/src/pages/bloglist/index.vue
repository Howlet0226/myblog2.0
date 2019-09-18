<template>
  <div class="wrapper">
    <div class="blogbox">
      <ul class="blog-list">
        <transition-group name="blog">
          <li class="blog-item" v-for="item in bloglist" :key="item._id">
            <div class="inf-box">
              <div class="title" @click="handelclick(item._id)">
                <span class="iconfont icon-biaoti">&nbsp;</span>
                {{item.title}}
              </div>
              <div class="author-box">
                <p>
                  <span class="iconfont icon-zuozhe">&nbsp;</span>
                  {{item.author}}
                </p>
                <p>
                  <span class="iconfont icon-shijian">&nbsp;</span>
                  {{item.createtime}}
                </p>
              </div>
            </div>
            <div class="overview">
              <span class="iconfont icon-jianjie">&nbsp;</span>
              {{item.text}}
            </div>
          </li>
        </transition-group>
      </ul>
      <div class="loading" v-if="!load">
        <span class="iconfont icon-loading"></span>
      </div>
    </div>
    <div class="about">
      <about-blog/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import aboutBlog from "./components/about.vue";
export default {
  data() {
    return {
      bloglist: [],
      load: false
    };
  },
  components: {
    aboutBlog
  },
  methods: {
    handelclick(id) {
      this.$router.push({
        name: "blogContent",
        params: {
          id
        }
      });
    }
  },
  created() {
    axios.get("/api/blog/get").then(res => {
      // console.log(res);
      res.data.forEach(item => {
        item.createtime = moment(item.createtime).format("YYYY-MM-DD");
      });
      this.bloglist = res.data;
      this.load = true;
    },err=>{
      console.log(err);
    });
  }
};
</script>
<style scoped lang="less">
@import url("../../static/style/less/ell.less");
.blog-enter,
.blog-leave-to {
  opacity: 0;
}
.blog-enter-active,
.blog-leave-active {
  transition: all 0.5s linear;
}
.loading {
  text-align: center;
}
.loading span {
  display: inline-block;
  animation: loading 1s linear infinite;
  -webkit-animation: loading 1s linear infinite;
  font-size: 40px;
}
@keyframes loading {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@-webkit-keyframes loading {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  .blogbox {
    width: 70%;
    box-sizing: border-box;
    // border: 1px solid gray;
    border-radius: 20px;
    margin: 40px 0px;
    background-color: #fff;

    .blog-list {
      padding: 20px;
      .blog-item:hover {
        transition: all 0.2s linear;
        transform: translateY(-3px);
        box-shadow: 3px 3px 5px gray;
        border: 2px solid gray;
      }
      .blog-item {
        box-sizing: border-box;
        height: 157px;
        flex-direction: column;
        display: flex;
        align-items: center;
        padding: 10px;
        margin-top: 10px;
        border: 0px solid gray;
        border-radius: 10px;
        .inf-box {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .title {
            line-height: 18px;
            max-width: 50%;
            font-size: 18px;
            color: #555;
            padding: 10px;
            font-weight: bolder;
            cursor: pointer;
            .ell;
            span {
              font-size: 20px;
              font-weight: 200;
            }
          }
          .title:hover {
            transition: all 0.2s linear;
            color: lightgreen;
          }
          .author-box {
            font-size: 13px;
            color: #777;
            font-weight: bolder;
            padding: 10px;
            margin-right: 20px;
            line-height: 12px;
            p {
              padding: 3px;
            }
          }
        }
        .overview {
          padding-top: 20px;
          position: relative;
          border-top: 1px solid gray;
          height: 60px;
          overflow: hidden;
          width: 100%;
          word-break: break-word;
          font-size: 18px;
          color: #777;
          // margin-top: 20px;
          text-indent: 2em;
        }
        .overview::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 60px;
          background: -webkit-linear-gradient(
            top,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1)
          );
          bottom: 0px;
          left: 0px;
        }
      }
    }
  }
  .about {
    width: 25%;
    margin: 40px 20px;
    box-sizing: border-box;
    height: 100%;
    // border: 1px solid gray;
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>
