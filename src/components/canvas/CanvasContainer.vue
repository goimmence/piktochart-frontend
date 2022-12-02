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

<script setup lang="ts">
import { onMounted } from "vue";
import { canvas_Text_Tag } from "../../config/config";
import { startDrag } from "../../helper/helper";

let tempImgId: string = "";
onMounted(() => {
  const canvas: any = document.getElementById("canvas-div");
  localStorage.getItem("canvas") &&
    (canvas.innerHTML = localStorage.getItem("canvas"));
  canvas.childNodes?.forEach((child: HTMLElement) => {
    const buttonElement: any = document
      ?.getElementById(child.id)
      ?.getElementsByTagName("button")?.[0];

    const imgElement: any = document
      ?.getElementById(child.id)
      ?.getElementsByTagName("img")?.[0];

    const textElement: any = document
      ?.getElementById(child.id)
      ?.getElementsByTagName(canvas_Text_Tag)?.[0];

    if (imgElement) {
      imgElement.ondragstart = function (e: any) {
        const data = {
          type: "img",
          id: child.id,
          src: imgElement.src,
        };
        startDrag(e, data);
      };
      imgElement.onmouseover = function () {
        imgElement.style.opacity = 0.4;
      };
      imgElement.onmouseout = function () {
        imgElement.style.opacity = 1;
      };
      buttonElement.onclick = function () {
        const childElementId: any = document.getElementById(child.id);
        childElementId.remove();
        localStorage.setItem("canvas", canvas.innerHTML);
      };
    } else if (textElement) {
      const textElementDiv: any = document.getElementById(child.id);
      textElementDiv.ondragstart = function (e: any) {
        const data = {
          type: "text",
          id: child.id,
          text: textElementDiv.innerText.replace("X\n", ""),
          tag: canvas_Text_Tag,
        };
        startDrag(e, data);
      };
      textElementDiv.onmouseover = function () {
        textElementDiv.style.opacity = 0.4;
      };
      textElementDiv.onmouseout = function () {
        textElementDiv.style.opacity = 1;
      };
      buttonElement.onclick = function () {
        const childElementId: any = document.getElementById(child.id);
        childElementId.remove();
        localStorage.setItem("canvas", canvas.innerHTML);
      };
    }
  });
});

function onDrop(evt: any) {
  const getData: any = evt.dataTransfer.getData("data");
  const data: any = getData && JSON.parse(getData);
  const canvas: any = document.getElementById("canvas-div");
  const createDiv: any = document.createElement("div");
  const createDeleteButton: any = document.createElement("button");
  createDeleteButton.innerText = "X";
  createDeleteButton.className = "btn btn-danger";
  createDeleteButton.style.position = "absolute";
  createDeleteButton.style.top = "0";
  createDeleteButton.style.right = "0";
  createDiv.appendChild(createDeleteButton);
  createDiv.style.position = "absolute";
  createDiv.draggable = true;

  if (data.type == "img") {
    let imgID = "canvas-" + data.id.replace("canvas-", "");
    if (imgID === "canvas-" && tempImgId) {
      imgID = tempImgId;
    }
    createDeleteButton.onclick = function () {
      const imgElementId: any = document.getElementById(imgID);
      imgElementId.remove();
      localStorage.setItem("canvas", canvas.innerHTML);
    };
    createDiv.style.width = "150px";
    createDiv.style.top = evt.offsetY - 50 + "px";
    createDiv.style.left = evt.offsetX - 50 + "px";
    createDiv.id = imgID;
    createDiv.ondragstart = function (e: any) {
      const data = {
        type: "img",
        id: e.target.id,
        src: e.target.src,
      };
      startDrag(e, data);
      tempImgId = imgID;
    };
    createDiv.onmouseover = function () {
      img.style.opacity = 0.4;
    };
    createDiv.onmouseout = function () {
      img.style.opacity = 1;
    };

    const img: any = document.createElement("img");
    img.src = data.src;
    img.style.width = "100px";
    img.style.height = "100px";
    createDiv.appendChild(img);
    const isImg = document.getElementById(imgID);
    isImg && canvas.removeChild(isImg);
    canvas.appendChild(createDiv);
  } else if (data.type == "text") {
    const textID =
      data.id.split("canvas-").length < 2
        ? data.id.replace("canvas-", "")
        : "canvas-" + data.id.replace("canvas-", "");
    createDiv.style.width = "fit-content";
    createDiv.style.top = evt.offsetY + "px";
    createDiv.style.left = evt.offsetX + "px";
    createDiv.id = textID;
    createDiv.ondragstart = function (e: any) {
      const data = {
        type: "text",
        text: e.target.innerText.replace("X\n", ""),
        tag: canvas_Text_Tag,
        id: e.target.id,
      };
      startDrag(e, data);
    };
    createDiv.onmouseover = function () {
      tag.style.opacity = 0.4;
    };
    createDiv.onmouseout = function () {
      tag.style.opacity = 1;
    };
    createDeleteButton.onclick = function () {
      const tagElementId: any = document.getElementById(textID);
      tagElementId.remove();
      localStorage.setItem("canvas", canvas.innerHTML);
    };
    createDeleteButton.style.top = "-2rem";
    createDeleteButton.style.right = "-2rem";
    const tag = document.createElement(data.tag);
    const text = document.createTextNode(data.text);
    tag.appendChild(text);
    createDiv.appendChild(tag);
    const isText = document.getElementById(textID);
    isText && canvas.removeChild(isText);
    canvas.appendChild(createDiv);
  }

  localStorage.setItem("canvas", canvas.innerHTML);
}
</script>
