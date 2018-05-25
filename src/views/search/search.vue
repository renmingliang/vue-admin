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
                :picker-options="startDateOpt"
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
                :picker-options="endDateOpt"
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
              <a ref="exportExcel" style="display:none;" :href="exportUrl" target="_blank">导出</a>
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
              :to="{name:'look-ip', params: {id: scope.row.id}}"
              target="_blank">
              {{ scope.row.name }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="所属主体"
          align="center"
          width="160">
          <template slot-scope="scope">{{ scope.row.company_name }}</template>
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
              <router-link :to="{name:'edit-ip', params: {id: scope.row.id}}">
                <el-button size="mini" icon="el-icon-edit">编辑</el-button>
              </router-link>
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
                <router-link :to="{name:'look-project', params: {id: column.id}}" target="_blank">
                  <el-button type="text" size="mini">{{ column.sub_right_name }}</el-button>
                </router-link>
                <div class="float-right inline">
                  <router-link :to="{name:'edit-project', params: {id: column.id}}">
                    <el-button size="mini" type="primary">编辑</el-button>
                  </router-link>
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
import { getToken } from '@/utils/auth'
import qs from 'qs'

const defalutOptions = [
  {label: '全部', value: '0'}
]

export default {
  name: 'search',
  data() {
    return {
      exportUrl: 'javascript:;',
      listData: null,
      listTotal: null,
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
        price_min: '',
        price_max: ''
      },
      multipleSelection: [],
      startDateOpt: {
        disabledDate: (time) => {
          return time.getTime() > Date.parse(this.listQuery.right_end)
        }
      },
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < Date.parse(this.listQuery.right_begin)
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'adaptationName',
      'companyName',
      'listLoading'
    ]),
    typeOptions() {
      if (this.adaptationName) {
        return defalutOptions.concat(this.adaptationName)
      } else {
        return defalutOptions
      }
    },
    companyOptions() {
      if (this.companyName) {
        return defalutOptions.concat(this.companyName)
      } else {
        return defalutOptions
      }
    }
  },
  methods: {
    // 获取数据
    getList() {
      this.$store.dispatch('IP_FETCH_LIST', this.listQuery)
        .then(res => {
          const result = res.data
          this.listData = result.data
          this.listTotal = +result.total_count
        })
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
        const tempIds = this.multipleSelection.map(item => {
          return item.id
        })
        const ids = tempIds.join(',')
        const query = qs.stringify(this.listQuery)
        const token = getToken()
        // 浏览器兼容处理
        if (location.origin) {
          this.exportUrl = location.origin + `/ip/export-lists?access-token=${token}&${query}&ids=${ids}`
        } else {
          // IE
          this.exportUrl = `/ip/export-lists?access-token=${token}&${query}&ids=${ids}`
        }

        setTimeout(() => {
          this.$refs.exportExcel.click()
        }, 200)
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    // 处理选择
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
          .catch(err => {
            console.log(err.msg)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
