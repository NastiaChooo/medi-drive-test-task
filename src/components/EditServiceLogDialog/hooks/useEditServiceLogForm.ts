import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch } from '@/store/hooks'
import { updateServiceLog } from '@/store/slices/serviceLogsSlice'
import type { ServiceLog, ServiceLogFormData } from '@/types/serviceLog'
import { serviceLogSchema } from '@/components/ServiceLogForm/validators'
import { calculateEndDate } from '@/components/ServiceLogForm/utils'

export interface UseEditServiceLogFormReturn {
  control: UseFormReturn<ServiceLogFormData, unknown>['control']
  handleSubmit: UseFormReturn<ServiceLogFormData, unknown>['handleSubmit']
  formState: UseFormReturn<ServiceLogFormData, unknown>['formState']
  onSubmit: (data: unknown) => void
}

export function useEditServiceLogForm(log: ServiceLog, open: boolean, onClose: () => void): UseEditServiceLogFormReturn {
  const dispatch = useAppDispatch()

  const form = useForm({
    resolver: yupResolver(serviceLogSchema),
    defaultValues: {
      providerId: log.providerId,
      serviceOrder: log.serviceOrder,
      carId: log.carId,
      odometer: log.odometer,
      engineHours: log.engineHours,
      startDate: log.startDate,
      endDate: log.endDate,
      type: log.type,
      serviceDescription: log.serviceDescription,
    },
  })

  const { reset, watch, setValue } = form
  const startDate = watch('startDate')

  // Auto-update endDate when startDate changes
  useEffect(() => {
    if (startDate && startDate !== log.startDate) {
      const newEndDate = calculateEndDate(startDate)
      setValue('endDate', newEndDate, { shouldValidate: true })
    }
  }, [startDate, setValue, log.startDate])

  // Reset form when dialog opens with new log
  useEffect(() => {
    if (open) {
      reset({
        providerId: log.providerId,
        serviceOrder: log.serviceOrder,
        carId: log.carId,
        odometer: log.odometer,
        engineHours: log.engineHours,
        startDate: log.startDate,
        endDate: log.endDate,
        type: log.type,
        serviceDescription: log.serviceDescription,
      })
    }
  }, [open, log, reset])

  const onSubmit = (data: unknown) => {
    const formData = data as ServiceLogFormData
    dispatch(
      updateServiceLog({
        id: log.id,
        data: formData,
      })
    )
    onClose()
  }

  return {
    control: form.control as UseEditServiceLogFormReturn['control'],
    handleSubmit: form.handleSubmit as UseEditServiceLogFormReturn['handleSubmit'],
    formState: form.formState as UseEditServiceLogFormReturn['formState'],
    onSubmit,
  }
}
