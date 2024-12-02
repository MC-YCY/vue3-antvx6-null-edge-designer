<script setup lang="ts">
import editCode from '../edit-code/index.vue';
import { defineComponent, withDefaults, defineProps, ref, watch, onMounted } from "vue";
import { propsType, defaultProps } from './types.ts'

defineComponent({
  name: 'DesignerNodeForm',
});

const props = withDefaults(defineProps<propsType>(), defaultProps)
let selectCellStyles = ref(`const style = {}`);
const isUpdate = ref();
let formState = ref({
  width: 0,
  height: 0,
  zIndex: 0,
  label: undefined,
})
watch(() => props.selectCell, () => {
  selectCellStyles.value = `const style = ${JSON.stringify(props.selectCell.getData().styles, null, 2)}`;
  formState.value = {
    width: props.selectCell.size().width,
    height: props.selectCell.size().height,
    zIndex: props.selectCell.getZIndex(),
    label: props.selectCell.getData().label,
  }
  //! 样式的对象有可能一致，在code编辑组件中监听不到的，加一个时间戳做变化
  isUpdate.value = +new Date();
  props.selectCell?.on('change:size', () => {
    selectCellStyles.value = `const style = ${JSON.stringify(props.selectCell.getData().styles, null, 2)}`;
    formState.value = {
      width: props.selectCell.size().width,
      height: props.selectCell.size().height,
      zIndex: props.selectCell.getZIndex(),
      label: props.selectCell.getData().label,
    }
    //! 样式的对象有可能一致，在code编辑组件中监听不到的，加一个时间戳做变化
    isUpdate.value = +new Date();
  })
}, {
  deep: true
})
const handleChangeStyleToCode = (code) => {
  let codeString = `${code}
  return style`;
  let fn = new Function(codeString);
  let style = fn();

  try {
    props.selectCell.setData({
      ...props.selectCell.getData(),
      styles: style
    })
  } catch (e) {
  }
}

const setZIndex = (e) => {
  props.selectCell.setZIndex(formState.value.zIndex)
}
const setWidth = (e) => {
  props.selectCell.size({ width: Number(formState.value.width), height: props.selectCell?.size()?.height })
}
const setHeight = (e) => {
  props.selectCell.size({ height: Number(formState.value.height), width: props.selectCell?.size()?.width })
}
const setLabel = (e) => {
  props.selectCell.setData({
    ...props.selectCell.getData(),
    label: formState.value.label,
  })
}
</script>

<template>
  <div class="node-form">
    <div class="designer-form-item">
      <div class="designer-form-item-label">zIndex:</div>
      <div class="designer-form-item-input">
        <input type="text" v-model="formState.zIndex" @input="setZIndex" />
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">width:</div>
      <div class="designer-form-item-input">
        <input type="text" v-model="formState.width" @input="setWidth" />
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">height:</div>
      <div class="designer-form-item-input">
        <input type="text" v-model="formState.height" @input="setHeight" />
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">label:</div>
      <div class="designer-form-item-input">
        <input type="text" v-model="formState.label" @input="setLabel" />
      </div>
    </div>
    <div class="designer-form-item">
      <div class="designer-form-item-label">style:</div>
      <div class="designer-form-item-input">
        <div class="node-form-code">
          <editCode :isUpdate="isUpdate" language="javascript" v-model:code="selectCellStyles"
            @change="handleChangeStyleToCode"></editCode>
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

.designer-form-item+.designer-form-item {
  margin-top: 20px;
}
</style>
