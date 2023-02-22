import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createNewNode, removeNode } from '../redux/treeSlice';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from"@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NodeItem } from '../types';


const options = ["Add Node", "Remove", "Request Point", "Request History"];
const ITEM_HEIGHT = 48;
export default function CardMenu({ node }: { node: NodeItem }) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch()



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

      default:
        break;
    }
  }
  return (
    <div>
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
      </Menu></div>
  )
}
