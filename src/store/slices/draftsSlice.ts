import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ServiceLogDraft, ServiceLogFormData } from '@/types/serviceLog'
import { generateId } from '@/utils/id'
import { getToday, getTomorrow } from '@/utils/date'

interface DraftsState {
  drafts: ServiceLogDraft[]
  currentDraftId: string | null
  saveStatus: 'idle' | 'saving' | 'saved'
  newLogFormData: Partial<ServiceLogFormData> | null
}

const initialState: DraftsState = {
  drafts: [],
  currentDraftId: null,
  saveStatus: 'idle',
  newLogFormData: null,
}

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    createDraft: (state) => {
      const newDraft: ServiceLogDraft = {
        id: generateId(),
        providerId: '',
        serviceOrder: '',
        carId: '',
        odometer: null,
        engineHours: null,
        startDate: getToday(),
        endDate: getTomorrow(),
        type: '',
        serviceDescription: '',
        isSaved: false,
        lastSavedAt: null,
      }
      state.drafts.push(newDraft)
      state.currentDraftId = newDraft.id
      state.saveStatus = 'idle'
    },
    updateDraft: (state, action: PayloadAction<Partial<ServiceLogFormData>>) => {
      if (!state.currentDraftId) return
      
      const draft = state.drafts.find((d) => d.id === state.currentDraftId)
      if (draft) {
        Object.assign(draft, action.payload)
        draft.isSaved = false
        state.saveStatus = 'saving'
      }
    },
    saveDraft: (state) => {
      if (!state.currentDraftId) return
      
      const draft = state.drafts.find((d) => d.id === state.currentDraftId)
      if (draft) {
        draft.isSaved = true
        draft.lastSavedAt = new Date().toISOString()
        state.saveStatus = 'saved'
      }
    },
    setSaveStatus: (state, action: PayloadAction<'idle' | 'saving' | 'saved'>) => {
      state.saveStatus = action.payload
    },
    setCurrentDraft: (state, action: PayloadAction<string | null>) => {
      state.currentDraftId = action.payload
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter((d) => d.id !== action.payload)
      if (state.currentDraftId === action.payload) {
        state.currentDraftId = null
        state.saveStatus = 'idle'
      }
    },
    clearAllDrafts: (state) => {
      state.drafts = []
      state.currentDraftId = null
      state.saveStatus = 'idle'
    },
    loadDraft: (state, action: PayloadAction<string>) => {
      const draft = state.drafts.find((d) => d.id === action.payload)
      if (draft) {
        state.currentDraftId = draft.id
        state.saveStatus = draft.isSaved ? 'saved' : 'idle'
      }
    },
    updateNewLogFormData: (state, action: PayloadAction<Partial<ServiceLogFormData>>) => {
      state.newLogFormData = action.payload
    },
    clearNewLogFormData: (state) => {
      state.newLogFormData = null
    },
  },
})

export const {
  createDraft,
  updateDraft,
  saveDraft,
  setSaveStatus,
  setCurrentDraft,
  deleteDraft,
  clearAllDrafts,
  loadDraft,
  updateNewLogFormData,
  clearNewLogFormData,
} = draftsSlice.actions

export default draftsSlice.reducer
