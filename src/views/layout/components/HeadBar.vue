<template>
  <header class="head-container">
    <div class="admin-name">
      <router-link to="/">
        <img src="../../../assets/images/logo.png">
        <h1>IP资料库管理后台</h1>
      </router-link>
    </div>
    <div class="admin-control">
      <el-tooltip effect="dark" :content="screenTips" placement="bottom">
        <screenfull class="screenfull"></screenfull>
      </el-tooltip>
      <el-dropdown class="avator-container" trigger="click">
        <div class="avator-wrap">
          <img src="../../../assets/images/icon-ip-user.png">
          <span>test name</span>
          <i class="el-icon-setting"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="editPassord">
              <img class="dropdown-img" src="../../../assets/images/icon-edit-password.png">
              <span>修改密码</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="logout">
              <img class="dropdown-img" src="../../../assets/images/icon-logout.png">
              <span>退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import Screenfull from '@/components/Screenfull'

export default {
  name: 'HeadBar',
  data() {
    return {
      screenTips: '全屏'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 前端路由重载
      })
    },
    editPassord() {
      console.log('修改密码')
    }
  },
  components: {
    Screenfull
  }
}
</script>

<style lang="scss">
.dropdown-img{
  width: 20px;
  vertical-align: middle;
  margin-right: 8px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../assets/styles/mixin.scss';

.head-container{
  background-color: #B3C0D1;
  color: #333;
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
      font-size: 24px;
      margin-left: 20px;
    }
  }
  .admin-control{
    float: right;
    .screenfull{
      display: inline-block;
      margin: 0 8px;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    .avator-wrap{
      cursor: pointer;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: -10px;
      }
    }
  }
}
</style>
