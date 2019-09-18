<template>
  <div>
    <index-header></index-header>
    <router-view />
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "./layout/header.vue";
export default {
  components: {
    indexHeader,
    foot:()=>{
      return import('./layout/foot.vue')
    }
  }
};
</script>
<style scoped>
</style>