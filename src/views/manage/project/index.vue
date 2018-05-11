<template>
  <div class="box-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-collapse v-model="activeNames" @change="handleCollapse">
        <el-collapse-item title="IP基本信息" name="1">
          <div class="common-wrap">

            <el-form-item label="IP名称" prop="name">
              <el-autocomplete
                v-model="ruleForm.name"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleIPSuggestions"
              ></el-autocomplete>
            </el-form-item>

            <el-form-item label="改编权类别" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>

          </div>
        </el-collapse-item>

        <el-collapse-item title="项目信息01" name="2">
          <div class="common-wrap">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>

            <el-form-item label="项目类型">
              <el-input v-model="ruleForm.projectType" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作公司">
              <el-input v-model="ruleForm.projectCom" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作形式">
              <el-input v-model="ruleForm.projectShape" clearable></el-input>
            </el-form-item>

            <el-form-item label="合作金额">
              <el-input v-model.number="ruleForm.projectMoney" clearable></el-input>
            </el-form-item>

            <el-form-item label="分摊成本">
              <el-input v-model.number="ruleForm.projectMoneyEach" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目负责人">
              <el-input v-model="ruleForm.projectManager" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目计划">
              <el-input v-model="ruleForm.projectPlan" type="textarea" :autosize="{ minRows: 2 }"></el-input>
            </el-form-item>

            <el-form-item label="项目进度">
              <el-input v-model="ruleForm.projectProgress" clearable></el-input>
            </el-form-item>

            <el-form-item label="项目状态" prop="projectStatus">
              <el-radio-group v-model="ruleForm.projectStatus">
                <el-radio v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-radio>
              </el-radio-group>
            </el-form-item>

            <div class="custom-btn" align="right">
              <el-button type="info">删除该项目</el-button>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="custom-btn" align="center">
        <el-button class="btn-add">增加改编权类别</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'IP',
  data() {
    return {
      ipData: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' }
      ],
      activeNames: ['1', '2'],
      ruleForm: {
        name: '',
        type: '',
        projectName: '',
        projectType: '',
        projectCom: '',
        projectShape: '',
        projectMoney: '',
        projectMoneyEach: '',
        projectManager: '',
        projectPlan: '',
        projectProgress: '',
        projectStatus: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入IP名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择改编权类别', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projectStatus: [
          { required: true, message: '请选择项目状态', trigger: 'change' }
        ]
      },
      typeOptions: [
        {label: '全部', value: '0'},
        {label: '手机游戏改编权', value: '1'},
        {label: '网页游戏改编权', value: '2'},
        {label: '电视剧改编权', value: '3'},
        {label: '周边衍生产品改编权', value: '4'}
      ],
      statusOptions: [
        {label: '正常', value: '0'},
        {label: '异常', value: '1'},
        {label: '高度预警', value: '2'}
      ]
    }
  },
  methods: {
    handleCollapse(val) {
      console.log(val)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    querySearch(queryString, cb) {
      const ipData = this.ipData
      const results = queryString ? ipData.filter(this.createFilter(queryString)) : ipData
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleIPSuggestions(item) {
      console.log(item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
