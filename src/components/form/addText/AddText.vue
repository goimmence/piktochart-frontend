<template>
  <div class="text">
    <h4>{{ title }}</h4>
    <input
      type="text"
      class="form-control"
      ref="text"
      v-on:change="handleChange()"
    />
    <button
      id="addText"
      class="btn btn-info btn-block mt-2"
      v-on:click="submit()"
    >
      {{ submitButtonTitle }}
    </button>
  </div>
</template>

<script>
import { canvas_Text_Tag } from "../../../config/config";
import { startDrag } from "../../../helper/helper";

export default {
  props: {
    title: {
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
      text: "",
    };
  },
  methods: {
    submit() {
      const tag = document.createElement(canvas_Text_Tag);
      tag.id = ((Date.now() / 1000) | 0) + "-text";
      tag.draggable = true;
      tag.ondragstart = function (e) {
        const data = {
          type: "text",
          id: e.target.id,
          text: e.target.innerText,
          tag: canvas_Text_Tag,
        };
        startDrag(e, data);
      };
      const text = document.createTextNode(this.text);
      tag.appendChild(text);
      const element = document.getElementById("canvas-div");
      element.appendChild(tag);

      this.$refs.text.value = "";
      this.text = "";
    },
    handleChange() {
      this.text = this.$refs.text.value;
    },
  },
};
</script>
