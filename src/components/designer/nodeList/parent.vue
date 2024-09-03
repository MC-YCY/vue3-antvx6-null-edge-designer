<script setup lang="ts">
import {inject, ref} from 'vue';

const Graph = inject('getGraph')('getGraph');
const Node = inject('getNode')('getNode');
const data = ref(Node.data);
Node.on('change:data', ({current}) => {
  data.value = current;
})
</script>

<template>
<div class="parent" :style="data.style">
  {{ data.label }}
</div>
</template>

<style scoped>
.parent{
  width: 100%;
  height: 100%;
  background: white;
}
</style>
