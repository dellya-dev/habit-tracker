import HabitList from './components/HabitList';
import './App.css'
import AddHabit from './components/AddHabit';

function App() {

  return (
    <div>
      <h1>Habit Tracker</h1>
      <AddHabit />
      <HabitList />
    </div>
  )
}

export default App
