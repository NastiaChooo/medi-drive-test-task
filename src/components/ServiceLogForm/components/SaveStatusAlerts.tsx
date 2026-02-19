import { Alert, CircularProgress } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { styles } from '@/components/ServiceLogForm/styles'

interface SaveStatusAlertsProps {
  saveStatus: 'idle' | 'saving' | 'saved'
  hasCurrentDraft: boolean
  isCurrentDraftSaved: boolean
}

export function SaveStatusAlerts({
  saveStatus,
  hasCurrentDraft,
  isCurrentDraftSaved,
}: SaveStatusAlertsProps) {
  if (saveStatus === 'saving' && hasCurrentDraft) {
    return (
      <Alert severity="info" icon={<CircularProgress size={16} />} sx={styles.alert}>
        Saving...
      </Alert>
    )
  }

  if (saveStatus === 'saved' && isCurrentDraftSaved) {
    return (
      <Alert severity="success" icon={<CheckCircleIcon />} sx={styles.alert}>
        Draft saved
      </Alert>
    )
  }

  return null
}
