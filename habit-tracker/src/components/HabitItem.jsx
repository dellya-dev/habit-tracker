import { Children } from 'react'
import { useHabit } from '../hooks/useHabit'

function HabitItem({ habit, children }) {
  const { dispatch } = useHabit()

  const today = new Date().toISOString().split("T")[0] 
  const isDoneToday = habit.completedDates?.includes(today) || false

  return (
    <div style={{ opacity: habit.status === "archived" ? 0.5 : 1 }}>
      <p>{habit.title}</p>
      {children}
      
      {habit.status === "archived" && (<span>📦Archived</span>)}
      
      <button
        onClick={() => 
          dispatch({
            type: "DONE TODAY",
            payload: {id: habit.id}
          })
        }
        disabled={habit.status === "archived" || isDoneToday}
      >{isDoneToday? "Done ✅" : "Done Today"}</button>

      <button
        onClick={() => {
          dispatch({
            type: "ARCHIVE HABIT",
            payload: { id: habit.id }
          })
        }}
        disabled={habit.status === "archived"}
      >Archive</button>
    </div>
  )
}

export default HabitItem