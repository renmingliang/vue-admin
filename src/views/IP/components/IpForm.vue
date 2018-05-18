<template>
  <div class="box-container">
    <el-form
      v-loading="listLoading"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px">
      <el-collapse v-model="activeNames" @change="handleCollapse">
        <el-collapse-item title="IP基本信息" :name="1">
          <div class="common-wrap">
            <el-form-item label="IP名称" prop="name">
              <el-input :disabled="isLook" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="IP所属主体" prop="company">
              <el-select :disabled="isLook" v-model="ruleForm.company" placeholder="请选择">
                <el-option v-for="item in companyOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买入金额">
              <el-input :disabled="isLook" v-model.number="ruleForm.price" clearable></el-input>
            </el-form-item>
            <el-form-item label="特殊条件">
              <el-input
                type="textarea"
                :disabled="isLook"
                :autosize="{ minRows: 2 }"
                placeholder="请输入内容"
                v-model="ruleForm.special_conditions">
              </el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input
                type="textarea"
                :disabled="isLook"
                :autosize="{ minRows: 2 }"
                placeholder="请输入内容"
                v-model="ruleForm.remark">
              </el-input>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item title="附件信息" :name="2">
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

        <el-collapse-item
          v-for="(column, index) in ruleForm.rights"
          :key="index"
          :title="`改编权类别${index + 1 > 10 ? index+1 : '0'+(index+1)}`"
          :name="index+3">
          <div class="common-wrap">
            <el-form-item
              label="改编权类别"
              :prop="'rights.' + index + '.sub_right_id'"
              :rules="{required: true, message: '请选择改编权类别', trigger: 'change'}">
              <el-select :disabled="isLook" v-model="column.sub_right_id" placeholder="请选择">
                <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="是否独家授权"
              :prop="'rights.' + index + '.is_exclusive_license'"
              :rules="{required: true, message: '请选择是否独家授权', trigger: 'change'}">
              <el-radio-group :disabled="isLook" v-model="column.is_exclusive_license">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="是否授权转让"
              :prop="'rights.' + index + '.can_authorized_transfer'"
              :rules="{required: true, message: '请选择是否授权转让', trigger: 'change'}">
              <el-radio-group :disabled="isLook" v-model="column.can_authorized_transfer">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="版权开始时间">
              <el-date-picker :disabled="isLook" type="date" placeholder="请选择" value-format="yyyy-MM-dd" v-model="column.right_begin"></el-date-picker>
            </el-form-item>

            <el-form-item label="版权结束时间">
              <el-date-picker :disabled="isLook" type="date" placeholder="请选择" value-format="yyyy-MM-dd" v-model="column.right_end"></el-date-picker>
            </el-form-item>

            <el-form-item label="版权合作区域">
              <el-input :disabled="isLook" v-model="column.cooperation_area" clearable></el-input>
            </el-form-item>

            <div v-if="!isLook" class="custom-btn" align="right">
              <el-button @click.prevent="removeForm(column)" type="info">删除该条改编权类别</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div v-if="!isLook" class="custom-btn" align="center">
        <el-button @click="submitForm" type="primary">提交</el-button>
        <el-button @click="addForm" class="btn-add">增加改编权类别</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const defaultForm = {
  id: 0,
  name: '',
  company: '',
  price: '',
  special_conditions: '',
  remark: '',
  attachment: '',
  rights: [
    {
      id: 0,
      ip_id: 0,
      sub_right_id: '',
      is_exclusive_license: '',
      can_authorized_transfer: '',
      right_begin: '',
      right_end: '',
      cooperation_area: ''
    }
  ]
}

export default {
  name: 'IpForm',
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
      activeNames: [1, 2, 3],
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: Object.assign({}, defaultForm),
      rules: {
        name: [
          { required: true, message: '请输入IP名称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择IP所属主体', trigger: 'change' }
        ]
      },
      typeOptions: [
        {label: '网页游戏改编权', value: '1'},
        {label: '手机游戏改编权', value: '2'},
        {label: '动漫改编权', value: '3'},
        {label: '电视剧改编权', value: '4'},
        {label: '周边衍生品改编权', value: '5'}
      ],
      companyOptions: [
        {label: '凯撒文化', value: '2'},
        {label: '幻文', value: '3'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'listLoading'
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
      this.$store.dispatch('IP_FETCH_DETAIL', {id: this.id})
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
          const tempIP = {
            'ip[id]': this.ruleForm.id,
            'ip[name]': this.ruleForm.name,
            'ip[company]': this.ruleForm.company,
            'ip[price]': this.ruleForm.price,
            'ip[special_conditions]': this.ruleForm.special_conditions,
            'ip[remark]': this.ruleForm.remark,
            'ip[attachment]': this.ruleForm.attachment
          }

          let tempSub = {}
          this.ruleForm.rights.forEach((column, index) => {
            tempSub[`ip_right[${index}][id]`] = column.id
            tempSub[`ip_right[${index}][ip_id]`] = column.ip_id
            tempSub[`ip_right[${index}][sub_right_id]`] = column.sub_right_id
            tempSub[`ip_right[${index}][is_exclusive_license]`] = column.is_exclusive_license
            tempSub[`ip_right[${index}][can_authorized_transfer]`] = column.can_authorized_transfer
            tempSub[`ip_right[${index}][right_begin]`] = column.right_begin
            tempSub[`ip_right[${index}][right_end]`] = column.right_end
            tempSub[`ip_right[${index}][cooperation_area]`] = column.cooperation_area
            return tempSub
          })

          const params = Object.assign({}, tempIP, tempSub)

          this.$store.dispatch('IP_EDIT', params)
            .then(res => {
              this.$confirm('文件已成功提交, 是否继续操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                this.$router.push({ name: 'ip', replace: true })
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
      const index = this.ruleForm.rights.indexOf(item)
      if (!id && index !== -1) {
        this.ruleForm.rights.splice(index, 1)
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('IP_RIGHT_DELETE', { id })
          .then(res => {
            if (index !== -1) {
              this.ruleForm.rights.splice(index, 1)
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
      this.ruleForm.rights.push({
        id: 0,
        ip_id: 0,
        sub_right_id: '',
        is_exclusive_license: '',
        can_authorized_transfer: '',
        right_begin: '',
        right_end: '',
        cooperation_area: ''
      })
      // 展开增加子项的折叠面板
      const tempName = this.ruleForm.rights.length + 2
      this.activeNames.push(tempName)
    },
    // 5.删除上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 6.上传文件预览
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
