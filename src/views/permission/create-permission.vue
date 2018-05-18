<template>
  <permission-form :is-edit="status"></permission-form>
</template>

<script>
import PermissionForm from './components/PermissionForm'
export default {
  name: 'create-permission',
  data() {
    return {
      status: false
    }
  },
  components: {
    PermissionForm
  }
}
</script>
