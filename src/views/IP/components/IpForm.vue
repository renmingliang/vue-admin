<template>
  <div class="box-container">
    <a ref="downloadBtn"
      :href="downloadFile.url"
      :download="downloadFile.name"
      target="_blank"
      style="display:none;"></a>
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
            <el-form-item label="买入金额" prop="price">
              <el-input :disabled="isLook" v-model="ruleForm.price" clearable></el-input>
            </el-form-item>
            <el-form-item label="特殊条件" prop="special_conditions">
              <el-input
                type="textarea"
                :disabled="isLook"
                :autosize="{ minRows: 2 }"
                placeholder="请输入内容"
                v-model="ruleForm.special_conditions">
              </el-input>
            </el-form-item>
            <el-form-item
              label="备注信息"
              prop="remark">
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

        <el-collapse-item :name="2">
          <template slot="title">
            <div>附件信息<span class="title-tips">（仅支持：JPG/PNG/PDF/Word/PPT文件格式）</span></div>
          </template>
          <div class="common-wrap">
            <el-upload
              ref="upload"
              action="/"
              list-type="picture-card"
              :accept="acceptFileType"
              :disabled="isLook"
              :auto-upload="false"
              :file-list="listFile"
              :before-upload="beforeUploadFiles"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :on-preview="handlePreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus">
                <span slot="tip" class="upload-tip">上传附件 (文件大小不得超过20M)</span>
              </i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img v-if="isImg" width="100%" :src="dialogFileUrl">
              <iframe v-else width="100%" :src="dialogFileUrl" style="min-height: 500px;" frameborder="0"></iframe>
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
              <el-select :disabled="isLook" v-model="column.sub_right_id" @change="handleNot($event, index)" placeholder="请选择">
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

            <el-form-item
              label="版权开始时间"
              :prop="'rights.' + index + '.right_begin'"
              :rules="{ trigger: 'blur', validator: validateRightBegin }">
              <el-date-picker
                :picker-options="{disabledDate: (time) => {return time.getTime() > Date.parse(column.right_end)}}"
                :disabled="isLook"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                v-model="column.right_begin"></el-date-picker>
            </el-form-item>

            <el-form-item
              label="版权结束时间"
              :prop="'rights.' + index + '.right_end'"
              :rules="{ trigger: 'blur', validator: validateRightEnd }">
              <el-date-picker
                :picker-options="{disabledDate: (time) => {return time.getTime() < Date.parse(column.right_begin)}}"
                :disabled="isLook"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                v-model="column.right_end"></el-date-picker>
            </el-form-item>

            <el-form-item
              label="版权起止备注"
              :prop="'rights.' + index + '.time_remark'"
              :rules="{ trigger: 'blur', validator: validateTimeRemark }">
              <el-input
                type="textarea"
                :disabled="isLook"
                :autosize="{ minRows: 2 }"
                placeholder="请输入版权起止备注信息，注意不得与上述版权起止时间同时录入"
                v-model="column.time_remark">
              </el-input>
            </el-form-item>

            <el-form-item
              label="版权合作区域"
              :prop="'rights.' + index + '.cooperation_area'"
              :rules="{ trigger: 'blur',validator: validate20}">
              <el-input :disabled="isLook" v-model="column.cooperation_area" clearable></el-input>
            </el-form-item>

            <div v-if="!isLook || (isEdit && $_has('ip/right-del'))" class="custom-btn" align="right">
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
import { deepClone } from '@/utils'
import { validateInput } from '@/utils/validate'
import { mapGetters } from 'vuex'

const defaultForm = {
  id: 0,
  name: '',
  company: '',
  price: '',
  special_conditions: '',
  remark: '',
  attachment: [],
  rights: [
    {
      id: 0,
      ip_id: 0,
      sub_right_id: '',
      is_exclusive_license: '',
      can_authorized_transfer: '',
      right_begin: '',
      right_end: '',
      time_remark: '',
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
    const validateIpName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入IP名称'))
      } else if (value.length > 20) {
        callback(new Error('输入内容不得超过20个字符'))
      } else {
        callback()
      }
    }
    const validateNum = (rule, value, callback) => {
      if (value && isNaN(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    const validate100 = (rule, value, callback) => {
      if (validateInput(value, 100)) {
        callback(new Error('输入内容不得超过100个字符'))
      } else {
        callback()
      }
    }
    const validate200 = (rule, value, callback) => {
      if (validateInput(value, 200)) {
        callback(new Error('输入内容不得超过200个字符'))
      } else {
        callback()
      }
    }
    return {
      downloadFile: {
        name: '',
        url: ''
      },
      acceptFileType: '.png,.jpg,.jpeg,.pdf,.doc,.docx,.ppt,.pptx',
      listLoading: false,
      uploadForm: new FormData(),
      listFile: [],
      uploadFile: [],
      activeNames: [1, 2, 3],
      isImg: true,
      dialogFileUrl: '',
      dialogVisible: false,
      postType: 'IP_ADD',
      ruleForm: Object.assign({}, defaultForm),
      rules: {
        name: [
          { required: true, trigger: 'blur', validator: validateIpName }
        ],
        company: [
          { required: true, message: '请选择IP所属主体', trigger: 'change' }
        ],
        price: [
          { trigger: 'blur', validator: validateNum }
        ],
        special_conditions: [
          { trigger: 'blur', validator: validate200 }
        ],
        remark: [
          { trigger: 'blur', validator: validate100 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'adaptationName',
      'companyName'
    ]),
    typeOptions() {
      if (this.adaptationName) {
        return this.adaptationName
      } else {
        return []
      }
    },
    companyOptions() {
      if (this.companyName) {
        return this.companyName
      } else {
        return []
      }
    },
    downloadBtn() {
      return this.$refs.downloadBtn
    }
  },
  created() {
    console.log(this.$route.meta)
    if (this.isEdit || this.isLook) {
      this.fetchData()
      this.postType = 'IP_UPDATE'
    } else {
      // 利用深拷贝对象，重新清空赋值ruleForm表单，不然会指向同一个内存地址
      this.ruleForm = deepClone(defaultForm)
      this.postType = 'IP_ADD'
    }
  },
  mounted() {
    // 控制上传框显示与否
    if (this.isLook) {
      document.querySelector('.el-upload--picture-card').style.display = 'none'
    }
  },
  destroyed() {
    document.title = '凯撒文化-IP资料库'
  },
  methods: {
    // 校验版权备注信息
    validateTimeRemark(rule, value, callback) {
      // 获取当前校验的项目索引值
      const curIndex = rule.field.match(/\d+/)[0]
      const right_begin = this.ruleForm.rights[curIndex].right_begin
      const right_end = this.ruleForm.rights[curIndex].right_end
      if (value) {
        if (right_begin || right_end) {
          callback(new Error('版权起止备注信息, 与版权起止时间只能二选其一'))
        } else if (validateInput(value, 100)) {
          callback(new Error('输入内容不得超过100个字符'))
        } else {
          callback()
        }
      } else {
        if (!right_begin && !right_end) {
          callback(new Error('版权起止备注在没有选择版权起止时间前提下，该项必须录入'))
        } else {
          callback()
        }
      }
    },
    // 校验版权开始时间
    validateRightBegin(rule, value, callback) {
      const curIndex = rule.field.match(/\d+/)[0]
      const right_end = this.ruleForm.rights[curIndex].right_end
      if (right_end && !value) {
        callback(new Error('请选择版权起始时间'))
      } else {
        callback()
      }
    },
    // 校验版权结束时间
    validateRightEnd(rule, value, callback) {
      const curIndex = rule.field.match(/\d+/)[0]
      const right_begin = this.ruleForm.rights[curIndex].right_begin
      if (right_begin && !value) {
        callback(new Error('请选择版权结束时间'))
      } else {
        callback()
      }
    },
    validate20(rule, value, callback) {
      if (validateInput(value, 20)) {
        callback(new Error('输入内容不得超过20个字符'))
      } else {
        callback()
      }
    },
    // 0.获取数据
    fetchData() {
      this.$store.dispatch('IP_FETCH_DETAIL', {id: this.id})
        .then(res => {
          document.title = res.data.name
          this.ruleForm = res.data
          this.listFile = res.data.attachment.map(item => {
            const tempIndex = item.lastIndexOf('/') + 1
            const typeIndex = item.lastIndexOf('.')
            const typeName = item.substr(typeIndex)
            return {
              name: item.substr(tempIndex),
              url: this.setTempTypeImg(typeName, item),
              downloadUrl: item
            }
          })
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
          this.$confirm('确认是否提交?', '提示', {
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.listLoading = true
            // 注意这里提交表单方式是'Content-Type': 'multipart/form-data'
            // 添加处理上传的文件数据
            this.uploadFile.forEach((item, index) => {
              // 只有未上传的文件才添加，已上传成功不添加
              if (item.raw) {
                this.uploadForm.append(`files[${index}]`, item.raw)
              }
            })

            // 处理输入表单数据
            this.uploadForm.append('ip[id]', this.ruleForm.id)
            this.uploadForm.append('ip[name]', this.ruleForm.name)
            this.uploadForm.append('ip[company]', this.ruleForm.company)
            this.uploadForm.append('ip[price]', this.ruleForm.price)
            this.uploadForm.append('ip[special_conditions]', this.ruleForm.special_conditions)
            this.uploadForm.append('ip[remark]', this.ruleForm.remark)
            this.uploadForm.append('ip[attachment]', this.ruleForm.attachment)

            this.ruleForm.rights.forEach((column, index) => {
              this.uploadForm.append(`ip_right[${index}][id]`, column.id)
              this.uploadForm.append(`ip_right[${index}][ip_id]`, column.ip_id)
              this.uploadForm.append(`ip_right[${index}][sub_right_id]`, column.sub_right_id)
              this.uploadForm.append(`ip_right[${index}][is_exclusive_license]`, column.is_exclusive_license)
              this.uploadForm.append(`ip_right[${index}][can_authorized_transfer]`, column.can_authorized_transfer)
              this.uploadForm.append(`ip_right[${index}][right_begin]`, column.right_begin)
              this.uploadForm.append(`ip_right[${index}][right_end]`, column.right_end)
              this.uploadForm.append(`ip_right[${index}][time_remark]`, column.time_remark)
              this.uploadForm.append(`ip_right[${index}][cooperation_area]`, column.cooperation_area)
            })

            // 根据postType来处理录入还是编辑
            this.$store.dispatch(this.postType, this.uploadForm)
              .then(res => {
                this.listLoading = false
                // 提交文件上传 -- 为了获取element的upload默认行为
                // this.$refs.upload.submit()
                this.$message({
                  type: 'success',
                  message: '操作成功',
                  duration: 1 * 1000,
                  onClose: () => {
                    this.$router.push({name: 'look-ip', params: {id: String(res.data)}})
                  }
                })
              })
              .catch(() => {
                this.listLoading = false
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        } else {
          return false
        }
      })
    },
    // 3.动态删除子项
    removeForm(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = item.id
        const index = this.ruleForm.rights.indexOf(item)
        // 未录入提交到后台的情况下删除，不发生请求
        if (!id && index !== -1) {
          this.ruleForm.rights.splice(index, 1)
          return false
        } else {
          // 已有id情况，发送删除请求
          this.listLoading = true
          this.$store.dispatch('IP_RIGHT_DELETE', { id })
            .then(res => {
              if (index !== -1) {
                this.ruleForm.rights.splice(index, 1)
              }
              this.listLoading = false
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              this.listLoading = false
            })
        }
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
        time_remark: '',
        cooperation_area: ''
      })
      // 展开增加子项的折叠面板
      const tempName = this.ruleForm.rights.length + 2
      this.activeNames.push(tempName)
    },
    // 5.限定录入改编权类别唯一
    handleNot(val, num) {
      const that = this
      this.ruleForm.rights.forEach((item, index) => {
        if (num !== index && item.sub_right_id === val) {
          let typeIndex = index + 1
          this.$message({
            message: `该项已存在改编权类别${typeIndex < 10 ? '0' + typeIndex : typeIndex}，请勿重复选择`,
            type: 'warning',
            onClose: function () {
              that.ruleForm.rights[num].sub_right_id = ''
            }
          })
        }
      })
    },
    // 6.阻止默认上传至action地址
    beforeUploadFiles(file) {
      console.log(file)
      return false
    },
    // 7.添加文件对象至formData
    handleChange(file, fileList) {
      // console.log(file, fileList)
      // 限定上传文件大小与类型
      const isBigFile = file.size / 1024 / 1024 < 20
      const typeIndex = file.name.lastIndexOf('.')
      const typeName = file.name.substr(typeIndex)
      const isTypeOk = this.acceptFileType.indexOf(typeName) !== -1
      if (!isTypeOk) {
        this.$message.error(`上传文件类型错误，只接受以下类型${this.acceptFileType}`)
        fileList = fileList.splice(fileList.length - 1, 1)
        return false
      }
      if (!isBigFile) {
        this.$message.error('上传文件大小不能超过 20MB!')
        fileList = fileList.splice(fileList.length - 1, 1)
        return false
      }
      // 处理非文件类型的预览图
      this.$nextTick(() => {
        let imgs = document.querySelectorAll('.el-upload-list__item-thumbnail')
        imgs[fileList.length - 1].src = this.setTempTypeImg(typeName, imgs[fileList.length - 1].src)
      })
      // 更新上传文件数据列表
      this.uploadFile = fileList
    },
    // 8.删除前询问
    beforeRemove(file, fileList) {
      // console.log(file, fileList)
      return this.$confirm(`确定移除${file.name}？`)
    },
    // 8.确认删除上传文件
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      // 处理非图片文件类型的预览图
      this.$nextTick(() => {
        let imgs = document.querySelectorAll('.el-upload-list__item-thumbnail')
        for (let index = 0; index < fileList.length; index++) {
          const typeIndex = fileList[index].name.lastIndexOf('.')
          const typeName = fileList[index].name.substr(typeIndex)
          imgs[index].src = this.setTempTypeImg(typeName, imgs[index].src)
        }
      })
      // 删除与其对应的文件，传递后台
      this.ruleForm.attachment = this.ruleForm.attachment.filter(item => {
        if (item === file.url || item === file.downloadUrl) {
          return false
        } else {
          return true
        }
      })
      // 更新上传文件数据列表
      this.uploadFile = fileList
    },
    // 9.上传文件下载
    handlePreview(file) {
      console.log(file)
      if (file.status === 'success') {
        const downLoadUrl = location.origin ? location.origin + file.downloadUrl : file.downloadUrl
        this.downloadFile = {
          name: file.name,
          url: downLoadUrl
        }
        setTimeout(() => {
          this.downloadBtn.click()
        }, 200)
      } else {
        this.isImg = file.raw.type.indexOf('image') !== -1
        const isPDF = file.raw.type === 'application/pdf'
        this.dialogFileUrl = file.url
        if (this.isImg || isPDF) {
          this.dialogVisible = true
        }
      }
    },
    // 10.处理绑定非图片类型的预览图
    setTempTypeImg(typeName, defaultSrc) {
      if (typeName === '.pdf') {
        return require('../../../assets/images/PDF.png')
      } else if (typeName === '.ppt' || typeName === '.pptx') {
        return require('../../../assets/images/ppt.png')
      } else if (typeName === '.doc' || typeName === '.docx') {
        return require('../../../assets/images/Word.png')
      } else {
        return defaultSrc
      }
    }
  }
}
</script>

<style lang="scss">
.common-wrap{
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    height: 83%;
  }
  .el-upload-list--picture-card .el-upload-list__item-name{
    display: block;
    margin-right: 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-container{
  .title-tips{
    font-size: 14px;
  }
  .upload-tip{
    position: absolute;
    left: 0;
    top: 100px;
    font-size: 14px;
  }
}
</style>
