import { NodeItem } from "../types";

export function getChildrenNodeList(nodeList: NodeItem[]) {
    const result: string[] = []
    return function innerFunc(nodeId: string) {
        const parentNode = nodeList.find(({ id }) => id == nodeId)
        result.push(nodeId)

        parentNode?.children.forEach(item => innerFunc(item))
        return result
    }

}