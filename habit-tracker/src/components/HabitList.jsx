import { useHabit } from '../hooks/useHabit'
import HabitItem from "./HabitItem"

function HabitList() {
  const { state } = useHabit()

  return (
    <div>
      {Object.values(state).length === 0? (
        <p>Not yet habit</p>
      ) : (
      Object.values(state)
      .filter(habit => habit.status === "active")
      .map((habit) => (
        <HabitItem key={habit.id} 
          habit={habit}
        />
      )))}
    </div>
  )
}


export default HabitList