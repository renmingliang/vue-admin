<template>
  <ip-form :is-edit="status"></ip-form>
</template>

<script>
import IpForm from './components/IpForm'
export default {
  name: 'create-ip',
  data() {
    return {
      status: false
    }
  },
  components: {
    IpForm
  }
}
</script>
