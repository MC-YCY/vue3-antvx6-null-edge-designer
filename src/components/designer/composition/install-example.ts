import {Graph} from "@antv/x6";
import {Stencil} from "@antv/x6-plugin-stencil";
// https://x6.antv.antgroup.com/tutorial/plugins/export
import { Export } from '@antv/x6-plugin-export';

export const installGraph = (dom) => {
    const graph = new Graph({
        container: dom,
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
        // 是否嵌套节点
        embedding:{
            enabled: true,
            findParent({ node }) {
                //! 用来区分是否是父节点的，通过设置 节点的data:{parent:true}得知
                const bbox = node.getBBox()
                return this.getNodes().filter((node) => {
                    const data = node.getData<{ parent: boolean }>()
                    if (data && data.parent) {
                        const targetBBox = node.getBBox()
                        return bbox.isIntersectWithRect(targetBBox)
                    }
                    return false
                })
            },
        }
    });
    graph.use(new Export())
    return graph;
}
export const installMenu = (dom, target) => {
    const stencil = new Stencil({
        search: true,
        target: target,
        title: '自定义的菜单以及节点',
        stencilGraphWidth: 260,
        stencilGraphPadding: 0,
        layoutOptions: {
            columns: 1,
            dx: 0,
            dy: 0,
            columnWidth: 'compact',
            rowHeight: 'compact'
        },
        groups: [
            {
                title: '基础流程图',
                name: 'group1',
            },
        ],
    })
    dom.appendChild(stencil.container);
    return stencil;
}

