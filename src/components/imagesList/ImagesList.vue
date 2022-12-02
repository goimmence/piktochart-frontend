<template>
  <div class="image">
    <h4>Images</h4>
    <ul class="list-unstyled">
      <li
        v-for="(imageURL, index) in images"
        :key="index"
        draggable="true"
        @dragstart="startDragCall($event)"
      >
        <img
          class="list-img"
          :id="'img-drag-' + (index + 1)"
          :src="imageURL"
          alt="image"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { startDrag } from "../../helper/helper";
import { onMounted, computed } from "vue";
import { useImagesStore } from "../../stores/images";

const store = useImagesStore();
const images = computed(() => {
  return store.images;
});
onMounted(() => {
  store.fetchImages();
});

function startDragCall(e: any) {
  const data = {
    type: "img",
    id: e.target.id,
    src: e.target.src,
  };
  startDrag(e, data);
}
</script>
