import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { answeringRequest, createNewNode, createRequest, removeNode, updateNode } from '../redux/treeSlice';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NodeItem } from '../types';
import { haveRequest, selectNodeList, selectRequestList } from '../redux/selectors';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const options = ["Add Node", "Remove", "Request Point", "Request History"];
const ITEM_HEIGHT = 48;

export default function CardMenu({ node }: { node: NodeItem }) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch()

  const [showRequest, setShowRequest] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const open = Boolean(anchorEl);

  const handleAction = (option: string) => {
    setAnchorEl(null);

    switch (option) {
      case "Add Node":
        dispatch(
          createNewNode({
            parentId: node.id,
          })
        );
        break;

      case "Remove":
        dispatch(
          removeNode(node.id)
        );
        break;
      case "Request Point":
        setShowRequest(true)
        break;

      case "Request History":
        setShowHistory(true)
        break;

      default:
        break;
    }
  }
  const nodeList = useSelector(selectNodeList)

  const isRequest = useSelector(haveRequest(node))

  const [requestValue, setRequestValue] = useState(0)
  function createData(
    reqId: string,
    name: string,
    point: number | null
  ) {
    return { reqId, name, point };
  }

  const rows = nodeList.filter(item => item.point !== null && item.point > 0 && item.name !== "" && item.id !== node.id).map(item => createData(item.id, item.name, item.point))



  const request = (
    <div>
      <Button onClick={() => setShowRequest(false)}>Close</Button>
      <TableContainer component={Paper} >
        <Table aria-label="simple table" className='requestTable'>
          <TableHead>
            <TableRow>
              <TableCell>Nodes</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.point}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    size="small"
                    onChange={(e: any) => setRequestValue(e.target.value)}

                  />
                  <button onClick={() => {
                    if (row.point !== null && requestValue > row.point) { return alert("Please submit a valid request!") }
                    dispatch(createRequest({ reqId: crypto.randomUUID(), sender: node.name, senderId: node.id, receiver: row.name, receiverId: row.reqId, amount: requestValue, result: "waiting", date: new Date() }))
                    setShowRequest(false)
                  }}
                  >
                    Request
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>)

  const requestList = useSelector(selectRequestList)

  const requestRow = requestList.filter(item => item.receiver === node.name && item.result === "waiting").map(item => createData(item.reqId, item.sender, item.amount))

  const [answerTable, setAnswerTable] = useState(false)

  const answerRequest = (
    <div>
      <Button onClick={() => setAnswerTable(false)}>Close</Button>
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nodes</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestRow.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.point}</TableCell>
                <TableCell align="right">
                  <button onClick={() => {
                    let reqId = row.reqId
                    dispatch(answeringRequest({ reqId, result: "accepted" }))

                    const sender = nodeList.find(item => row.name === item.name)

                    if (node.point !== null && row.point !== null && node.point >= row.point && sender !== undefined && sender.point !== null) {
                      dispatch(updateNode({ id: sender.id, point: Number(Number(sender.point) + Number(row.point)) }))
                      dispatch(updateNode({ id: node.id, point: Number(Number(node.point) - Number(row.point)) }))
                    }
                    setAnswerTable(false)
                  }}
                  >
                    <CheckIcon />
                  </button>
                  <button onClick={() => {
                    let reqId = row.reqId
                    dispatch(answeringRequest({ reqId, result: "rejected" }))
                    setAnswerTable(false)
                  }}
                  >
                    <ClearIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )



  function createHistoryData(
    sender: string,
    point: number | null,
    result: string,
  ) {
    return { sender, point, result };
  }

  const historyRow = requestList.filter(item => item.result !== "waiting" && item.receiver === node.name).map(item => createHistoryData(item.sender, item.amount, item.result))

  const history = (
    <div>
      <Button onClick={() => setShowHistory(false)}>Close</Button>
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nodes</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyRow.map((row) => (
              <TableRow
                key={row.sender}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sender}
                </TableCell>
                <TableCell align="right">{row.point}</TableCell>
                <TableCell align="right">{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
  return (
    <div>
      {isRequest && <InfoIcon color='warning' />}
      <IconButton
        aria-label="card-menu"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="card-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleAction}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, i) => (
          <MenuItem key={option} value={i} onClick={() => handleAction(option)}>
            {option}
          </MenuItem>
        ))}
        {isRequest && <MenuItem onClick={() => {
          setAnswerTable(true)
          setAnchorEl(null)
        }}>Answer Requests</MenuItem>}
      </Menu>
      {showRequest && request}
      {answerTable && answerRequest}
      {showHistory && history}
    </div>
  )
}
