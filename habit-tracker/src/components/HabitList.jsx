import { useState } from 'react'
import { useHabit } from '../hooks/useHabit'
import HabitItem from "./HabitItem"

function HabitList() {
  const { state } = useHabit()
  const [filter, setFilter] = useState("active")

  return (
    <>
      <div>
        <button 
          onClick={() => setFilter("active")}
          style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
          >
          Active
        </button>
        <button 
          onClick={() => setFilter("archived")}
          style={{ fontWeight: filter === "archived" ? "bold" : "normal" }}
          >
          Archived
        </button>
      </div>
      <div>
        {Object.values(state).length === 0 ? (
          <p>Not yet habit</p>
        ) : (
          Object.values(state)
            .filter(habit => habit.status === filter)
            .map((habit) => (
              <HabitItem key={habit.id}
                habit={habit}
              />
            )))}
      </div>
    </>
  )
}


export default HabitList