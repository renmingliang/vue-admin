<template>
  <el-container>
    <side-bar></side-bar>
    <el-container class="app-container">
      <head-bar></head-bar>
      <el-main class="app-main">
        <breadcrumb></breadcrumb>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { AppMain, HeadBar, Breadcrumb, SideBar } from './components'
export default {
  data() {
    return {
    }
  },
  components: {
    AppMain,
    HeadBar,
    SideBar,
    Breadcrumb
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  margin-left: 200px;
  margin-top: 60px;
  .app-main{
    padding: 0;
  }
}
</style>
