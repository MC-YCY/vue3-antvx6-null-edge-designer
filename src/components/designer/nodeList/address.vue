<script setup lang="ts">
import nodeBase from './tool/node-base.ts';

const {Graph, Node, data, selectedToClassName} = nodeBase();
</script>

<template>
  <div class="node-list-address" :class="selectedToClassName">
    <div class="node-list-component-content" :style="data?.styles">
      {{ data.label }}
    </div>
  </div>
</template>
<style scoped src="./styles/default.css"></style>

<style scoped>
.node-list-address {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.node-list-component-content {
  background: #3fa579;
  width: 100%;
  height: 100%;
  color: #333;
  font-size: 14px;
}
</style>
