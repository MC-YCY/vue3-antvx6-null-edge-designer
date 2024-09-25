<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getTeleport } from '@antv/x6-vue-shape';
import { installMenuOptions, installRegisterNodes } from "./composition/install-register-nodes.ts";
import { installGraph, installMenu } from "./composition/install-example.ts";
import { Graph, Cell } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import nodeForm from './components/node-form/index.vue';

// @antv/x6-vue-shape 使用方式
const TeleportContainer = getTeleport();

defineComponent({
  name: 'designer',
  components: {
    TeleportContainer
  }
});

const graphRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

interface ExampleType {
  graph: Graph | null;
  menu: Stencil | null;
}

const example = ref<ExampleType>({
  graph: null,
  menu: null,
});

// 选中节点
const selectCell = ref<Cell | null>(null);

const exampleGraph = () => {
  if (graphRef.value) {
    example.value.graph = installGraph(graphRef.value);
  }
};

// 注册自定义组件到Graph中
installRegisterNodes();

const exampleMenu = () => {
  if (menuRef.value && example.value.graph) {
    example.value.menu = installMenu(menuRef.value, example.value.graph);
    installMenuOptions(example.value.graph, example.value.menu);
  }
};

const graphEvents = () => {
  const graph = example.value.graph;
  if (!graph) return;

  const nodeSelectedFn = (cell: Cell) => {
    if (selectCell.value && selectCell.value.setData) {
      selectCell.value.setData({ selected: false });
    }
    selectCell.value = graph.getCellById(cell.id);
    selectCell.value.setData({ selected: true });
  };

  graph.on('cell:added', ({ cell }) => {
    const cellData = cell.getData();
    if (cellData.parent) {
      cell.size({ width: 400, height: 400 });
      cell.setData({
        label: '',
        styles: {
          borderRadius: `10px`,
          boxShadow: `0 0 10px #ccc`,
        }
      });
    } else {
      cell.size({ width: cell.size().width, height: 100 });
    }
    nodeSelectedFn(cell);
  });

  graph.on('cell:mousedown', ({ cell }) => {
    nodeSelectedFn(cell);
  });
};

const defaultNodes = () => {
  if (!example.value.graph) return;

  const parent = example.value.graph.addNode({
    x: 100,
    y: 100,
    width: 400,
    height: 400,
    shape: 'custom-parent',
    data: { parent: true },
  });

  parent.addChild(example.value.graph.addNode({
    x: 110,
    y: 110,
    width: 100,
    height: 30,
    shape: 'custom-address',
    data: {
      label: '北京市-朝阳区-xx-xx',
      styles: { color: '#333' }
    }
  }));

  parent.addChild(example.value.graph.addNode({
    x: 110,
    y: 310,
    width: 100,
    height: 30,
    shape: 'custom-box',
    data: {
      label: 'defalut node',
      styles: { color: '#333' }
    }
  }));
};

onMounted(() => {
  exampleGraph();
  exampleMenu();
  graphEvents();
  defaultNodes();
});

const handleExportPng = () => {
  example.value.graph?.exportPNG();
};

const handleExportSvg = () => {
  example.value.graph?.exportSVG();
};

function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

const handleExportBase = () => {
  example.value.graph?.toPNG((a: string) => {
    console.log(a);
    const file = base64ToFile(a, 'x6.png');
    console.log(file);
  });
}
</script>

<template>
  <div class="designer">
    <div class="designer-menu" ref="menuRef"></div>
    <div class="designer-graph" ref="graphRef"></div>
    <div class="designer-form">
      <div class="designer-form-actions">
        <button @click="handleExportPng">导出PNG</button>
        <button @click="handleExportSvg">导出SVG</button>
        <button @click="handleExportBase">获取BASE64</button>
      </div>
      <nodeForm :selectCell="selectCell"></nodeForm>
    </div>
  </div>
  <TeleportContainer />
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
  width: 400px;
  height: 100%;
  max-width: 400px;
  min-width: 400px;
  padding: 12px;
  background: #fafafa;
}
.designer-form-actions button {
  border: none;
  outline: none;
  background: #1e9cef;
  margin-right: 10px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  border-radius: 6px;
}
</style>
