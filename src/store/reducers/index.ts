import { carsDetailReducer } from "./carsDetail";
import { homeReducer } from "./home";

export const rootAppReducer =  {
    homeReducerReducer: homeReducer,
    carDetailsReducer: carsDetailReducer
}