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
        <img :src="userAvator">
        <span class="username">{{name}}</span>
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
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'

export default {
  name: 'HeadBar',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ]),
    userAvator() {
      return this.avatar ? this.avatar : require('../../../assets/images/icon-ip-user.png')
    }
  },
  created() {
    this.$store.dispatch('GetInfo')
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
  background-color: #2e3137;
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
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: -12px;
      }
      .username{
        display: inline-block;
        padding-left: 5px;
      }
    }
    .logout{
      display: inline-block;
      cursor: pointer;
      background: #635b59;
      padding: 0 10px;
      img{
        vertical-align: -8px;
      }
    }
  }
}
</style>
