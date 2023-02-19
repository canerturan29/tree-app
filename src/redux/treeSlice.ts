import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
            state.nodeList = state.nodeList.filter(item => item.id !== payload)
        }

    }
})
export const { createNewNode, removeNode, updateNode } = treeSlice.actions