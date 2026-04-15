import { createContext, useEffect, useReducer } from "react";
import { habitReducer, initialState } from "../reducer/habitReducer";

export const HabitContext = createContext();


export function HabitProvider({ children }) {
  const [state, dispatch] = useReducer(
    habitReducer,
    initialState,
    (initial) => {
      const stored = localStorage.getItem('habits')
      if (stored) {
        return JSON.parse(stored)
      } else {
        return initial
      }
    }
  );

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(state))
  }, [state])

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
}


