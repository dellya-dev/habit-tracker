import { useState } from "react";
import { useHabit } from "../hooks/useHabit";
import '../App.css'

function AddHabit() {
  const [title, setTitle] = useState("")
  const [weeklyTarget, setWeeklyTarget] = useState(3)
  const { dispatch } = useHabit()

  const handleAdd = () => {
    if (!title.trim()) return 

    dispatch({
      type: "ADD HABIT",
      payload: {
        id: Date.now().toString(),
        title,
        completedDates: [],
        breakUntil: null,
        status: "active",
        weeklyTarget
      }
    })
    setTitle("")
    setWeeklyTarget(3)
  }
 
  return (
    <div className="add-habit-card">
      <input 
        className="add-input" 
        type="text" 
        placeholder="Add Habit..." 
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        />

        <select
          className="add-select"
          value={weeklyTarget}
          onChange={(e) => {
            setWeeklyTarget(Number(e.target.value))
           }}
        >
          <option value={2}>2x / week</option>
          <option value={3}>3x / week</option>
          <option value={4}>4x / week</option>
          <option value={5}>5x / week</option>
          <option value={6}>6x / week</option>
        </select>

        <button 
          className="add-button" 
          onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddHabit