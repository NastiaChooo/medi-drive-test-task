import { ServiceType } from '@/types/serviceLog'

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.PLANNED]: 'Planned',
  [ServiceType.UNPLANNED]: 'Unplanned',
  [ServiceType.EMERGENCY]: 'Emergency',
}

export const SERVICE_TYPE_COLORS: Record<ServiceType, 'success' | 'warning' | 'error'> = {
  [ServiceType.PLANNED]: 'success',
  [ServiceType.UNPLANNED]: 'warning',
  [ServiceType.EMERGENCY]: 'error',
}
