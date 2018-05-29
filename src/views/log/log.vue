<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="操作人账户">
              <el-input v-model="listQuery.uid" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="开始时间">
              <el-date-picker
                :picker-options="startDateOpt"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                v-model="listQuery.time_begin"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="结束时间">
              <el-date-picker
                :picker-options="endDateOpt"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                v-model="listQuery.time_end"></el-date-picker>
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
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        highlight-current-row
        border
        stripe
        :data="logData">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="uid"
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
            <template slot-scope="scope">{{ scope.row.created_at }}</template>
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
          :total="logTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'log',
  data() {
    return {
      logData: null,
      logTotal: null,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 10,
        uid: '',
        time_begin: '',
        time_end: ''
      },
      startDateOpt: {
        disabledDate: (time) => {
          return time.getTime() > Date.parse(this.listQuery.time_end)
        }
      },
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < Date.parse(this.listQuery.time_begin)
        }
      }
    }
  },
  computed: {
    /* ...mapGetters([
      'logData',
      'logTotal'
    ]) */
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      this.listLoading = true
      this.$store.dispatch('LOG_FETCH_LIST', this.listQuery)
        .then(res => {
          const result = res.data
          this.logData = result.data
          this.logTotal = +result.total_count
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
