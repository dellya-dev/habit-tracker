  import { createContext,  useReducer }  from "react";
 import{ habitReducer, initialState } from "../reducer/habitReducer";

 export const HabitContext = createContext();

 
 export function HabitProvider({ children }) {
   const [state, dispatch] = useReducer(habitReducer, initialState);
 
   return(
     <HabitContext.Provider value={{ state, dispatch }}>
       {children}
       </HabitContext.Provider>
   );
 }  
 

