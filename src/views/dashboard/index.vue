<template>
  <div>
    欢迎使用IP资料库
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data() {
    return {}
  },
  created() {
    // 1.获取公司主体
    this.$store.dispatch('COMPANY_FETCH_LIST')
    // 2.获取所有类别列表数据
    this.$store.dispatch('ADAPTATION_FETCH_LIST')
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
