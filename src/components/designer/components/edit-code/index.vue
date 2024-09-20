<template>
  <div class="monaco-editor" ref="editor"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import {ref, onMounted, toRaw, defineExpose, defineEmits, defineProps, withDefaults, watch} from 'vue';

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

import {propsType,defaultProps} from './types.ts'
const props = withDefaults(defineProps<propsType>(),defaultProps)

watch(()=>props.code,()=>{
  // 必加toRaw
  toRaw(instance.value).setValue(props.code);
})

let editor = ref();
let instance = ref();
const emits = defineEmits(['init','change','update:code'])
const initEditor = () => {
  instance.value = monaco.editor.create(editor.value, {
    value: props.code,
    language: props.language,
    minimap:{
      enabled:false
    }
  });
  emits('init',getValue())
}
const useEditChangeEvent = () =>{
  instance.value.onKeyUp(()=>{
    emits('change',getValue())
  })
}
onMounted(()=>{
  initEditor();
  useEditChangeEvent();
})

const getValue = () =>{
  return toRaw(instance.value).getValue();
}
const resize = () =>{
  toRaw(instance.value).layout();
}

// 解决 codeEditor 输入报错的
// https://github.com/microsoft/monaco-editor/issues/2122
window.MonacoEnvironment = {
  getWorker (_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker()
    if (label === 'json') return new JsonWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'html') return new HtmlWorker()
    return new EditorWorker()
  }
}

defineExpose({
  getValue,
  resize
})
window.onresize = () =>{
  requestAnimationFrame(()=>{
    resize();
  })
}
</script>

<style scoped>
.monaco-editor{
  width: 100%;
  height: 100%;
}
</style>
