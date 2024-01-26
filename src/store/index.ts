import { configureStore } from "@reduxjs/toolkit";
import { rootAppReducer } from "./reducers";

export const store = configureStore({
    reducer: rootAppReducer
});

