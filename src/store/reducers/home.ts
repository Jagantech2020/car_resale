import { Reducer } from "@reduxjs/toolkit";

const initialState = null
export const homeReducer: Reducer = (state=initialState, action:any) => {
    const {type, payload} = action;
    switch(action.type){
        case "SET_HOME_DETAILS": 
        return {...state, carDetails: payload}
        default:
            return state;
    }
}