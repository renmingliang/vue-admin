<template>
  <project-form :is-edit="status" :id="id"></project-form>
</template>

<script>
import ProjectForm from './components/ProjectForm'
export default {
  name: 'edit-project',
  data() {
    return {
      status: true,
      id: this.$route.params.id
    }
  },
  components: {
    ProjectForm
  }
}
</script>
