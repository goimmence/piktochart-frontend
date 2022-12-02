<template>
  <div class="w-100">
    <div class="row w-100 m-0">
      <SideBar />
      <Container />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "../sideBar/SideBar.vue";
import Container from "../canvas/CanvasContainer.vue";
</script>
