import { Children, useState } from 'react'
import { useHabit } from '../hooks/useHabit'

function HabitItem({ habit, children, isCompleted }) {
  const { dispatch } = useHabit()
  const [isEditing, setIsEditing] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const isDoneToday = habit.completedDates?.includes(today) || false

  const canEdit = !habit.hasEditedTarget && habit.status !== "archived"


  return (
    <div style={{ opacity: habit.status === "archived" ? 0.5 : 1 }}>
      <div>
        <p>{habit.title}</p>
        {!isEditing && (
          <p onClick={() => setIsEditing(true)}>
            {habit.weeklyTarget} x/week
          </p>
        )}
        {isEditing && (
          <div>
            {[2, 3, 4, 5, 6].map(num => (
              <button key={num}
              disabled={!canEdit}
                onClick={() => {
                  dispatch({
                    type: "UPDATE WEEKLY TARGET",
                    payload: {
                      id: habit.id,
                      weeklyTarget: num
                    }
                  })
                  setIsEditing(false)
                }}>
                {num} x/week
              </button>
            ))}
          </div>
        )}
      </div>

      {children}

      {habit.status === "archived" && (<span>📦Archived</span>)}

      <button
        onClick={() =>
          dispatch({
            type: "DONE TODAY",
            payload: { id: habit.id }
          })
        }
        disabled={habit.status === "archived" || isDoneToday || isCompleted}
      >{isDoneToday ? "Done ✅" : "Done Today"}</button>

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