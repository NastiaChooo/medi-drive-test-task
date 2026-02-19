import { ServiceType } from '@/types/serviceLog'

export const SERVICE_TYPES = [
  { value: ServiceType.PLANNED, label: 'Planned' },
  { value: ServiceType.UNPLANNED, label: 'Unplanned' },
  { value: ServiceType.EMERGENCY, label: 'Emergency' },
] as const

export const AUTO_SAVE_DELAY = 500 // milliseconds
