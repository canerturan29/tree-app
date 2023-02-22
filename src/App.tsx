import React from 'react';
import { Button } from "@mui/material";

import TreeView from './components/TreeView';
import { useDispatch } from 'react-redux';
import { createNewNode } from './redux/treeSlice';


function App() {
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Button onClick={() => dispatch(createNewNode({root:true}))}>Add new tree</Button>
      <TreeView />
    </div>
  );
}

export default App;
