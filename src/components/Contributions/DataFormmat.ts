const RECT_SIZE = 14
const INITIAL_Y_OFFSET = 22

export function prepareContributionDataFlat(days) {
  const parsed = days.map((d) => ({
    ...d,
    dateObj: new Date(d.date),
  }))

  // Ordenar por fecha ascendente
  parsed.sort((a, b) => a.dateObj - b.dateObj)

  const firstDay = parsed[0].dateObj

  // GitHub: semanas empiezan el domingo (getDay() === 0)
  // si querés lunes, lo ajusto
  const firstWeekStart = new Date(firstDay)
  firstWeekStart.setDate(firstWeekStart.getDate() - firstWeekStart.getDay())

  return parsed.map((day) => {
    const diffDays = Math.floor((day.dateObj - firstWeekStart) / (1000 * 60 * 60 * 24))

    const weekIndex = Math.floor(diffDays / 7)
    const dayIndex = day.dateObj.getDay() // 0 = domingo

    const x = weekIndex * RECT_SIZE
    const y = dayIndex * RECT_SIZE + INITIAL_Y_OFFSET

    return {
      date: day.date,
      contributionCount: day.count,
      level: day.level,
      x,
      y,
    }
  })
}
