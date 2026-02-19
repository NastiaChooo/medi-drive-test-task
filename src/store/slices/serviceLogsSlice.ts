import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ServiceLog, ServiceLogFormData } from '@/types/serviceLog'
import { generateId } from '@/utils/id'

interface ServiceLogsState {
  logs: ServiceLog[]
}

const initialState: ServiceLogsState = {
  logs: [],
}

const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    createServiceLog: (state, action: PayloadAction<ServiceLogFormData>) => {
      const now = new Date().toISOString()
      const newLog: ServiceLog = {
        id: generateId(),
        ...action.payload,
        odometer: action.payload.odometer ?? 0,
        engineHours: action.payload.engineHours ?? 0,
        type: action.payload.type as any,
        createdAt: now,
        updatedAt: now,
      }
      state.logs.push(newLog)
    },
    updateServiceLog: (state, action: PayloadAction<{ id: string; data: Partial<ServiceLogFormData> }>) => {
      const log = state.logs.find((l) => l.id === action.payload.id)
      if (log) {
        Object.assign(log, action.payload.data, {
          updatedAt: new Date().toISOString(),
        })
      }
    },
    deleteServiceLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((l) => l.id !== action.payload)
    },
  },
})

export const { createServiceLog, updateServiceLog, deleteServiceLog } = serviceLogsSlice.actions

export default serviceLogsSlice.reducer
