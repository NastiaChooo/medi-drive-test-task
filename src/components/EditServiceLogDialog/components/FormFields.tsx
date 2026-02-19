import { Controller } from 'react-hook-form'
import type { Control, FieldErrors } from 'react-hook-form'
import { Box, TextField, MenuItem } from '@mui/material'
import { SERVICE_TYPES } from '@/constants/serviceLog'
import type { ServiceLogFormData } from '@/types/serviceLog'
import { styles } from '@/components/EditServiceLogDialog/styles'

interface FormFieldsProps {
  control: Control<ServiceLogFormData>
  errors: FieldErrors<ServiceLogFormData>
}

export function FormFields({ control, errors }: FormFieldsProps) {
  return (
    <>
      <Box sx={styles.formRow}>
        <Box sx={styles.formField}>
          <Controller
            name="providerId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Provider ID"
                error={!!errors.providerId}
                helperText={errors.providerId?.message}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="serviceOrder"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Service Order"
                error={!!errors.serviceOrder}
                helperText={errors.serviceOrder?.message}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="carId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Car ID"
                error={!!errors.carId}
                helperText={errors.carId?.message}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Service Type"
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                {SERVICE_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="odometer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Odometer (mi)"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.odometer}
                helperText={errors.odometer?.message}
                value={field.value ?? ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : Number(e.target.value)
                  field.onChange(value)
                }}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="engineHours"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Engine Hours"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.engineHours}
                helperText={errors.engineHours?.message}
                value={field.value ?? ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : Number(e.target.value)
                  field.onChange(value)
                }}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label="Start Date"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            )}
          />
        </Box>

        <Box sx={styles.formField}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label="End Date"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Box sx={styles.formFieldFull}>
        <Controller
          name="serviceDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label="Service Description"
              error={!!errors.serviceDescription}
              helperText={errors.serviceDescription?.message}
            />
          )}
        />
      </Box>
    </>
  )
}
