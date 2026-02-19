export const ServiceType = {
  PLANNED: 'planned',
  UNPLANNED: 'unplanned',
  EMERGENCY: 'emergency',
} as const

export type ServiceType = typeof ServiceType[keyof typeof ServiceType]

export const DraftSaveStatus = {
  IDLE: 'idle',
  SAVING: 'saving',
  SAVED: 'saved',
} as const

export type DraftSaveStatus = typeof DraftSaveStatus[keyof typeof DraftSaveStatus]

export interface ServiceLog {
  id: string
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number
  engineHours: number
  startDate: string
  endDate: string
  type: ServiceType
  serviceDescription: string
  createdAt: string
  updatedAt: string
}

export interface ServiceLogDraft {
  id: string
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number | null
  engineHours: number | null
  startDate: string
  endDate: string
  type: ServiceType | ''
  serviceDescription: string
  isSaved: boolean
  lastSavedAt: string | null
}

export interface ServiceLogFormData {
  providerId: string
  serviceOrder: string
  carId: string
  odometer: number | null
  engineHours: number | null
  startDate: string
  endDate: string
  type: ServiceType | ''
  serviceDescription: string
}
