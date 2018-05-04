<template>
  <el-menu class="nav-bar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="opened"></hamburger>
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </el-menu>
</template>

<script>
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Breadcrumb',
  data() {
    return {
      opened: true
    }
  },
  components: {
    Hamburger
  },
  methods: {
    toggleSideBar() {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar{
  height: 50px;
  overflow: hidden;
  .hamburger-container{
    float: left;
    line-height: 60px;
    padding: 0 10px;
  }
  .breadcrumb-container{
    display: inline-block;
    margin-left: 10px;
    line-height: 50px;
  }
}
</style>
