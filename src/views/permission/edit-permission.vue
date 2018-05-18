<template>
  <permission-form :is-edit="status" :id="id"></permission-form>
</template>

<script>
import PermissionForm from './components/PermissionForm'
export default {
  name: 'edit-permission',
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
