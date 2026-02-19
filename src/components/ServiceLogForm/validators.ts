import * as yup from 'yup'
import { ServiceType } from '@/types/serviceLog'

export const serviceLogSchema = yup.object({
  providerId: yup.string().required('Provider ID is required'),
  serviceOrder: yup.string().required('Service order is required'),
  carId: yup.string().required('Car ID is required'),
  odometer: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'Odometer must be a positive number')
    .typeError('Odometer must be a number'),
  engineHours: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'Engine hours must be a positive number')
    .typeError('Engine hours must be a number'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function (value) {
      const { startDate } = this.parent
      if (!startDate || !value) return true
      return new Date(value) >= new Date(startDate)
    }),
  type: yup
    .string()
    .oneOf([ServiceType.PLANNED, ServiceType.UNPLANNED, ServiceType.EMERGENCY, ''], 'Invalid service type')
    .required('Service type is required')
    .test('not-empty', 'Service type is required', (value) => value !== ''),
  serviceDescription: yup.string().required('Service description is required'),
})

export type ServiceLogFormValues = yup.InferType<typeof serviceLogSchema>
