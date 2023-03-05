import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getChildrenNodeList } from "../helpers"
import { initialState, NodeFactory, NodeItem } from "../types"


export const treeSlice = createSlice({
    name: "tree",
    initialState,
    reducers: {
        createNewNode: (state, { payload }: PayloadAction<Partial<NodeItem> & { parentId?: string }>) => {
            const node = NodeFactory(payload)
            state.nodeList.push(node)
            if (payload.parentId) {
                state.nodeList.find(item => item.id == payload.parentId)?.children.push(node.id)
            }
        },
        updateNode: (state, { payload }: PayloadAction<Partial<NodeItem>>) => {
            Object.assign(state.nodeList.find(item => item.id == payload.id) || {}, payload)
        },
        removeNode: (state, { payload }: PayloadAction<string>) => {
            const childrenList = getChildrenNodeList(state.nodeList)(payload)
            const parent = state.nodeList.find(item => item.children?.includes(payload))
            if (parent) parent.children = parent.children.filter(item => item !== payload)
            state.nodeList = state.nodeList.filter(item => !childrenList?.includes(item.id))
        }

    }
})
export const { createNewNode, removeNode, updateNode } = treeSlice.actions