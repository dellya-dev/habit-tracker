function getWeeklyProgress(habit) {
  const dates = habit.completedDates || []
  const target = habit.weeklyTarget ?? 3

  const today = new Date()
  const day = today.getDay()
  const diff = (day + 6) % 7

  const startWeek = new Date(today)
  startWeek.setDate(today.getDate() - diff)

  const endWeek = new Date(startWeek)
  endWeek.setDate(startWeek.getDate() + 6)

  const thisWeek = dates.filter(date => {
    const d = new Date(date)
    return d >= startWeek && d <= endWeek})

  const count = thisWeek.length

  const isCompleted = count >= target

  return {
    count,
    target,
    isCompleted
  }
}

export default getWeeklyProgress