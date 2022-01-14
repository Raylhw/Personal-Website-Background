<template>
  <div class="add-project-container app-container">
    <ProjectEditArea mode="add" btnName="发布项目"/>
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