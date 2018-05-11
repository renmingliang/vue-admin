<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="操作人账户">
              <el-input v-model="listQuery.ipId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="版权开始时间：">
              <el-date-picker type="date" placeholder="请选择" v-model="listQuery.dateStart"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="版权结束时间：">
              <el-date-picker type="date" placeholder="请选择" v-model="listQuery.dateEnd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
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
          type="index"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="操作人账户"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作内容"
          align="center"
          min-width="200">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="center"
          width="300">
            <template slot-scope="scope">{{ scope.row.time }}</template>
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
        username: '',
        dateStart: '',
        dateEnd: ''
      }
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
    // 合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      /* if (rowIndex % 2 === 0) {
        return {
          rowspan: 2,
          colspan: 1
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0
        }
      } */
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
