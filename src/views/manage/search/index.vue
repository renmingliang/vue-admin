<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP ID：">
              <el-input v-model="listQuery.ipId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="改编权类别：">
              <el-select v-model="listQuery.type" placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版权开始时间：">
              <el-date-picker type="date" placeholder="请选择" v-model="listQuery.dateStart"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP名称：">
              <el-input v-model="listQuery.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注信息：">
              <el-input v-model="listQuery.info" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版权结束时间：">
              <el-date-picker type="date" placeholder="请选择" v-model="listQuery.dateEnd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP所属主体：">
              <el-select v-model="listQuery.company" placeholder="请选择">
                <el-option v-for="item in companyOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买入金额：">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input v-model.number="listQuery.moneyStart" clearable></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="listQuery.moneyEnd" clearable></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button @click="handleExport">导出</el-button>
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
        :data="list"
        :span-method="objectSpanMethod"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="ipId"
          label="IP ID"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          label="IP名称"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleLook(scope.$index, scope.row)">
              {{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="company"
          label="所属主体"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          label="买入金额"
          align="center"
          width="160">
          <template slot-scope="scope">{{ scope.row.money | filterNum }}</template>
        </el-table-column>
        <el-table-column
          label="特殊条件"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.other }}</template>
        </el-table-column>
        <el-table-column
          prop="info"
          label="备注"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <div>
              <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </div>
            <div>
              <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="改编权类别"
          width="280">
          <template slot-scope="scope">
            <ul class="column-container">
              <li class="column-item hover-show" v-for="(column, index) in scope.row.project" :key="index">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleLook(scope.$index, scope.row)">
                  {{column.type}}
                </el-button>
                <div class="float-right inline">
                  <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="版权期限"
          align="center"
          width="100">
          <template slot-scope="scope">
            <ul class="column-container">
              <li class="column-item" v-for="(column, index) in scope.row.project" :key="index">
                {{ column.limitTime }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="项目状态"
          align="center"
          width="100">
          <template slot-scope="scope">
            <ul class="column-container">
              <li class="column-item" v-for="(column, index) in scope.row.project" :key="index">
                <el-tag
                :type="column.status | filterStatus"
                disable-transitions>{{column.status}}</el-tag>
              </li>
            </ul>
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
    ipId: 'KSG001',
    name: '举个栗子',
    company: '凯撒文化',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '12个月',
        status: '已开启'
      },
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
  },
  {
    ipId: 'KSG002',
    name: '举个栗子',
    company: '幻文',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '22个月',
        status: '已开启'
      }
    ]
  },
  {
    ipId: 'KSG003',
    name: '举个栗子',
    company: '凯撒文化',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '12个月',
        status: '已开启'
      },
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
  },
  {
    ipId: 'KSG004',
    name: '举个栗子',
    company: '幻文',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '12个月',
        status: '已开启'
      },
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
  },
  {
    ipId: 'KSG005',
    name: '举个栗子',
    company: '幻文',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '12个月',
        status: '已开启'
      },
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
  },
  {
    ipId: 'KSG006',
    name: '举个栗子',
    company: '凯撒文化',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '手机游戏改编权',
        limitTime: '12个月',
        status: '已开启'
      },
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      },
      {
        type: '网页游戏改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
  },
  {
    ipId: 'KSG007',
    name: '举个栗子',
    company: '凯撒文化',
    money: 203213211,
    info: '备注信息',
    other: '我是特殊的条件情况',
    project: [
      {
        type: '电视剧改编权',
        limitTime: '12个月',
        status: '待开启'
      },
      {
        type: '网页游戏改编权',
        limitTime: '12个月',
        status: '待开启'
      },
      {
        type: '周边产品衍生改编权',
        limitTime: '12个月',
        status: '待开启'
      }
    ]
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
        ipId: '',
        name: '',
        type: '',
        info: '',
        dateStart: '',
        dateEnd: '',
        moneyStart: '',
        moneyEnd: '',
        company: ''
      },
      typeOptions: [
        {label: '全部', value: '0'},
        {label: '手机游戏改编权', value: '1'},
        {label: '网页游戏改编权', value: '2'},
        {label: '电视剧改编权', value: '3'},
        {label: '周边衍生产品改编权', value: '4'}
      ],
      companyOptions: [
        {label: '全部', value: '0'},
        {label: '凯撒文化', value: '1'},
        {label: '幻文', value: '2'}
      ],
      multipleSelection: []
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
    // 导出
    handleExport() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        setTimeout(() => {
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
          this.$message({
            message: '导出成功',
            type: 'success'
          })
        }, 2000)
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    /* // 切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }, */
    // 处理单项选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看表格
    handleLook(index, row) {
      console.log(index, row)
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
  },
  filters: {
    filterNum(num) {
      return String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    },
    filterStatus(status) {
      return status === '已开启' ? 'success' : 'danger'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
