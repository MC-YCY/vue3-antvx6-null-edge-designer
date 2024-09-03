<script setup lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {getTeleport} from '@antv/x6-vue-shape'
import {installMenuOptions, installRegisterNodes} from "./composition/install-register-nodes.ts";
import {installGraph, installMenu} from "./composition/install-example.ts";

//! @antv/x6-vue-shape 使用方式，在页面中使用该组件
const TeleportContainer = getTeleport();
defineComponent({
  name: 'designer',
  components: {
    TeleportContainer
  }
});


let graphRef = ref();
let menuRef = ref();
let example = ref({
  graph: null,
  menu: null,
});
let selectCell = ref({});
const exampleGraph = () => {
  example.value.graph = installGraph(graphRef.value);
}
//! 注册自定义组件 到Graph中
installRegisterNodes();
const exampleMenu = () => {
  example.value.menu = installMenu(menuRef.value, example.value.graph);
  installMenuOptions(example.value.graph, example.value.menu);
}
const graphEvents = () => {
  const graph = example.value.graph;
  //! 左侧菜单添加到画布中 更新节点的宽高等等样式这里判断
  graph.on('cell:added', ({cell}) => {
    let cellData = cell.getData();
    //! 判断是否含有 parent:true 如果是则表示父节点可用来嵌套的
    if (cellData.parent) {
      cell.size({
        width: 400,
        height: 400,
      })
      cell.setData({
        label: '',
        style: {
          borderRadius: `10px`,
          boxShadow: `0 0 10px #ccc`,
        }
      })
    } else {
      cell.size({
        width: cell.size().width,
        height: 100,
      })
    }
    selectCell.value = cell;
  })
  graph.on('cell:click', ({cell}) => {
    selectCell.value = cell;
  })
}

onMounted(() => {
  exampleGraph();
  exampleMenu();
  graphEvents();
})

const setClick = () => {
  let nodes = example.value.graph.getNodes()
  nodes.forEach(node => {
    node.setData({
      label: +new Date()
    })
  })
}
</script>

<template>
  <div class="designer">
    <div class="designer-menu" ref="menuRef"></div>
    <div class="designer-graph" ref="graphRef"></div>
    <div class="designer-form">
      <div class="designer-form-item">
        <div class="designer-form-item-label">zIndex:</div>
        <div class="designer-form-item-input">
          <input type="text" :value="selectCell.zIndex" @input="(e)=>{
            selectCell.setZIndex(e.target.value)
          }"/>
        </div>
      </div>

      <div class="designer-form-item">
        <div class="designer-form-item-label">width:</div>
        <div class="designer-form-item-input">
          <input type="text" :value="selectCell?.size  && selectCell?.size()?.width" @input="(e)=>{
            selectCell.size({width: e.target.value,height: selectCell?.size()?.height})
          }"/>
        </div>
      </div>

      <div class="designer-form-item">
        <div class="designer-form-item-label">height:</div>
        <div class="designer-form-item-input">
          <input type="text" :value="selectCell?.size && selectCell?.size()?.height" @input="(e)=>{
            selectCell.size({height: e.target.value,width: selectCell?.size()?.width})
          }"/>
        </div>
      </div>

      <div class="designer-form-item">
        <div class="designer-form-item-label">label:</div>
        <div class="designer-form-item-input">
          <input type="text" :value="selectCell?.data && selectCell?.getData()?.label" @input="(e)=>{
            selectCell.setData({
              ...selectCell.getData(),
              label: e.target.value,
            })
          }"/>
        </div>
      </div>

      <div class="designer-form-item">
        <div class="designer-form-item-label">测试修改按钮:</div>
        <div class="designer-form-item-input">
          <button @click="setClick">set node</button>
        </div>
      </div>
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
  padding: 12px;
  background: #fafafa;
}

.designer-form-item {
  width: 100%;
  height: auto;
  box-sizing: border-box;
}

.designer-form-item-label {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.designer-form-item-input {
  width: 100%;
  height: 32px;
}

.designer-form-item-input input {
  width: 100%;
  height: 100%;
  outline: #5b8387;
  box-sizing: border-box;
  background: white;
  border: 1px solid #5b8387;
  border-radius: 30px;
  padding-left: 1em;
}

.designer-form-item + .designer-form-item {
  margin-top: 20px;
}

</style>
