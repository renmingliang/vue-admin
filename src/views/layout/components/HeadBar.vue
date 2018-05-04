<template>
  <el-header class="head-container">
    <div class="head-name">
      <img src="../../../assets/images/logo.png">
      <h1>IP资料库管理后台</h1>
    </div>
    <div class="head-control">
      <span>王小虎</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'HeadBar',
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../assets/styles/mixin.scss';

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.head-container{
  height: 60px;
  font-size: 12px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  @include clearfix;
  .head-name{
    float: left;
    img{
      width: 100px;
      vertical-align: middle;
    }
    h1{
      float: right;
      font-size: 24px;
      margin-left: 20px;
    }
  }
  .head-control{
    float: right;
  }
}
</style>
