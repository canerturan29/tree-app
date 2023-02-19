import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeNode } from '../redux/treeSlice';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function CardMenu() {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch=useDispatch()
    const open = Boolean(anchorEl);

  const handleAction = (option: string) => {
    setAnchorEl(null);

    switch (option) {
      case "Add Node":
        dispatch(
          createChildren({
            parentId: node.nodeId,
          })
        );
        break;

      case "Remove":
        dispatch(
          removeNode({
            nodeId: node.nodeId,
          })
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
