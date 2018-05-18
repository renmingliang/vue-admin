<template>
  <project-form :is-edit="status"></project-form>
</template>

<script>
import ProjectForm from './components/ProjectForm'
export default {
  name: 'create-project',
  data() {
    return {
      status: false
    }
  },
  components: {
    ProjectForm
  }
}
</script>
