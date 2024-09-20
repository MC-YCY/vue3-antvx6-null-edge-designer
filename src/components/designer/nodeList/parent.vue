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
  <div class="parent" :style="data?.styles">
    {{ data.label }}
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
