<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP ID：">
              <el-input v-model="listQuery.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="改编权类别：">
              <el-select v-model="listQuery.sub_right" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版权开始时间：">
              <el-date-picker
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                v-model="listQuery.right_begin">
              </el-date-picker>
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
              <el-input v-model="listQuery.remark" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版权结束时间：">
              <el-date-picker
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                v-model="listQuery.right_end">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP所属主体：">
              <el-select v-model="listQuery.company" placeholder="请选择">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买入金额：">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input v-model.number="listQuery.price_min" clearable></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="listQuery.price_max" clearable></el-input>
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
        :data="listData"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="id"
          label="IP ID"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          label="IP名称"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <router-link
              :to="{name:'look-ip', params: {id: scope.row.id}}">
              {{ scope.row.name }}
            </router-link>
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
          <template slot-scope="scope">{{scope.row.price | formatePrice}}</template>
        </el-table-column>
        <el-table-column
          label="特殊条件"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.special_conditions }}</template>
        </el-table-column>
        <el-table-column
          prop="remark"
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
              icon="el-icon-edit">
              <router-link
                :to="{name:'edit-ip', params: {id: scope.row.id}}">
                编辑
              </router-link>
            </el-button>
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
              <li class="column-item hover-show"
                v-for="(column, index) in scope.row.rights"
                :key="index">
                <el-button
                  type="text"
                  size="mini">
                    <router-link
                      :to="{name:'look-project', params: {id: column.id}}">
                      {{column.sub_right_id | formateTypeLabel}}
                    </router-link>
                </el-button>
                <div class="float-right inline">
                  <el-button
                  size="mini"
                  type="primary">
                    <router-link
                      :to="{name:'edit-project', params: {id: column.id}}">
                      编辑
                    </router-link>
                  </el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row, column.id)">删除</el-button>
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
              <li class="column-item"
                v-for="(column, index) in scope.row.rights"
                :key="index">
                {{column.expired | formateDateStartEnd}}
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
              <li class="column-item"
                v-for="(column, index) in scope.row.rights"
                :key="index">
                <el-tag
                  v-if="column.p_count > 0"
                  type="success"
                  disable-transitions>已开启</el-tag>
                <el-tag
                  v-else
                  type="danger"
                  disable-transitions>未开启</el-tag>
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
          :page-size="listQuery.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      listQuery: {
        page: 1,
        page_size: 10,
        id: null,
        name: '',
        company: '',
        sub_right: '',
        remark: '',
        right_begin: '',
        right_end: '',
        price_min: null,
        price_max: null
      },
      multipleSelection: [],
      companyOptions: null
    }
  },
  computed: {
    ...mapGetters([
      'adaptationName',
      'listData',
      'listTotal',
      'listLoading'
    ]),
    typeOptions() {
      return [{label: '全部', value: '0'}].concat(this.adaptationName)
    }
  },
  created() {
    this.fetchCompany()
  },
  methods: {
    // 获取公司主体
    fetchCompany() {
      this.$store.dispatch('COMPANY_FETCH_LIST')
        .then(res => {
          const result = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          this.companyOptions = [{label: '全部', value: '0'}].concat(result)
        })
    },
    // 获取数据
    getList() {
      this.$store.dispatch('IP_FETCH_LIST', this.listQuery)
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 单页最大显示数据条数
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.getList()
    },
    // 处理分页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 导出表格
    handleExport() {
      if (this.multipleSelection.length) {
        this.$store.commit('LIST_LOADING', { loading: true })
        setTimeout(() => {
          this.$refs.multipleTable.clearSelection()
          this.$store.commit('LIST_LOADING', { loading: false })
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
    // 处理单项选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除
    handleDelete(index, row, paramsId) {
      let delData, delType, params
      if (paramsId) {
        delType = 'IP_PROJECT_DELETE'
        params = {ip_right_id: paramsId}
      } else {
        delData = this.listData
        delType = 'IP_DELETE'
        params = {id: row.id}
      }
      console.log(index, row, params)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(delType, params)
          .then(res => {
            if (delData) { delData.splice(index, 1) }
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
    }
  },
  filters: {
    // 千位分割数字
    formatePrice(num) {
      if (num) {
        return String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      } else {
        return ''
      }
    },
    // 不足一月按一月
    formateDateStartEnd(val) {
      return (val || 0) + '个月'
    },
    // 根据改编权id显示对于文本值
    formateTypeLabel(type) {
      let tempLabel = ''
      this.adaptationName.forEach(item => {
        if (type === item.value) {
          tempLabel = item.label
        }
      })
      return tempLabel
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
