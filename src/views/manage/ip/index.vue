<template>
  <div class="box-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-collapse v-model="activeNames" @change="handleCollapse">
        <el-collapse-item title="IP基本信息" name="1">
          <div class="common-wrap">
            <el-form-item label="IP名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="IP所属主体" prop="company">
              <el-select v-model="ruleForm.company" placeholder="请选择">
                <el-option v-for="item in companyOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买入金额">
              <el-input v-model.number="ruleForm.money" clearable></el-input>
            </el-form-item>
            <el-form-item label="特殊条件">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2 }"
                placeholder="请输入内容"
                v-model="ruleForm.other">
              </el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2 }"
                placeholder="请输入内容"
                v-model="ruleForm.info">
              </el-input>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item title="附件信息" name="2">
          <div class="common-wrap">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus">
                <span slot="tip" class="upload-tip">上传附件</span>
              </i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
          </div>
        </el-collapse-item>

        <el-collapse-item title="改编权类别01" name="3">
          <div class="common-wrap">
            <el-form-item label="改编权类别" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否独家授权" prop="unique">
              <el-radio-group v-model="ruleForm.unique">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否授权转让" prop="transfer">
              <el-radio-group v-model="ruleForm.transfer">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="版权开始时间">
              <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.dateStart"></el-date-picker>
            </el-form-item>

            <el-form-item label="版权结束时间">
              <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.dateEnd"></el-date-picker>
            </el-form-item>

            <el-form-item label="版权合作区域">
              <el-input v-model="ruleForm.area" clearable></el-input>
            </el-form-item>

            <div class="custom-btn" align="right">
              <el-button type="info">删除该条改编权类别</el-button>
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
      dialogImageUrl: '',
      dialogVisible: false,
      activeNames: ['1', '2', '3'],
      ruleForm: {
        name: '',
        type: '',
        company: '',
        money: '',
        info: '',
        unique: '',
        transfer: '',
        dateStart: '',
        dateEnd: '',
        area: '',
        other: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入IP名称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择IP所属主体', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择改编权类别', trigger: 'change' }
        ],
        unique: [
          { required: true, message: '请选择是否独家授权', trigger: 'change' }
        ],
        transfer: [
          { required: true, message: '请选择是否授权转让', trigger: 'change' }
        ]
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-container{
  .upload-tip{
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -28px;
    font-size: 14px;
  }
}
</style>
