import { addDays as addDaysFns, format, isValid, parseISO } from 'date-fns'

const DATE_FORMAT = 'yyyy-MM-dd'

export const formatDate = (date: Date): string => {
  return format(date, DATE_FORMAT)
}

export const getToday = (): string => {
  return format(new Date(), DATE_FORMAT)
}

export const getTomorrow = (): string => {
  return format(addDaysFns(new Date(), 1), DATE_FORMAT)
}

export const addDays = (date: Date, days: number): string => {
  return format(addDaysFns(date, days), DATE_FORMAT)
}

export const isValidDate = (dateString: string): boolean => {
  const date = parseISO(dateString)
  return isValid(date)
}
