<template>
  <div class="box-container">
    <el-form
      v-model="projectLoading"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px">
      <el-collapse v-model="activeNames" @change="handleCollapse">
        <el-collapse-item title="IP基本信息" :name="1">
          <div class="common-wrap">
            <el-form-item label="IP名称" prop="ip_name">
              <el-autocomplete
                placeholder="请输入内容"
                v-model="ruleForm.ip_name"
                :disabled="isLook"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                @select="handleSuggestions"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="改编权类别" prop="sub_right_id">
              <el-select
                :disabled="isLook"
                v-model="ruleForm.ip_right.sub_right_id"
                placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item
          v-for="(column, index) in ruleForm.projects"
          :key="index"
          :title="`项目信息${index + 1 > 10 ? index+1 : '0'+(index+1)}`"
          :name="index+2">
          <div class="common-wrap">
            <el-form-item
              label="项目名称"
              :prop="'projects.' + index + '.name'"
              :rules="{required: true, message: '请输入项目名称', trigger: 'blur'}">
              <el-input :disabled="isLook" v-model="column.name" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目类型">
              <el-input :disabled="isLook" v-model="column.type" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作公司">
              <el-input :disabled="isLook" v-model="column.cooperation_company" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作形式">
              <el-input :disabled="isLook" v-model="column.cooperation_type" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作金额">
              <el-input :disabled="isLook" v-model.number="column.cooperation_money" clearable></el-input>
            </el-form-item>

            <el-form-item label="分摊成本">
              <el-input :disabled="isLook" v-model.number="column.apportionment_costs" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目负责人">
              <el-input :disabled="isLook" v-model="column.project_principal" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目计划">
              <el-input :disabled="isLook" v-model="column.project_plan" type="textarea" :autosize="{ minRows: 2 }"></el-input>
            </el-form-item>

            <el-form-item label="项目进度">
              <el-input :disabled="isLook" v-model="column.project_progress" clearable></el-input>
            </el-form-item>

            <el-form-item
              label="项目状态"
              :prop="'projects.' + index + '.project_status'"
              :rules="{required: true, message: '请选择项目状态', trigger: 'change'}">
              <el-radio-group :disabled="isLook" v-model="column.project_status">
                <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <div v-if="!isLook" class="custom-btn" align="right">
              <el-button @click.prevent="removeForm(column)" type="info">删除该项目</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div v-if="!isLook" class="custom-btn" align="center">
        <el-button @click="submitForm" type="primary">提交</el-button>
        <el-button @click="addForm" class="btn-add">增加项目</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const defaultForm = {
  ip_name: '',
  ip_right: {
    id: null,
    sub_right_id: ''
  },
  projects: [
    {
      id: 0,
      name: '',
      type: '',
      cooperation_company: '',
      cooperation_type: '',
      cooperation_money: '',
      apportionment_costs: '',
      project_principal: '',
      project_plan: '',
      project_progress: '',
      project_status: ''
    }
  ]
}

export default {
  name: 'ProjectForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isLook: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      activeNames: [1, 2],
      ruleForm: Object.assign({}, defaultForm),
      rules: {
        ip_name: [
          { required: true, message: '请输入IP名称', trigger: 'blur' }
        ],
        sub_right_id: [
          { required: true, message: '请选择改编权类别', trigger: 'change' }
        ]
      },
      typeOptions: [],
      statusOptions: [
        {label: '正常', value: '0'},
        {label: '异常', value: '1'},
        {label: '高度预警', value: '2'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'projectLoading'
    ])
  },
  created() {
    if (this.isEdit || this.isLook) {
      this.fetchData()
    } else {
      this.ruleForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    // 0.获取数据
    fetchData() {
      this.$store.dispatch('PROJECT_FETCH_DETAIL', {ip_right_id: this.id})
        .then(res => {
          this.ruleForm = res.data
        })
    },
    // 1.折叠面板切换操作
    handleCollapse(val) {
      console.log(val)
    },
    // 2.提交表单
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let tempSub = {}
          this.ruleForm.projects.forEach((column, index) => {
            tempSub[`project[${index}][ip_right_id]`] = this.ruleForm.ip_right.id

            tempSub[`project[${index}][id]`] = column.id
            tempSub[`project[${index}][name]`] = column.name
            tempSub[`project[${index}][type]`] = column.type
            tempSub[`project[${index}][cooperation_company]`] = column.cooperation_company
            tempSub[`project[${index}][cooperation_type]`] = column.cooperation_type
            tempSub[`project[${index}][cooperation_money]`] = column.cooperation_money
            tempSub[`project[${index}][apportionment_costs]`] = column.apportionment_costs
            tempSub[`project[${index}][project_principal]`] = column.project_principal
            tempSub[`project[${index}][project_plan]`] = column.project_plan
            tempSub[`project[${index}][project_progress]`] = column.project_progress
            tempSub[`project[${index}][project_status]`] = column.project_status
            return tempSub
          })

          const params = Object.assign({}, tempSub)

          this.$store.dispatch('PROJECT_EDIT', params)
            .then(res => {
              this.$confirm('文件已成功提交, 是否继续操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                this.$router.push({ name: 'project', replace: true })
              }).catch(() => {
                this.$router.push({ name: 'search', replace: true })
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
    // 3.动态删除子项
    removeForm(item) {
      const id = item.id
      const index = this.ruleForm.projects.indexOf(item)
      if (!id && index !== -1) {
        this.ruleForm.projects.splice(index, 1)
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('PROJECT_DELETE', { id })
          .then(res => {
            if (index !== -1) {
              this.ruleForm.projects.splice(index, 1)
            }
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
    // 4.动态增加子项
    addForm() {
      this.ruleForm.projects.push({
        id: 0,
        name: '',
        type: '',
        cooperation_company: '',
        cooperation_type: '',
        cooperation_money: '',
        apportionment_costs: '',
        project_principal: '',
        project_plan: '',
        project_progress: '',
        project_status: ''
      })
      // 展开增加子项的折叠面板
      const tempName = this.ruleForm.projects.length + 1
      this.activeNames.push(tempName)
    },
    // 5.模糊搜索
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
    // 6.根据选中的IP获取改编权类别
    handleSuggestions(item) {
      this.$store.dispatch('IP_RIGHT_ALL', { ip_id: item.id })
        .then(res => {
          const result = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          this.typeOptions = result
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
