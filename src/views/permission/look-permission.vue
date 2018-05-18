<template>
  <permission-form :is-look="status" :id="id"></permission-form>
</template>

<script>
import PermissionForm from './components/PermissionForm'
export default {
  name: 'look-permission',
  data() {
    return {
      status: true,
      id: this.$route.params.id
    }
  },
  components: {
    PermissionForm
  }
}
</script>
