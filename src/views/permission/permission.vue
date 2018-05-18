<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="filterQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="权限名称">
              <el-select v-model="filterQuery.name" placeholder="请选择">
                <el-option v-for="item in permissionOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="员工姓名">
              <el-autocomplete
                placeholder="请输入内容"
                popper-class="custom-autocomplete"
                v-model="filterQuery.username"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearch"
                @select="handleSuggestions">
                <template slot-scope="{ item }">
                  <div class="name">
                    <span>{{ item.value }}</span>
                    <span class="addr">{{ item.nickname }}</span>
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button type="info">
                <router-link :to="{name:'create-permission'}">新增权限</router-link>
              </el-button>
              <el-button type="info" @click="dialogFormVisible = true">新增员工</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog
      center
      custom-class="custom-dialog-form"
      title="新增员工"
      :visible.sync="dialogFormVisible">
      <el-form
        ref="ruleForm"
        label-width="110px"
        :model="ruleForm">
        <el-form-item
          label="员工姓名"
          prop="username"
          :rules="{ required: true, message: '请输入员工姓名', trigger: 'blur' }">
          <el-autocomplete
            placeholder="请输入员工姓名"
            popper-class="custom-autocomplete"
            v-model="ruleForm.username"
            :trigger-on-focus="false"
            :fetch-suggestions="querySearch"
            @select="handleSuggestions">
            <template slot-scope="{ item }">
              <div class="name">
                <span>{{ item.value }}</span>
                <span class="addr">{{ item.nickname }}</span>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item
          label="员工权限"
          prop="ipr_permission"
          :rules="{required: true, message: '请选择员工权限', trigger: 'change'}">
          <el-select
            v-model="ruleForm.ipr_permission"
            placeholder="请选择">
            <el-option
              v-for="item in permissionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="common-wrap search-result">
      <el-table
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        highlight-current-row
        border
        stripe
        :data="permissionData">
        <el-table-column
          fixed
          type="index"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="权限名称"
          align="center"
          width="300">
          <template slot-scope="scope">
            <router-link
              :to="{name:'look-permission', params: {id: scope.row.id}}">
              {{ scope.row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="权限说明"
          align="center"
          width="300">
          <template slot-scope="scope">{{ scope.row.desc }}</template>
        </el-table-column>
        <el-table-column
          label="开通人员"
          align="center"
          min-width="300">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="点击修改权限人员" placement="top">
                <router-link :to="{name: 'edit-user', params: {id: scope.row.id}}">
                  <span
                    v-for="(user, index) in scope.row.users"
                    :key="index">
                    {{ user }} {{ index === scope.row.users.length-1? '':'、' }}
                  </span>
                </router-link>
              </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit">
              <router-link
                :to="{name:'edit-permission', params: {id: scope.row.id}}">
                编辑
              </router-link>
            </el-button>
            <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      timeout: null,
      list: null,
      dialogFormVisible: false,
      listLoading: false,
      filterQuery: {
        name: '',
        username: ''
      },
      ruleForm: {
        username: '',
        ipr_permission: '',
        ks: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissionData',
      'permissionName',
      'userList'
    ]),
    permissionOptions() {
      return [{label: '全部', value: '0'}].concat(this.permissionName)
    }
  },
  created() {
    this.fetchPermissionName()
    // this.fetchSsoUser()
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    // 获取所有权限名称
    fetchPermissionName() {
      this.$store.dispatch('PERMISSION_FETCH_LIST')
    },
    // 获取所有SSO用户
    fetchSsoUser() {
      this.$store.dispatch('USER_FETCH_SSO')
    },
    // 获取数据
    getList() {
      this.$store.dispatch('PERMISSION_FETCH_LIST')
    },
    // 搜索
    handleFilter() {
      this.getList()
    },
    // 新增员工
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('PERMISSION_USER_ADD', this.ruleForm)
            .then(res => {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '操作成功!'/* ,
                onClose: function() {
                  location.reload()
                } */
              })
            })
            .catch(() => {
              this.$message.error('提交失败，请稍微再试')
            })
        } else {
          return false
        }
      })
    },
    // 删除权限
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('PERMISSION_DELETE', { id: row.pid })
          .then(res => {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message.error('删除失败，请稍后再试')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 模糊搜索匹配员工
    querySearch(queryString, cb) {
      const tempData = this.restaurants
      const results = queryString ? tempData.filter(this.createStateFilter(queryString)) : tempData
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    createStateFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSuggestions(item) {
      this.ruleForm.ks = 1
    },
    loadAll() {
      return [
        { 'value': 'test', 'nickname': '测试' },
        { 'value': 'test1', 'nickname': '测试1' },
        { 'value': 'test2', 'nickname': '测试2' },
        { 'value': 'test3', 'nickname': '测试3' },
        { 'value': 'test4', 'nickname': '测试4' },
        { 'value': 'test5', 'nickname': '测试5' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
