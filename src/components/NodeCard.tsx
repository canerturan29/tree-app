import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNodeSelector, selectNodeList } from '../redux/selectors'
import { NodeItem } from '../types'
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Input,
  IconButton,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import { updateNode } from '../redux/treeSlice';
import CardMenu from './CardMenu';

export default function NodeCard({ id }: Props) {
  const node = useSelector(getNodeSelector(id))
  const dispatch = useDispatch()

  const nodeList = useSelector(selectNodeList)
  function calculateTotalPoint(_id: string) {
    const _node = nodeList.find(item => item.id == _id)
    let totalPoint = _node?.point || 0
    if (_node?.children.length) {
      totalPoint += _node.children.reduce((acc, item) => acc + calculateTotalPoint(item), 0)
    }
    return totalPoint
  }

  return (
    <li>
      <Card className={classes.rootCard}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Input
              placeholder="Name"
              value={node?.name}
              onChange={e => dispatch(updateNode({ id, name: e.target.value }))}

              endAdornment={
                <AccountCircleIcon fontSize="large" color="primary" />
              }
            />
          }
        />
        <CardContent className={classes.cardContent}>


          <TextField
            type="number"
            size="small"
            label="Self Point"
            value={node?.point}
            onChange={e => dispatch(updateNode({ id, point: Number(e.target.value) }))}

          />

          <div className={classes.cardText}>Total Point: {calculateTotalPoint(id)}</div>
        </CardContent>
        <CardMenu nodeId={node.nodeId} />
      </Card>



      <ul>
        {node?.children?.map(key => <NodeCard key={key} id={key} />)}
      </ul>


    </li>
  )
}

interface Props {
  id: string
}