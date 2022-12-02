<template>
  <div className="sidebar bg-dark text-white col-3">
    <FileUpload
      formTitle="Form"
      labelName="Upload Image"
      submitButtonTitle="Upload"
    />
    <div className="assets w-100 mt-5">
      <h3>Assets</h3>
      <hr />
      <AddText title="Add Text" submitButtonTitle="Submit" />
      <ImagesList />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100vh;
}
</style>

<script setup lang="ts">
import FileUpload from "../form/fileUpload/FileUpload.vue";
import AddText from "../form/addText/AddText.vue";
import ImagesList from "../imagesList/ImagesList.vue";
</script>
