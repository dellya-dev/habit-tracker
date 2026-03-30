import { useHabit } from './hooks/useHabit'
import './App.css'

function App() {
  const {state, dispatch} = useHabit();

  const addHabit = () => {
    dispatch({
      type: "ADD HABIT",
      payload: {
        id: Date.now(),
        title: "sleep"
      }
    });
  }

  return (
    <div>
      <button onClick={addHabit}>Add Habit</button>
      {state.habits.map((habit) => (
        <div key={habit.id}>
          {habit.title}
        </div>
      ))}
    </div>
  )
}

export default App
