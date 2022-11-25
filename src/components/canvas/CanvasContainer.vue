<template>
  <div class="mx-auto">
    <div class="canvas col-9 mt-3" id="canvas-container">
      <div
        class="block mt-3"
        id="canvas-div"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent
      ></div>
    </div>
  </div>
</template>

<style scoped>
.canvas .block {
  height: 90vh;
}
</style>

<script setup>
import { onMounted } from "vue";
import { canvas_Text_Tag } from "../../config/config";
import { startDrag } from "../../helper/helper";
onMounted(() => {
  const canvas = document.getElementById("canvas-div");
  localStorage.getItem("canvas") &&
    (canvas.innerHTML = localStorage.getItem("canvas"));
  canvas.childNodes?.forEach((child) => {
    child.draggable = true;
    child.ondragstart = function (e) {
      if (child.tagName.toLowerCase() == "img") {
        const data = {
          type: "img",
          id: child.id,
          src: child.src,
        };
        startDrag(e, data);
      } else if (child.tagName.toLowerCase() == canvas_Text_Tag) {
        const data = {
          type: "text",
          id: child.id,
          text: child.innerText,
          tag: child.tagName.toLowerCase(),
        };
        startDrag(e, data);
      }
    };
  });
});

function onDrop(evt) {
  const data = JSON.parse(evt.dataTransfer.getData("data"));
  const canvas = document.getElementById("canvas-div");

  if (data.type == "img") {
    const imgID = "canvas-" + data.id.replace("canvas-", "");

    const img = document.createElement("img");
    img.src = data.src;
    img.style.position = "absolute";
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.top = evt.offsetY - 50 + "px";
    img.style.left = evt.offsetX - 50 + "px";
    img.id = imgID;
    img.draggable = true;
    img.ondragstart = function (e) {
      const data = {
        type: "img",
        id: e.target.id,
        src: e.target.src,
      };
      startDrag(e, data);
    };

    const isImg = document.getElementById(imgID);
    isImg && canvas.removeChild(isImg);
    canvas.appendChild(img);
  } else if (data.type == "text") {
    const textID =
      data.id.split("canvas-").length < 2
        ? data.id.replace("canvas-", "")
        : "canvas-" + data.id.replace("canvas-", "");

    const tag = document.createElement(data.tag);
    const text = document.createTextNode(data.text);
    tag.appendChild(text);
    tag.style.position = "absolute";
    tag.style.top = evt.offsetY + "px";
    tag.style.left = evt.offsetX + "px";
    tag.id = textID;
    tag.draggable = true;
    tag.ondragstart = function (e) {
      const data = {
        type: "text",
        text: e.target.innerText,
        tag: canvas_Text_Tag,
        id: e.target.id,
      };
      startDrag(e, data);
    };

    const isText = document.getElementById(textID);
    isText && canvas.removeChild(isText);
    canvas.appendChild(tag);
  }

  localStorage.setItem("canvas", canvas.innerHTML);
}
</script>
