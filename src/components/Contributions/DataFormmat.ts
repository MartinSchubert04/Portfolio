export interface ContributionDay {
  date: string
  contributionCount: number
  color: string
  level: number // El nivel de intensidad (0 a 4)
  x: number
  y: number
}

const RECT_SIZE = 14
const INITIAL_Y_OFFSET = 22

// eslint-disable-next-line
export function prepareContributionData(weeks: any[]): ContributionDay[] {
  const allDays: ContributionDay[] = []

  weeks.forEach((week, weekIndex) => {
    // eslint-disable-next-line
    week.contributionDays.forEach((day: any, dayIndex: any) => {
      const yPosition = dayIndex * RECT_SIZE + INITIAL_Y_OFFSET

      const xPosition = weekIndex * RECT_SIZE

      let level: number
      const count = day.contributionCount

      if (count === 0) {
        level = 0
      } else if (count >= 1 && count <= 5) {
        level = 1
      } else if (count >= 6 && count <= 12) {
        level = 2
      } else if (count >= 13 && count <= 25) {
        level = 3
      } else {
        // count > 25
        level = 4
      }
      // NOTA: Los rangos exactos de contribución para los niveles pueden variar ligeramente o ser relativos
      // a la actividad máxima del usuario, pero esta es una buena aproximación por defecto.

      allDays.push({
        date: day.date,
        contributionCount: count,
        color: day.color,
        level: level,
        x: xPosition,
        y: yPosition,
      })
    })
  })

  return allDays
}
