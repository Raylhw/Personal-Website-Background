<template>
  <div class="edit-project-container">
    <ProjectEditArea :form="form" mode="edit" />
  </div>
</template>

<script>
import ProjectEditArea from "@/components/ProjectEditArea";

export default {
  components: {
    ProjectEditArea,
  },
};
</script>

<style>
</style>