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
  <div class="node-list-address">
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
}
</style>
