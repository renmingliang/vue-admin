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
      <div class="control-wrap">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull"></screenfull>
        </el-tooltip>
        <div class="control-item edit-password" @click="dialogFormVisible = true">
          <el-tooltip effect="dark" content="修改密码" placement="bottom">
            <img class="dropdown-img" src="../../../assets/images/icon-edit-password.png">
          </el-tooltip>
        </div>
        <div class="control-item logout" @click="logout">
          <el-tooltip effect="dark" content="退出登录" placement="bottom">
            <img class="dropdown-img" src="../../../assets/images/icon-logout.png">
          </el-tooltip>
        </div>
      </div>
    </div>

    <el-dialog
      center
      custom-class="custom-dialog-form"
      title="修改密码"
      :visible.sync="dialogFormVisible">
      <el-form
        ref="ruleForm"
        :rules="rules"
        label-width="110px"
        :model="ruleForm">
        <el-form-item
          label="原密码"
          prop="origin_password">
          <el-input placeholder="输入原始密码" v-model="ruleForm.origin_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="new_password">
          <el-input placeholder="输入新密码" v-model="ruleForm.new_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="check_password">
          <el-input placeholder="再次输入新密码" v-model="ruleForm.check_password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'

export default {
  name: 'HeadBar',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.check_password !== '') {
          this.$refs.ruleForm.validateField('check_password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      ruleForm: {
        origin_password: '',
        new_password: '',
        check_password: ''
      },
      rules: {
        origin_password: [
          {required: true, message: '请输入原始密码', trigger: 'blur'}
        ],
        new_password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        check_password: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ]
      }
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
    // 0.登出
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 前端路由重载
      })
    },
    // 1.提交修改密码表单
    submitForm() {
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const parmas = {
            username: that.name,
            origin_password: that.ruleForm.origin_password,
            new_password: that.ruleForm.new_password
          }
          console.log(parmas)
          setTimeout(() => {
            this.dialogFormVisible = false
            this.$message({
              type: 'info',
              message: 'Sorry！该接口处于调试中'
            })
          }, 500)
          /* this.$store.dispatch('EditPass', parmas)
            .then(() => {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '操作成功，请您稍后重新登陆',
                onClose: function() {
                  // 重置密码登出，防止错误
                  that.logout()
                }
              })
            })
            .catch(err => {
              console.log(err.msg)
            }) */
        } else {
          return false
        }
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  // z-index: 10;
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
    .control-wrap{
      display: inline-block;
      background: #635b59;
      margin-left: 10px;
      .screenfull{
        display: inline-block;
        margin: 0 18px;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }
      .control-item{
        display: inline-block;
        cursor: pointer;
        padding: 0 18px;
        border-left: 1px solid #797979;
      }
      .edit-password{
        img{
          vertical-align: middle;
        }
      }
      .logout{
        img{
          vertical-align: -8px;
        }
      }
    }
  }
}
</style>
