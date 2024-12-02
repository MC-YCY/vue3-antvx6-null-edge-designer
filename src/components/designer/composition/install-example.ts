import { Graph, Shape } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
// https://x6.antv.antgroup.com/tutorial/plugins/export
import { Export } from "@antv/x6-plugin-export";
import { Selection } from '@antv/x6-plugin-selection'
import { Transform } from '@antv/x6-plugin-transform'

export const installGraph = (dom: HTMLElement) => {
  const graph = new Graph({
    container: dom,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    panning: true,
    // 是否嵌套节点
    embedding: {
      enabled: true,
      findParent({ node }) {
        //! 用来区分是否是父节点的，通过设置 节点的data:{parent:true}得知
        const bbox = node.getBBox();
        return this.getNodes().filter((node) => {
          const data = node.getData<{ parent: boolean }>();
          if (data && data.parent) {
            const targetBBox = node.getBBox();
            return bbox.isIntersectWithRect(targetBBox);
          }
          return false;
        });
      },
    },
  });
  graph.use(new Export());
  graph.use(
    new Transform({
      resizing: true,
      rotating: true,
    }),
  )
  graph.use( new Selection({
    rubberband: false,
    showNodeSelectionBox: false,
  }))
  return graph;
};
export const installMenu = (dom: HTMLElement, target: Graph) => {
  const stencil = new Stencil({
    search: true,
    target: target,
    title: "自定义的菜单以及节点",
    stencilGraphWidth: 260,
    stencilGraphPadding: 0,
    layoutOptions: {
      columns: 1,
      dx: 0,
      dy: 3,
      columnWidth: "compact",
      rowHeight: "compact",
    },
    groups: [
      {
        title: "基础流程图",
        name: "group1",
      },
    ],
  });
  dom.appendChild(stencil.container);
  return stencil;
};
