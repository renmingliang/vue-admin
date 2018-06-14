<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP ID：">
              <el-input v-model.trim="listQuery.id" placeholder="IP ID" clearable></el-input>
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
              <el-autocomplete
                placeholder="支持模糊搜索"
                v-model.trim="listQuery.name"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注信息：">
              <el-input v-model.trim="listQuery.remark" placeholder="备注信息" clearable></el-input>
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
            <el-form-item
              label="买入金额：">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input v-model.number="listQuery.price_min" placeholder="最小金额" clearable></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model.number="listQuery.price_max" placeholder="最大金额" clearable></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button @click="handleExport('ip/export-lists')">导出</el-button>
              <a ref="exportExcel" style="display:none;" :href="exportUrl" target="_blank">导出链接</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="common-wrap search-result" v-cloak>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        highlight-current-row
        border
        :data="listData"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
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
            <span class="hover-show">
              <router-link
                :to="{name:'look-ip', params: {id: scope.row.id}}"
                class="hover-link"
                target="_blank">
                {{ scope.row.name }}
              </router-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属主体"
          align="center"
          width="160">
          <template slot-scope="scope">{{ scope.row.company_name }}</template>
        </el-table-column>
        <el-table-column
          label="买入金额（单位：元）"
          align="center"
          width="200">
          <template slot-scope="scope">{{scope.row.price | formatePrice}}</template>
        </el-table-column>
        <el-table-column
          label="特殊条件"
          align="center"
          width="180">
          <template slot-scope="scope"><span class="height-overflow text-ellipsis" :title="scope.row.special_conditions" v-html="formateBr(scope.row.special_conditions)"></span></template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          width="180">
          <template slot-scope="scope"><span class="height-overflow text-ellipsis" :title="scope.row.remark" v-html="formateBr(scope.row.remark)"></span></template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <div v-if="$_has('ip/form-update')">
              <router-link :to="{name:'edit-ip', params: {id: scope.row.id}}">
                <el-button size="mini" icon="el-icon-edit">编辑</el-button>
              </router-link>
            </div>
            <div v-if="$_has('ip/del')">
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
                <router-link class="hover-link" :to="{name:'look-project', params: {id: column.id}}" target="_blank">
                  <span>{{ column.sub_right_name }}</span>
                </router-link>
                <div v-if="column.p_count > 0" class="float-right inline">
                  <router-link
                    v-if="$_has('project/form-update')"
                    :to="{name:'edit-project', params: {id: column.id}}">
                    <el-button size="mini" type="primary">编辑</el-button>
                  </router-link>
                  <el-button
                    v-if="$_has('ip/right-del-project')"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row, column.id)">删除</el-button>
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="版权截止期限"
          align="center"
          width="120">
          <template slot-scope="scope">
            <ul class="column-container set-height">
              <li class="column-item"
                v-if="!column.time_remark"
                v-for="(column, index) in scope.row.rights"
                :key="index">
                {{column.expired}}
              </li>
              <li class="column-item"
                :title="column.time_remark"
                v-else>
                <div class="text-ellipsis">{{column.time_remark}}</div>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="项目状态"
          align="center"
          width="100">
          <template slot-scope="scope">
            <ul class="column-container set-height">
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
  created() {
    // 默认执行一次查询
    this.getList()
  },
  methods: {
    // 0.获取数据
    getList() {
      this.$store.dispatch('IP_FETCH_LIST', this.listQuery)
        .then(res => {
          const result = res.data
          this.listData = result.data
          this.listTotal = +result.total_count
        })
    },
    // 1.搜索
    handleFilter() {
      if (this.listQuery.price_min && this.listQuery.price_max !== '') {
        if (this.listQuery.price_min > this.listQuery.price_max) {
          this.$message.error('买入金额中，最小金额不应大于最大金额')
          return false
        }
      }
      this.listQuery.page = 1
      this.getList()
    },
    // 2.单页最大显示数据条数
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this.getList()
    },
    // 3.处理分页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 4.导出表格
    handleExport(params) {
      // 至少选择导出一项
      /* if (this.multipleSelection.length) { */
      const tempIds = this.multipleSelection.map(item => {
        return item.id
      })
      const ids = tempIds.join(',')
      const query = qs.stringify(this.listQuery)
      const token = getToken()
      // 浏览器兼容处理
      if (location.origin) {
        this.exportUrl = location.origin + `/${params}?access-token=${token}&${query}&ids=${ids}`
      } else {
        // IE
        this.exportUrl = `/${params}?access-token=${token}&${query}&ids=${ids}`
      }

      setTimeout(() => {
        this.$refs.exportExcel.click()
      }, 200)
      /* } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      } */
    },
    // 5.处理选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 6.删除
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
      // console.log(index, row, params)
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
    },
    // 7.模糊搜索IP名称
    querySearch(name, cb) {
      this.$store.dispatch('IP_SEARCH_NAME', { name })
        .then(res => {
          const result = res.data.map(item => {
            return {
              id: item.id,
              value: item.name
            }
          })
          // 调用callback返回建议列表的数据
          cb(result)
        })
    },
    // 9.
    formateBr(val) {
      const temp = val.replace(/\n/ig, '<br/>')
      return temp
    }
  },
  filters: {
    // 8.千位分割数字
    formatePrice(num) {
      if (num) {
        return String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 截取高度隐藏
.height-overflow{
  max-height: 69px;
  overflow: hidden;
  display: block;
}
// 设置固定高便于对齐
.set-height{
  .column-item{
    height: 39px;
    line-height: 34px;
    box-sizing: content-box;
  }
}
</style>
