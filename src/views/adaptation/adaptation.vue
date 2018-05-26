<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="IP改编权">
              <el-select
                v-model="listQuery.pid"
                placeholder="请选择">
                <el-option v-for="item in typeTopOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button @click="handleEdit">新增类别</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog
      center
      custom-class="custom-dialog-form"
      :title="ruleFormTitle"
      :visible.sync="dialogFormVisible">
      <el-form
        ref="ruleForm"
        :rules="rules"
        label-width="110px"
        :model="ruleForm">
        <el-form-item
          label="IP改编权"
          prop="pid">
          <el-select
            :disabled="isLook"
            v-model="ruleForm.pid"
            placeholder="请选择">
            <el-option
              v-for="item in adaptationTop"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="改编权类别"
          prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
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
        :data="adaptationData">
        <el-table-column
          fixed
          type="index"
          label="序号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="p_name"
          label="IP改编权"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          label="对应部门"
          align="center"
          width="300">
          <template slot-scope="scope">{{ scope.row.d_name }}</template>
        </el-table-column>
        <el-table-column
          label="改编权类别"
          align="center"
          min-width="300">
            <template slot-scope="scope">{{ scope.row.name }}</template>
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

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const defalutOptions = [
  {label: '全部', value: '0'}
]

export default {
  data() {
    const validateAdaptationName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入改编权类别'))
      } else if (value.length > 20) {
        callback(new Error('输入内容不得超过20个字符'))
      } else {
        callback()
      }
    }
    return {
      adaptationData: null,
      dialogFormVisible: false,
      listLoading: false,
      isLook: false,
      ruleFormTitle: '新增改编权类别',
      ruleForm: {
        pid: '',
        name: '',
        id: ''
      },
      listQuery: {
        pid: ''
      },
      rules: {
        pid: [
          {required: true, message: '请选择IP改编权', trigger: 'change'}
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateAdaptationName }
        ]
      }
    }
  },
  created() {
    this.fetchTopAdaptation()
  },
  computed: {
    ...mapGetters([
      'adaptationTop'
    ]),
    typeTopOptions() {
      if (this.adaptationTop) {
        return defalutOptions.concat(this.adaptationTop)
      } else {
        return defalutOptions
      }
    }
  },
  methods: {
    // 0.获取ip所有top的改编权
    fetchTopAdaptation() {
      this.$store.dispatch('ADAPTATION_FETCH_TOP')
    },
    // 1.获取所有类别列表数据
    getList() {
      this.listLoading = true
      this.$store.dispatch('ADAPTATION_FETCH_LIST', this.listQuery)
        .then(res => {
          this.adaptationData = res.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    // 2.搜索
    handleFilter() {
      this.getList()
    },
    // 3.提交表单
    submitForm() {
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('ADAPTATION_EDIT', this.ruleForm)
            .then(() => {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '操作成功!',
                onClose: function() {
                  // 更新获取所有类别
                  that.$store.dispatch('ADAPTATION_FETCH_LIST')
                  // 再次执行搜索，刷新数据
                  that.handleFilter()
                }
              })
            })
            .catch(err => {
              console.log(err.msg)
            })
        } else {
          return false
        }
      })
    },
    // 4.新增或编辑
    handleEdit(index, row) {
      if (!row) {
        this.isLook = false
        this.ruleFormTitle = '新增改编权类别'
        // 初始化类别数据
        this.ruleForm = {
          pid: '',
          name: '',
          id: ''
        }
      } else {
        this.isLook = true
        this.ruleFormTitle = '编辑改编权类别'
        // 填充对应类别数据
        this.ruleForm = {
          pid: row.pid,
          name: row.name,
          id: row.id
        }
      }
      this.dialogFormVisible = true
    },
    // 5.删除子改编权
    handleDelete(index, row) {
      const that = this
      this.$confirm('此操作将会删除该条改编权类别、及其所有IP内包含的该条改编权信息，是否确认删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('ADAPTATION_DELETE', { id: row.id })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              onClose: function() {
                // 更新获取所有类别
                that.$store.dispatch('ADAPTATION_FETCH_LIST')
                // 再次执行搜索，刷新数据
                that.handleFilter()
              }
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
  }
}
</script>

<style lang="scss">

</style>
