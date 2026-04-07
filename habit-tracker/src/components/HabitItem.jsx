import { useHabit } from '../hooks/useHabit'

function HabitItem({ habit }) {
  const { dispatch } = useHabit()

  const today = new Date().toISOString().split("T")[0] 
  const isDoneToday = habit.completedDates?.includes(today) || false

  return (
    <div>
      <p>{habit.title}</p>
      
      <button
        onClick={() => 
          dispatch({
            type: "DONE TODAY",
            payload: {id: habit.id}
          })
        }
        disabled={isDoneToday}
      >{isDoneToday? "Done ✅" : "Done Today"}</button>
    </div>
  )
}

export default HabitItem