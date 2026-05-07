function getWeeklyProgress(habit) {
  const dates = habit.completedDates || []
  const target = habit.weeklyTarget ?? 3


  const today = new Date()
  const day = today.getDay()
  const diff = (day + 6) % 7

  const startWeek = new Date(today)
  startWeek.setDate(today.getDate() - diff)
  startWeek.setHours(0, 0, 0, 0)

  const endWeek = new Date(startWeek)
  endWeek.setDate(startWeek.getDate() + 6)
  endWeek.setHours(23, 59, 59, 999)

  const thisWeek = dates.filter(date => {
    const d = new Date(date)
    return d >= startWeek && d <= endWeek
  })

  const count = thisWeek.length

  const isCompleted = count >= target

  const todayOnBreak = new Date().toISOString().split("T")[0]

  const isOnBreak = habit.breakUntil && todayOnBreak <= habit.breakUntil

  return {
    count,
    target,
    isCompleted,
    isOnBreak
  }

}

export default getWeeklyProgress