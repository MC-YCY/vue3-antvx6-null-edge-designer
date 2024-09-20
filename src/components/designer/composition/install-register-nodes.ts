import { Graph } from "@antv/x6";
import {Stencil} from "@antv/x6-plugin-stencil";
import address from "../nodeList/address.vue";
import box from "../nodeList/box.vue";
import parent from '../nodeList/parent.vue';
import {register} from '@antv/x6-vue-shape'
// #region 初始化图形
export const installRegisterNodes = () => {
    register({
        shape: 'custom-address',
        width: 260,
        height: 32,
        component: address,
    })
    register({
        shape: 'custom-box',
        width: 260,
        height: 32,
        component: box,
    })
    register({
        shape: 'custom-parent',
        width: 260,
        height: 32,
        component: parent,
    })
}

export const installMenuOptions = (graph:Graph, menu:Stencil) => {
    const r1 = graph.createNode({
        shape: 'custom-address',
        data: {
            label: 'vue-component-01',
            styles:{
                background:'#ccc',
                fontSize:'16px'
            }
        }
    })
    const r2 = graph.createNode({
        shape: 'custom-box',
        data: {
            label:'vue-component-02',
            styles:{
                background:'#ccc',
                fontSize:'16px'
            }
        }
    })
    const r3 = graph.createNode({
        shape: 'custom-parent',
        data: {
            parent:true,
            label:'vue-component-parent',
            styles:{
                background:'#ccc',
                fontSize:'16px',
                lineHeight:'32px'
            }
        }
    })
    menu.load([r1, r2, r3], 'group1')
}
