import { Children, useState } from 'react'
import { useHabit } from '../hooks/useHabit'
import './HabitItem.css'

function HabitItem({ habit, children, count, target, isCompleted, isOnBreak }) {
  const { dispatch } = useHabit()
  const [isEditing, setIsEditing] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const isDoneToday = habit.completedDates?.includes(today) || false

  const canEdit = habit.editCount < 3 && habit.status !== "archived"

  let statusText = "⚪ On progress"

  if(isOnBreak) {
    statusText =  "🟠 On Break"
  } else if(isCompleted) {
    statusText =  "✅ Completed"
  }
  
  return (
    <div 
      className='card-grid'
      style={{ opacity: habit.status === "archived" ? 0.5 : 1 }}>
      <div>
        <p className='habit-title'>{habit.title}</p>

        {/* {isOnBreak && (
          <span style={{ color: "orange", fontWeight: "bold" }}>
            On Break
          </span>
        )} */}

        {!isEditing && (
          <p
            className='edit-target-weekly-paragraph'
            onClick={() => {
              if (!canEdit) return
              setIsEditing(true)
              }}>
                 <span>{habit.weeklyTarget} x/week</span> 
                 {habit.editCount >= 3 && "🔒"}
                 <span>{" "}remaining edits: {3 - habit.editCount}</span>
          </p>
        )}
        {isEditing && (
          <>
          <div>
            {[2, 3, 4, 5, 6].map(num => (
              <button 
                className='edit-target-weekly-button'
                key={num}
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
          <button 
            className='cancel-edit-weekly-button'
            onClick={() => {
            setIsEditing(false)
          }}>Cancel</button>
          </>
        )}
      </div>

      {children}

      {habit.status === "archived" && (<span>📦Archived</span>)}

      <p className='status-text'>{statusText} ({count} / {target})</p>

      <button
        className='done-today-button'
        onClick={() => {
          if (isDoneToday || isCompleted || isOnBreak) return
          dispatch({
            type: "DONE TODAY",
            payload: { id: habit.id }
          })
        }}
        disabled={habit.status === "archived" || isDoneToday || 
        isCompleted || 
        isOnBreak}
      >{isDoneToday ? "Done ✅" : "Done Today"}</button>

      <button
        className='archive-button'
        onClick={() => {
          dispatch({
            type: "ARCHIVE HABIT",
            payload: { id: habit.id }
          })
        }}
        disabled={habit.status === "archived"}
      >Archive</button>

      <button
      className='break-button'
        onClick={() => {
          if (isOnBreak) return

          dispatch({
            type: "SET BREAK",
            payload: {
              id: habit.id,
              days: 7
            }
          })
        }}
        disabled={habit.status === "archived" || isOnBreak}
      >
        Break 7d
      </button>
    </div>
  )
}

export default HabitItem

