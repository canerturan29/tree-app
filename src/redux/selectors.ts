import { NodeItem } from "../types";
import { RootState } from "./store";

export const selectNodeList = (state: RootState) => state.tree.nodeList

export const selectRootNodeList = (state: RootState) => state.tree.nodeList.filter(item => item.root)

export function getNodeSelector(id: string) {
    return (state: RootState) => state.tree.nodeList.find(item => item.id == id)
}

export const selectRequestList = (state: RootState) => state.tree.requestList

export function getRequestSelector(id: string) {
    return (state: RootState) => state.tree.requestList.find(item => item.reqId === id)
}

export function haveRequest(node: NodeItem) {
    return (state: RootState) => state.tree.requestList.filter(item => item.result === "waiting").find(item => item.receiver === node.name)
}