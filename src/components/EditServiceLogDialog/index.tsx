import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material'
import { useEditServiceLogForm } from '@/components/EditServiceLogDialog/hooks'
import { FormFields } from '@/components/EditServiceLogDialog/components'
import type { ServiceLog } from '@/types/serviceLog'
import { styles } from '@/components/EditServiceLogDialog/styles'

interface EditServiceLogDialogProps {
  log: ServiceLog
  open: boolean
  onClose: () => void
}

export default function EditServiceLogDialog({ log, open, onClose }: EditServiceLogDialogProps) {
  const { control, handleSubmit, formState: { errors }, onSubmit } = useEditServiceLogForm(log, open, onClose)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Service Log</DialogTitle>
        <DialogContent>
          <Box sx={styles.content}>
            <FormFields control={control} errors={errors} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
