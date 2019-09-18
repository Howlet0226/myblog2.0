<template>
  <div>
    <p class="title">
      <span class="iconfont icon-guanyu">&nbsp;</span> 关于博客
    </p>
    <p>
      <span class="iconfont icon-zuozhe1">&nbsp;</span>Howlet
    </p>
    <p>
      <span class="iconfont icon-youxiang">&nbsp;</span>825111441@qq.com
    </p>
    <p>
      <span class="iconfont icon-github">&nbsp;</span>
      <a href="https://github.com/Howlet0226">https://github.com/Howlet0226</a>
    </p>
    <p>
      <transition>
        <span @click="addlove" class="iconfont icon-xihuan" v-if="nolove">&nbsp;</span>
        <span class="iconfont icon-xihuan1" v-else>&nbsp;</span>
      </transition>
      <span class="love">{{lovenum}}</span>
    </p>
    <p>
      <span class="iconfont icon-icon">&nbsp;</span>
      {{viewnum}}
    </p>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      nolove: true,
      viewnum: 0,
      lovenum: 0
    };
  },
  methods: {
    addlove() {
      if (localStorage.nolove && localStorage.nolove == "false") {
        return;
      } else {
        axios.get("/api/count/addlove").then(res => {
          this.lovenum = res.data.result.love;
          localStorage.nolove = false;
          this.nolove = false;
        });
      }
    }
  },
  created() {
    if (localStorage.nolove == "false") {
      this.nolove = false;
    }
    axios
      .get("/api/count/add", {
        params: {
          isview: true
        }
      })
      .then(res => {
        console.log(res);
        this.viewnum = res.data.result.view;
        this.lovenum = res.data.result.love;
      });
  }
};
</script>
<style scoped lang="less">
p {
  font-size: 18px;
  margin: 10px;
  padding-left: 10px;
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.icon-xihuan1,
.icon-xihuan {
  font-size: 25px;
  cursor: pointer;
  display: inline-block;
}
.icon-xihuan:hover,
 .icon-xihuan1:hover{
  transition: transform 0.2s linear;
  transform: scale(1.3);
}
.icon-xihuan1 {
  color: red;
}
.icon-icon {
  font-size: 25px;
}
.love {
  color: red;
}
</style>