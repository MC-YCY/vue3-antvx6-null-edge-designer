import {computed, inject, ref} from 'vue';
export default function(){
    const Graph = inject<any>('getGraph')('getGraph');
    const Node = inject<any>('getNode')('getNode');
    const data = ref(Node.data);
    Node.on('change:data', ({current}: any) => {
        data.value = current;
    })
    const selectedToClassName = computed(()=>{
        if(data.value?.selected){
            return {
                'node-list-selected':true,
            }
        }else{
            return {}
        }
    })
    return {
        Graph,
        Node,
        data,
        selectedToClassName
    }
}
