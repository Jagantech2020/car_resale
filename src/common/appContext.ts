import { createContext } from "react";
import { CompanyListType } from "../@types/global";


export  const CompayListContext = createContext<CompanyListType | null>(null);