<template>
  <ip-form :is-look="status" :id="id"></ip-form>
</template>

<script>
import IpForm from './components/IpForm'
export default {
  name: 'create-ip',
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
