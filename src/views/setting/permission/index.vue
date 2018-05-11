<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="权限名称：">
              <el-select v-model="listQuery.permissionType" placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="员工姓名">
              <el-input v-model="listQuery.username" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button type="info" @click="handleAddPermission">新增权限</el-button>
              <el-button type="info" @click="handleAddUser">新增员工</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="common-wrap search-result">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        highlight-current-row
        border
        stripe
        :data="list">
        <el-table-column
          fixed
          type="index"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="权限名称"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          label="权限说明"
          align="center"
          width="300">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column
          label="开通人员"
          align="center"
          min-width="300">
            <template slot-scope="scope">{{ scope.row.time }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240">
          <template slot-scope="scope">
            <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="search-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const tableData = [
  {
    username: 'KSG001',
    content: '举个栗子',
    time: '2018年5月2日18:37:32'
  },
  {
    username: 'KSG002',
    content: '增加子项',
    time: '2018年5月12日10:07:22'
  },
  {
    username: 'KSG003',
    content: '删除子项',
    time: '2018年5月22日08:37:30'
  }
]

export default {
  data() {
    return {
      list: null,
      total: null,
      downloadLoading: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        permissionType: '',
        username: ''
      },
      typeOptions: [
        {label: '全部', value: '0'},
        {label: '手机游戏改编权', value: '1'},
        {label: '网页游戏改编权', value: '2'},
        {label: '电视剧改编权', value: '3'},
        {label: '周边衍生产品改编权', value: '4'}
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.list = tableData
        this.total = tableData.length
        this.listLoading = false
      }, 2000)
      /* fetchList(this.listQuery).then(res => {
        console.log(res)
        this.listLoading = false
      }) */
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
      console.log('filter!')
    },
    // 单页最大显示数据条数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 处理分页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 新增权限
    handleAddPermission() {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 前端展示删除
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增员工
    handleAddUser() {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 前端展示删除
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑表格
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 删除表格
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 前端展示删除
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
