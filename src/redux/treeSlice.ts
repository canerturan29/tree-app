import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getChildrenNodeList } from "../helpers"
import { initialState, IRequest, NodeFactory, NodeItem, RequestFactory } from "../types"


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
        }, createRequest: (state, { payload }: PayloadAction<IRequest>) => {
            const request = RequestFactory(payload)
            state.requestList.push(request)
        },
        answeringRequest: (state, { payload }: PayloadAction<Partial<IRequest>>) => {
            Object.assign(state.requestList.find(item => item.reqId === payload.reqId) || {}, payload)
        },
        refreshRequests: (state) => {
            Object.assign(state.requestList = [])
        }

    }
})
export const { createNewNode, removeNode, updateNode, createRequest, answeringRequest, refreshRequests } = treeSlice.actions