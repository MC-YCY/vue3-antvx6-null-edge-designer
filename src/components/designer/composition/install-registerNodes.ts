import address from "../nodeList/address.vue";
import box from "../nodeList/box.vue";
import {register} from '@antv/x6-vue-shape'
import {defineComponent} from "vue";
// #region 初始化图形
export const installRegisterNodes = () => {
    register({
        shape: 'custom-address',
        width: 260,
        height: 100,
        component: address,
    })
    register({
        shape: 'custom-box',
        width: 260,
        height: 100,
        component: box,
    })
}

export const installMenuOptions = (example) => {
    const r1 = example.value.graph.createNode({
        shape: 'custom-address',
        data:{
            label:'自定义vue组件'
        }
    })
    const r2 = example.value.graph.createNode({
        shape: 'custom-box',
        data:{

        }
    })
    example.value.menu.load([r1,r2], 'group1')
}
