import type { ServiceLogFormData } from '@/types/serviceLog'
import type { ServiceLogDraft } from '@/types/serviceLog'
import { getToday, getTomorrow, addDays } from '@/utils/date'

const getEmptyFormData = (): ServiceLogFormData => ({
  providerId: '',
  serviceOrder: '',
  carId: '',
  odometer: null,
  engineHours: null,
  startDate: getToday(),
  endDate: getTomorrow(),
  type: '',
  serviceDescription: '',
})

export const getInitialFormData = (
  draft?: ServiceLogDraft,
  newLogFormData?: Partial<ServiceLogFormData> | null
): ServiceLogFormData => {
  if (draft) {
    return {
      providerId: draft.providerId,
      serviceOrder: draft.serviceOrder,
      carId: draft.carId,
      odometer: draft.odometer,
      engineHours: draft.engineHours,
      startDate: draft.startDate,
      endDate: draft.endDate,
      type: draft.type,
      serviceDescription: draft.serviceDescription,
    }
  }

  const empty = getEmptyFormData()
  if (newLogFormData && Object.keys(newLogFormData).length > 0) {
    return { ...empty, ...newLogFormData }
  }
  return empty
}

export const calculateEndDate = (startDate: string): string => {
  if (!startDate) return getTomorrow()
  const date = new Date(startDate)
  return addDays(date, 1)
}
