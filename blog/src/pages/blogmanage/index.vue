<template>
  <div class="box">
    <div class="btn-add" @click="handeladd">添加</div>
    <div class="wrapper">
      <ul class="bloglist">
        <transition-group name="blog">
          <li v-for="(item,index) in blogs" :key="item._id" class="blog-item">
            <div class="inf-box">
              <div class="title">
                <span class="iconfont icon-biaoti">&nbsp;</span>
                {{item.title}}
              </div>
              <p>
                <span class="iconfont icon-zuozhe">&nbsp;</span>
                {{item.author}}
              </p>
              <p>
                <span class="iconfont icon-shijian">&nbsp;</span>
                {{item.createtime}}
              </p>
            </div>
            <div class="btn-box">
              <div class="update-btn" @click="handelupdate(item._id)">修改</div>
              <div class="del-btn" @click="handeldel(item._id,index)">删除</div>
            </div>
          </li>
        </transition-group>
      </ul>
      <div class="loading" v-if="load">
        <span class="iconfont icon-loading"></span>
      </div>
    </div>
    <transition>
      <div class="hidden" v-if="tips">
        <div class="tips">
          <p>真的要删除吗？</p>
          <div class="btn-box">
            <div class="yes" @click="handelyes">确定</div>
            <div class="no" @click="handelno">取消</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      blogs: [],
      tips: false,
      delindex: undefined,
      load: true
    };
  },
  created() {
    axios
      .get("/api/blog/get", {
        params: {
          manage: true
        }
      })
      .then(res => {
        if (res.data.ercode) {
          this.$router.replace('/login')
        } else {
          res.data.forEach(item => {
            item.createtime = moment(item.createtime).format("YYYY-MM-DD");
          });
          this.blogs = res.data;
          this.load = false;
        }
      },err=>{
        console.log(err);
      });
  },
  methods: {
    handeldel(id, index) {
      this.tips = id;
      this.delindex = index;
    },
    handelyes() {
      axios
        .get("/api/blog/del", {
          params: {
            id: this.tips
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.errcode == 0) {
            this.blogs.splice(this.delindex, 1);
            this.tips = false;
            this.delindex = undefined;
          }else{
                this.$router.replace("/login");

          }
        });
    },
    handelno() {
      this.tips = false;
    },
    handeladd() {
      this.$store.commit("updated", "");
      this.$router.push("/addblog");
    },
    handelupdate(id) {
      this.$store.commit("updated", id);
      this.$router.push("/addblog");
    }
  }
};
</script>
<style scoped lang='less'>
@import url("../../static/style/less/ell.less");
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s linear;
}
.blog-enter,
.blog-leave-to {
  transform: scale(0);
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
.box {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 80%;
  .btn-add {
    margin-top: 40px;
    margin-left: 140px;
    align-items: center;
    line-height: 30px;
    font-size: 16px;
    font-weight: bolder;
    text-align: center;
    color: #fff;
    width: 70px;
    background-color: lightgreen;
    height: 30px;
    border-radius: 5px;
    // margin-top: 10px;
    cursor: pointer;
  }
  .hidden {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 1180px;
    background-color: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    .tips {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 200px;
      height: 80px;
      flex-direction: column;
      background-color: #fff;
      border-radius: 10px;
      // margin-top: 200px;
      text-align: center;
      font-size: 17px;
      font-weight: bolder;
      color: red;
      padding: 10px;
      .btn-box {
        display: flex;
        justify-content: space-around;
        color: #fff;
        font-size: 15px;
        font-weight: bolder;
        margin-top: 20px;
        line-height: 30px;
        .yes,
        .no {
          background-color: blue;
          width: 60px;
          height: 30px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .wrapper {
    margin: 40px auto;
    width: 90%;
    padding: 40px;
    background-color: #fff;
    border-radius: 20px;
    .blog-item:hover {
      transition: border 0.3s linear, transform 0.3s linear,
        boxShadow 0.3s linear;
      transform: translateY(-3px);
      box-shadow: 2px 2px 5px gray;
      border: 1px solid greenyellow;
    }
    .blog-item {
      box-sizing: border-box;
      height: 130px;
      margin-top: 20px;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      .inf-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        // align-items: center;
        width: 70%;
        font-size: 15px;
        color: #777;
        .title {
          font-size: 17px;
          color: #000;
          .ell;
        }
      }
      .btn-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 30px;
        font-size: 16px;
        font-weight: bolder;
        text-align: center;
        color: #fff;
        .update-btn {
          width: 60px;
          background-color: lightblue;
          height: 30px;
          border-radius: 5px;
          // margin-top: 10px;
          cursor: pointer;
        }
        .del-btn {
          width: 60px;
          height: 30px;
          background-color: red;
          border-radius: 5px;
          margin-top: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>