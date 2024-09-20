<script setup lang="ts">
import editCode from '../edit-code/index.vue';
import {defineComponent, withDefaults, defineProps, ref, watch,computed} from "vue";
import {propsType, defaultProps} from './types.ts'

defineComponent({
  name: 'DesignerNodeForm',
});

const props = withDefaults(defineProps<propsType>(), defaultProps)
let selectCell = ref<propsType['selectCell']>(props.selectCell);
let selectCellStyles = ref(`{}`);
watch(()=>props.selectCell,()=>{
  selectCell.value = props.selectCell;
  selectCellStyles.value = JSON.stringify(props.selectCell.getData().styles)
})
const handleChangeStyleToCode = (code) =>{
  let obj = JSON.parse(code);
  selectCell.value.setData({
    ...selectCell.value.getData(),
    styles:obj
  })
}
// 转为base64 可以再转blob等等 用来表单的提交等等
const toPNG = () => {

}
</script>

<template>
  <div class="node-form">
    <div class="designer-form-item">
      <div class="designer-form-item-label">zIndex:</div>
      <div class="designer-form-item-input">
        <input type="text" :value="selectCell.zIndex" @input="(e) => {
            selectCell.setZIndex(e.target.value)
          }"/>
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">width:</div>
      <div class="designer-form-item-input">
        <input type="text" :value="selectCell?.size && selectCell?.size()?.width" @input="(e) => {
            selectCell.size({ width: e.target.value, height: selectCell?.size()?.height })
          }"/>
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">height:</div>
      <div class="designer-form-item-input">
        <input type="text" :value="selectCell?.size && selectCell?.size()?.height" @input="(e) => {
            selectCell.size({ height: e.target.value, width: selectCell?.size()?.width })
          }"/>
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">label:</div>
      <div class="designer-form-item-input">
        <input type="text" :value="selectCell?.data && selectCell?.getData()?.label" @input="(e) => {
            selectCell.setData({
              ...selectCell.getData(),
              label: e.target.value,
            })
          }"/>
      </div>
    </div>
<!--    <div class="designer-form-item">-->
<!--      <div class="designer-form-item-label">导出图片:</div>-->
<!--      <div class="designer-form-item-input">-->
<!--        <button @click="example.graph.exportPNG()">exportPNG</button>-->
<!--        <button @click="example.graph.exportSVG()">exportSVG</button>-->
<!--        <button @click="example.graph.exportJPEG()">exportJPEG</button>-->
<!--        <button @click="toPNG">toPNG</button>-->
<!--      </div>-->
<!--    </div>-->

    <div class="designer-form-item">
      <div class="designer-form-item-label">style:</div>
      <div class="designer-form-item-input">
        <div class="node-form-code">
          <editCode language="text" :code="selectCellStyles" @change="handleChangeStyleToCode"></editCode>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.node-form-code {
  width: 100%;
  height: 300px;
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
  min-height: 32px;
}

.designer-form-item-input input {
  width: 100%;
  height: 32px;
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
