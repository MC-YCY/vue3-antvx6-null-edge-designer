<script setup lang="ts">
import {inject, ref} from 'vue';

const Graph = inject<any>('getGraph')('getGraph');
const Node = inject<any>('getNode')('getNode');
const data = ref(Node.data);
Node.on('change:data', ({current}: any) => {
  data.value = current;
})
</script>

<template>
  <div class="node-list-address" :style="data?.styles">
    {{ data.label }}
  </div>
</template>

<style scoped>
.node-list-address {
  color: green;
  font-size: 20px;
  width: 100%;
  height: 100%;
  background: skyblue;
  pointer-events: none;
}
</style>
