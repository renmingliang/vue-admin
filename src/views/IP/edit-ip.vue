<template>
  <ip-form :is-edit="status" :id="id"></ip-form>
</template>

<script>
import IpForm from './components/IpForm'
export default {
  name: 'edit-ip',
  data() {
    return {
      status: true,
      id: this.$route.params.id
    }
  },
  components: {
    IpForm
  }
}
</script>
