<script setup lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {Graph} from '@antv/x6'
import {Stencil} from '@antv/x6-plugin-stencil'
import { getTeleport } from '@antv/x6-vue-shape'
const TeleportContainer = getTeleport();
import {installMenuOptions, installRegisterNodes} from "./composition/install-registerNodes.ts";
installRegisterNodes();
defineComponent({
  name: 'designer',
  components:{
    TeleportContainer
  }
});



let graphRef = ref();
let menuRef = ref();
let example = ref({
  graph: null,
  menu: null,
});
const exampleGraph = () => {
  example.value.graph = new Graph({
    container: graphRef.value,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: {
        name: 'manhattan',
        args: {
          padding: 1,
        },
      },
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
    },
    resizing: true,
    rotating: true,
    selecting: {
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
  });
}
const exampleMenu = () => {
  const stencil = new Stencil({
    search:true,
    target: example.value.graph,
    title:'自定义的菜单以及节点',
    stencilGraphWidth:260,
    stencilGraphPadding:0,
    layoutOptions:{
      columns:1,
      dx:0,
      dy:0,
      columnWidth:'compact',
      rowHeight:'compact'
    },
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
    ],
  })
  example.value.menu = stencil;
  menuRef.value.appendChild(stencil.container)

  installMenuOptions(example);
}
onMounted(() => {
  exampleGraph();
  exampleMenu();
})

const setClick = () =>{
  let nodes = example.value.graph.getNodes()
  nodes.forEach(node => {
    node.setData({
      label:+new Date()
    })
  })
}
</script>

<template>
  <div class="designer">
    <div class="designer-menu" ref="menuRef"></div>
    <div class="designer-graph" ref="graphRef"></div>
    <div class="designer-form">
      <button @click="setClick">set node</button>
    </div>
  </div>
  <TeleportContainer/>
</template>

<style scoped>
.designer {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 20px;
}

.designer-menu {
  width: 260px;
  height: 100%;
  min-width: 260px;
  max-width: 260px;
  background: #5b8387;
  position: relative;
}

.designer-graph {
  flex: 1;
}

.designer-form {
  width: 300px;
  height: 100%;
  max-width: 300px;
  min-width: 300px;
  background: skyblue;
}
</style>
