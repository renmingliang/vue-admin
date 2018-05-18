<template>
  <div class="search-container">
    <div class="common-wrap search-filter">
      <el-form ref="form" :model="listQuery" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="IP改编权">
              <el-select
                v-model="listQuery.pid"
                placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
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
        label-width="110px"
        :model="ruleForm">
        <el-form-item
          label="IP改编权"
          prop="pid"
          :rules="{required: true, message: '请选择IP改编权', trigger: 'change'}">
          <el-select
            :disabled="isLook"
            v-model="ruleForm.pid"
            placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="改编权类别"
          prop="name"
          :rules="{ required: true, message: '请输入改编权类别', trigger: 'blur' }">
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
        :data="adapataionData">
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

export default {
  data() {
    return {
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
      typeOptions: []
    }
  },
  created() {
    this.fetchTopAdaptation()
  },
  computed: {
    ...mapGetters([
      'adapataionData'
    ])
  },
  methods: {
    // 0.获取ip所有top的改编权
    fetchTopAdaptation() {
      this.$store.dispatch('ADAPATATION_FETCH_TOP')
        .then(res => {
          const result = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          this.typeOptions = result
        })
    },
    // 1.获取所有类别列表数据
    getList() {
      this.listLoading = true
      this.$store.dispatch('ADAPATATION_FETCH_LIST', this.listQuery)
        .then(res => {
          /* this.list = res.data.map(item => {
            this.$set(item, 'edit', false)
            item.originalName = item.name
            return item
          }) */
          this.listLoading = false
        })
    },
    // 2.搜索
    handleFilter() {
      this.getList()
    },
    // 3.提交表单
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('ADAPATATION_EDIT', this.ruleForm)
            .then(res => {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '操作成功!',
                onClose: function() {
                  location.reload()
                }
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('ADAPATATION_DELETE', { id: row.pid })
          .then(res => {
            this.adapataionData.splice(index, 1)
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
  }
}
</script>

<style lang="scss">

</style>
