<template>
  <project-form :is-look="status" :id="id"></project-form>
</template>

<script>
import ProjectForm from './components/ProjectForm'
export default {
  name: 'look-project',
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
