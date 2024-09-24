<script setup lang="ts">
import nodeBase from './tool/node-base.ts';

const {Graph, Node, data, selectedToClassName} = nodeBase();
</script>

<template>
  <div class="node-list-parent" :class="selectedToClassName">
    <div class="node-list-component-content" :style="data?.styles">
      {{ data.label }}
    </div>
  </div>
</template>
<style scoped src="./styles/default.css"></style>
<style scoped>
.node-list-parent {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: relative;
}

.node-list-component-content {
  background: #73b923;
  width: 100%;
  height: 100%;
  color: #333;
  font-size: 14px;
}
</style>
