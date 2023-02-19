import { RootState } from "./store";

export const selectNodeList = (state: RootState) => state.tree.nodeList

export const selectRootNodeList = (state: RootState) => state.tree.nodeList.filter(item => item.root)

export function getNodeSelector(id: string) {
    return (state: RootState) => state.tree.nodeList.find(item => item.id == id)
}

