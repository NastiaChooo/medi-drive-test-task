import { useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
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
} from '@/store/slices/draftsSlice'
import { createServiceLog } from '@/store/slices/serviceLogsSlice'
import { serviceLogSchema } from '@/components/ServiceLogForm/validators'
import { AUTO_SAVE_DELAY } from '@/constants/serviceLog'
import { getInitialFormData, calculateEndDate } from '@/components/ServiceLogForm/utils'
import type { ServiceLogDraft, ServiceLogFormData } from '@/types/serviceLog'

export interface UseServiceLogFormReturn {
  drafts: ServiceLogDraft[]
  currentDraftId: string | null
  saveStatus: 'idle' | 'saving' | 'saved'
  currentDraft: ServiceLogDraft | undefined
  handleCreateDraft: () => void
  handleUnselectDraft: () => void
  handleDeleteDraft: () => void
  handleClearAllDrafts: () => void
  handleLoadDraft: (draftId: string) => void
  onSubmit: (data: unknown) => void
  control: UseFormReturn<ServiceLogFormData, unknown>['control']
  handleSubmit: UseFormReturn<ServiceLogFormData, unknown>['handleSubmit']
  formState: UseFormReturn<ServiceLogFormData, unknown>['formState']
}

export function useServiceLogForm(): UseServiceLogFormReturn {
  const dispatch = useAppDispatch()
  const { drafts, currentDraftId, saveStatus, newLogFormData } = useAppSelector((state) => state.drafts)
  const currentDraft = drafts.find((d) => d.id === currentDraftId)
  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutoSaveTimeout = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
      autoSaveTimeoutRef.current = null
    }
  }, [])

  const form = useForm({
    resolver: yupResolver(serviceLogSchema),
    defaultValues: getInitialFormData(currentDraft, newLogFormData),
    mode: 'onChange',
  })

  const { watch, reset, setValue } = form
  const startDate = watch('startDate')
  const previousStartDateRef = useRef<string | null>(null)
  const prevDraftIdRef = useRef<string | null>(null)
  const skipNextWatchRef = useRef(false)

  // Auto-update endDate when startDate changes
  useEffect(() => {
    if (startDate && startDate !== previousStartDateRef.current) {
      previousStartDateRef.current = startDate
      setValue('endDate', calculateEndDate(startDate), { shouldValidate: true })
    }
  }, [startDate, setValue])

  // Persist new log form when no draft selected
  const currentDraftIdRef = useRef(currentDraftId)
  currentDraftIdRef.current = currentDraftId

  useEffect(() => {
    if (currentDraftId) return

    const newLogTimeoutRef = { current: null as ReturnType<typeof setTimeout> | null }
    const subscription = watch((data) => {
      if (currentDraftIdRef.current) return
      if (newLogTimeoutRef.current) clearTimeout(newLogTimeoutRef.current)
      newLogTimeoutRef.current = setTimeout(() => {
        if (currentDraftIdRef.current) return
        dispatch(updateNewLogFormData(data as Partial<ServiceLogFormData>))
      }, AUTO_SAVE_DELAY)
    })

    return () => {
      subscription.unsubscribe()
      if (newLogTimeoutRef.current) clearTimeout(newLogTimeoutRef.current)
    }
  }, [watch, currentDraftId, dispatch])

  // Auto-save on form changes (draft mode)
  useEffect(() => {
    if (!currentDraftId) {
      clearAutoSaveTimeout()
      dispatch(setSaveStatus('idle'))
      return
    }

    const subscription = watch((data) => {
      if (!currentDraftId) return
      if (skipNextWatchRef.current) {
        skipNextWatchRef.current = false
        return
      }
      clearAutoSaveTimeout()
      dispatch(setSaveStatus('saving'))
      autoSaveTimeoutRef.current = setTimeout(() => {
        if (!currentDraftId) return
        dispatch(updateDraft(data as Partial<ServiceLogFormData>))
        dispatch(saveDraft())
      }, AUTO_SAVE_DELAY)
    })

    return () => {
      subscription.unsubscribe()
      clearAutoSaveTimeout()
      dispatch(setSaveStatus('idle'))
    }
  }, [watch, currentDraftId, dispatch, clearAutoSaveTimeout])

  // Reset form only when switching drafts (create/load), not when auto-save updates the draft
  useEffect(() => {
    if (!currentDraftId || !currentDraft) {
      if (!currentDraftId) prevDraftIdRef.current = null
      return
    }
    if (prevDraftIdRef.current !== currentDraftId) {
      prevDraftIdRef.current = currentDraftId
      clearAutoSaveTimeout()
      skipNextWatchRef.current = true
      reset(getInitialFormData(currentDraft))
      previousStartDateRef.current = currentDraft.startDate
      dispatch(setSaveStatus(currentDraft.isSaved ? 'saved' : 'idle'))
    }
  }, [currentDraftId, currentDraft, reset, dispatch, clearAutoSaveTimeout])

  const handleCreateDraft = useCallback(() => {
    clearAutoSaveTimeout()
    dispatch(clearNewLogFormData())
    dispatch(createDraft())
    reset(getInitialFormData())
    previousStartDateRef.current = null
  }, [dispatch, reset, clearAutoSaveTimeout])

  const handleUnselectDraft = useCallback(() => {
    clearAutoSaveTimeout()
    dispatch(setCurrentDraft(null))
    dispatch(setSaveStatus('idle'))
    dispatch(clearNewLogFormData())
    prevDraftIdRef.current = null
    reset(getInitialFormData())
  }, [dispatch, reset, clearAutoSaveTimeout])

  const handleDeleteDraft = useCallback(() => {
    if (!currentDraftId) return
    clearAutoSaveTimeout()
    dispatch(deleteDraft(currentDraftId))
    dispatch(clearNewLogFormData())
    reset(getInitialFormData())
  }, [currentDraftId, dispatch, reset, clearAutoSaveTimeout])

  const handleClearAllDrafts = useCallback(() => {
    clearAutoSaveTimeout()
    dispatch(clearAllDrafts())
    dispatch(clearNewLogFormData())
    reset(getInitialFormData())
  }, [dispatch, reset, clearAutoSaveTimeout])

  const handleLoadDraft = useCallback(
    (draftId: string) => {
      dispatch(loadDraft(draftId))
    },
    [dispatch]
  )

  const onSubmit = useCallback(
    (data: unknown) => {
      clearAutoSaveTimeout()
      const formData = data as ServiceLogFormData
      dispatch(createServiceLog(formData))
      if (currentDraftId) {
        dispatch(deleteDraft(currentDraftId))
      }
      dispatch(clearNewLogFormData())
      reset(getInitialFormData())
      dispatch(setCurrentDraft(null))
      dispatch(setSaveStatus('idle'))
    },
    [dispatch, currentDraftId, reset, clearAutoSaveTimeout]
  )

  return {
    control: form.control as UseServiceLogFormReturn['control'],
    handleSubmit: form.handleSubmit as UseServiceLogFormReturn['handleSubmit'],
    formState: form.formState as UseServiceLogFormReturn['formState'],
    drafts,
    currentDraftId,
    saveStatus,
    currentDraft,
    handleCreateDraft,
    handleUnselectDraft,
    handleDeleteDraft,
    handleClearAllDrafts,
    handleLoadDraft,
    onSubmit,
  }
}
