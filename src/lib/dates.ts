export const todayISO = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split("T")[0]
}

export const formatISO = (date: Date) =>
  date.toISOString().split("T")[0]
