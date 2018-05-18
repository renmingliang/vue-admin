<template>
  <header class="head-container">
    <div class="admin-name">
      <router-link to="/">
        <img src="../../../assets/images/logo.png">
        <h1>IP资料库管理后台</h1>
      </router-link>
    </div>
    <div class="admin-control">
      <div class="avator-wrap">
        <img src="../../../assets/images/icon-ip-user.png">
        <span>test name</span>
      </div>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull"></screenfull>
      </el-tooltip>
      <div class="logout" @click="logout">
        <el-tooltip effect="dark" content="退出登录" placement="bottom">
          <img class="dropdown-img" src="../../../assets/images/icon-logout.png">
        </el-tooltip>
      </div>
    </div>
  </header>
</template>

<script>
import Screenfull from '@/components/Screenfull'

export default {
  name: 'HeadBar',
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 前端路由重载
      })
    }
  },
  components: {
    Screenfull
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../assets/styles/mixin.scss';

.head-container{
  background-color: #0c061e;
  color: #fff;
  height: 60px;
  line-height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 10;
  @include clearfix;
  .admin-name{
    float: left;
    img{
      width: 100px;
      vertical-align: middle;
    }
    h1{
      float: right;
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .admin-control{
    float: right;
    .screenfull{
      display: inline-block;
      margin: 0 18px;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    .avator-wrap{
      display: inline-block;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: -10px;
      }
    }
    .logout{
      display: inline-block;
      padding: 0 18px;
      background: #565353;
      cursor: pointer;
      img{
        vertical-align: -8px;
      }
    }
  }
}
</style>
