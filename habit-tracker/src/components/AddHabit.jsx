import { useState } from "react";
import { useHabit } from "../hooks/useHabit";

function AddHabit() {
  const [title, setTitle] = useState("")
  const { dispatch } = useHabit()

  const handleAdd = () => {
    if (!title.trim()) return 

    dispatch({
      type: "ADD HABIT",
      payload: {
        id: Date.now().toString(),
        title,
        completedDates: [],
        breaks: [],
        status: "active"
      }
    })
    setTitle("")
  }
 
  return (
    <div>
      <input  
        type="text" 
        placeholder="Add Habit..." 
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        />

        <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddHabit