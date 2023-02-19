import React from 'react'
import { useSelector } from 'react-redux'
import { selectRootNodeList } from '../redux/selectors'
import NodeCard from './NodeCard'

export default function TreeView() {
    const rootNodeList = useSelector(selectRootNodeList)
    return (
        <div>{rootNodeList.map(item => <NodeCard key={item.id} id={item.id} />)}</div>
    )
}
