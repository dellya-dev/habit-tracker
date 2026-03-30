import { useContext } from "react";
import { HabitContext } from "../context/HabitContext"


export function useHabit() {
  const context = useContext(HabitContext);

  if(!context) {
    throw new Error("useHabit must be used inside HabitProvider");
  }

  return context
}