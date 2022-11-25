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
      const canvas = document.getElementById("canvas-div");
      const tag = document.createElement(canvas_Text_Tag);
      const text = document.createTextNode(this.text);
      const createDiv = document.createElement("div");
      const createDeleteButton = document.createElement("button");
      createDeleteButton.innerText = "X";
      createDeleteButton.className = "btn btn-danger";
      createDeleteButton.style.position = "absolute";
      createDeleteButton.style.top = "-2rem";
      createDeleteButton.style.right = "-2rem";
      createDiv.style.top = "30%";
      createDiv.style.left = "50%";
      createDiv.appendChild(createDeleteButton);
      createDiv.style.position = "absolute";
      createDiv.style.width = "fit-content";
      createDiv.style.minWidth = "150px";
      createDeleteButton.onclick = function () {
        document.getElementById(tag.id).remove();
        localStorage.setItem("canvas", canvas.innerHTML);
      };
      createDiv.id = ((Date.now() / 1000) | 0) + "-text";
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
      createDiv.onmouseover = function () {
        tag.style.opacity = 0.4;
      };
      createDiv.onmouseout = function () {
        tag.style.opacity = 1;
      };
      tag.appendChild(text);
      createDiv.appendChild(tag);
      canvas.appendChild(createDiv);
      localStorage.setItem("canvas", canvas.innerHTML);
      this.$refs.text.value = "";
      this.text = "";
    },
    handleChange() {
      this.text = this.$refs.text.value;
    },
  },
};
</script>
