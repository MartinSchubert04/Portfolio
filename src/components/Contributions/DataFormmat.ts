const RECT_SIZE = 14
const INITIAL_Y_OFFSET = 22

// eslint-disable-next-line
export function prepareContributionDataFlat(days: any) {
  // eslint-disable-next-line
  const parsed = days.map((d: any) => ({
    ...d,
    dateObj: new Date(d.date),
  }))

  // Ordenar por fecha ascendente
  // eslint-disable-next-line
  parsed.sort((a: any, b: any) => Number(a.dateObj) - Number(b.dateObj))

  const firstDay = parsed[0].dateObj

  const firstWeekStart = new Date(firstDay)
  firstWeekStart.setDate(firstWeekStart.getDate() - firstWeekStart.getDay())

  // eslint-disable-next-line
  return parsed.map((day: any) => {
    const diffDays = Math.floor((day.dateObj.getTime() - firstWeekStart.getTime()) / (1000 * 60 * 60 * 24))
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
