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

export const installMenuOptions = (graph, menu) => {
    const r1 = graph.createNode({
        shape: 'custom-address',
        data: {
            label: '自定义vue组件'
        }
    })
    const r2 = graph.createNode({
        shape: 'custom-box',
        data: {
            label:'自定义的vue组件2'
        }
    })
    const r3 = graph.createNode({
        shape: 'custom-parent',
        data: {
            parent:true,
            label:'父节点容器'
        }
    })
    menu.load([r1, r2, r3], 'group1')
}
