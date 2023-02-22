import {
  Card,
  CardContent,
  CardHeader, Input, TextField
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from 'react-redux';
import { getNodeSelector, selectNodeList } from '../redux/selectors';
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
      <Card>
        <CardHeader

          title={
            <Input
              placeholder="Name"
              value={node?.name}
              onChange={(e: any) => dispatch(updateNode({ id, name: e.target.value }))}

              endAdornment={
                <AccountCircleIcon fontSize="large" color="primary" />
              }
            />
          }
        />
        <CardContent >


          <TextField
            type="number"
            size="small"
            label="Self Point"
            value={node?.point}
            onChange={(e: any) => dispatch(updateNode({ id, point: Number(e.target.value) }))}

          />

          <div >Total Point: {calculateTotalPoint(id)}</div>
        </CardContent>
        <CardMenu node={node as any} />
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