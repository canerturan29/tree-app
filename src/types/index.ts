export interface TreeState {
    nodeList: NodeItem[]
    requestList: IRequest[]

}

export const initialState: TreeState = {
    nodeList: [],
    requestList: []
}

export interface NodeItem {
    id: string
    name: string
    point: number | null
    treeId: string
    children: string[]
    root: boolean
}

export function NodeFactory(node: Partial<NodeItem> = {}): NodeItem {
    return {
        id: node?.id || crypto.randomUUID(),
        name: node?.name || "",
        point: node?.point || null,
        treeId: node?.treeId || crypto.randomUUID(),
        children: node?.children || [],
        root: node?.root || false

    }
}
export interface IRequest {
    reqId: string
    sender: string
    senderId: string
    receiver: string
    receiverId: string
    amount: number | null
    result: string
    date: Date
}
export function RequestFactory(request: IRequest): IRequest {
    return {
        reqId: crypto.randomUUID(),
        sender: request.sender || "",
        senderId: request.senderId,
        receiver: request.receiver || "",
        receiverId: request.receiverId,
        amount: request.amount || null,
        result: request.result || "",
        date: request.date || new Date()

    }
}