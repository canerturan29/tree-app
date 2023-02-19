export interface TreeState {
    nodeList: NodeItem[]

}

export const initialState: TreeState = {
    nodeList: []
}

export interface NodeItem {
    id: string
    name: string
    point: number
    treeId: string
    children: string[]
    root: boolean
}

export function NodeFactory(node: Partial<NodeItem> = {}): NodeItem {
    return {
        id: node?.id || crypto.randomUUID(),
        name: node?.name || "",
        point: node?.point || 0,
        treeId: node?.treeId || crypto.randomUUID(),
        children: node?.children || [],
        root: node?.root || false

    }
}