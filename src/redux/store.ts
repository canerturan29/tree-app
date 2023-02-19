import { configureStore } from "@reduxjs/toolkit";
import { treeSlice } from "./treeSlice";


export const store=configureStore(
    {
        reducer:{
            tree:treeSlice.reducer
        }
    }
)

export type RootState=ReturnType<typeof store.getState>