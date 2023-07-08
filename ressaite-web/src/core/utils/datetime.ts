export const formatDate = (date: Date | string): string => {
  const toFormatDate = typeof date === 'string' ? new Date(date) : date
  return toFormatDate.toLocaleDateString('en', { dateStyle: 'medium' })
}
