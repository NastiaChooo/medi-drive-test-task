import type { ServiceLog } from '@/types/serviceLog'

export const filterLogs = (
  logs: ServiceLog[],
  searchQuery: string,
  startDateFilter: string | null,
  endDateFilter: string | null,
  typeFilter: string | null
): ServiceLog[] => {
  return logs.filter((log) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        log.providerId.toLowerCase().includes(query) ||
        log.serviceOrder.toLowerCase().includes(query) ||
        log.carId.toLowerCase().includes(query) ||
        log.serviceDescription.toLowerCase().includes(query)

      if (!matchesSearch) return false
    }

    // Date range filter
    if (startDateFilter || endDateFilter) {
      const logStartDate = new Date(log.startDate)
      const filterStartDate = startDateFilter ? new Date(startDateFilter) : null
      const filterEndDate = endDateFilter ? new Date(endDateFilter) : null

      if (filterStartDate && logStartDate < filterStartDate) return false
      if (filterEndDate && logStartDate > filterEndDate) return false
    }

    // Type filter
    if (typeFilter && log.type !== typeFilter) return false

    return true
  })
}
