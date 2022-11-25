<template>
  <div class="form mt-5">
    <h3>{{ formTitle }}</h3>
    <hr />
    <div class="input-group">
      <div class="custom-file">
        <input
          class="custom-file-input"
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <label class="custom-file-label" htmlFor="upload-image-input">{{
          file?.name ? file?.name : labelName
        }}</label>
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-info"
          type="button"
          id="upload-image"
          v-on:click="submitFile()"
        >
          {{ submitButtonTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useImagesStore } from "../../../stores/images";
export default {
  props: {
    formTitle: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
    submitButtonTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    submitFile() {
      const store = useImagesStore();
      let formData = new FormData();
      formData.append("upload", this.file);
      store.postImages(formData);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>
