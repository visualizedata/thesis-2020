<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color = "#333333" text-color = "#fff" active-text-color = "#ff6767">
            <el-menu-item index="1"><NuxtLink to="/" style= "font-family: Lato; text-decoration: none;">HOME</NuxtLink></el-menu-item>
            <el-menu-item index="2"><NuxtLink to="chronologyPage" style= "font-family: Lato; text-decoration: none;">CHRONOLOGY</NuxtLink></el-menu-item>
            <el-menu-item index="3"><NuxtLink to="outcomesPage" style= "font-family: Lato; text-decoration: none;">OUTCOMES</NuxtLink></el-menu-item>
            <el-menu-item index="4"><NuxtLink to="casestudiesPage" style= "font-family: Lato; text-decoration: none;">CASE STUDIES</NuxtLink></el-menu-item>
            <el-menu-item index="6"><NuxtLink to="namesPage" style= "font-family: Lato; text-decoration: none;">NAMES</NuxtLink></el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
 .nuxt-link-active{
   text-decoration: none;
   font-family: 'Lato';
 }
 .a{
   text-decoration: none;
   font-family: 'Lato';
 }

 li.el-menu-item{
   text-decoration: none;
   font-family: 'Lato';
 }


</style>