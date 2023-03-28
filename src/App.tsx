import React from 'react';
import { Button } from "@mui/material";
import "./App.scss"
import TreeView from './components/TreeView';
import { useDispatch } from 'react-redux';
import { createNewNode } from './redux/treeSlice';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function App() {
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Button variant="outlined" onClick={() => dispatch(createNewNode({ root: true }))} startIcon={<AccountTreeIcon />}>Add new tree</Button>
      <TreeView />
    </div>
  );
}

export default App;
