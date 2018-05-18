<template>
  <permission-form :is-edit="status" :is-user='true' :id="id"></permission-form>
</template>

<script>
import PermissionForm from './components/PermissionForm'
export default {
  name: 'edit-user',
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
