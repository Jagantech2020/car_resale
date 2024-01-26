import { Reducer } from "@reduxjs/toolkit";

const initialState = {carsDetails: []}
export const carsDetailReducer: Reducer = (state=initialState, action:any) => {
    const {type, payload} = action;
    switch(action.type){
        case "SET_CARS_DETAIL": 
            return {...state, carsDetails: [...state.carsDetails, payload]}
        case "SET_CARS_DETAIL_DEFAULT":
            return {...state, carsDetails: [...payload]}
        default:
            return state;
    }
}