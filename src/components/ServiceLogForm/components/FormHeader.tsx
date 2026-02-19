import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { styles } from '@/components/ServiceLogForm/styles'

interface FormHeaderProps {
  onCreateDraft: () => void
  onUnselectDraft: () => void
  onDeleteDraft: () => void
  onClearAllDrafts: () => void
  hasCurrentDraft: boolean
  hasDrafts: boolean
}

export function FormHeader({
  onCreateDraft,
  onUnselectDraft,
  onDeleteDraft,
  onClearAllDrafts,
  hasCurrentDraft,
  hasDrafts,
}: FormHeaderProps) {
  return (
    <Box sx={styles.header}>
      <Typography variant="h5" component="h2">
        Service Log Form
      </Typography>
      <Box sx={styles.headerActions}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={onCreateDraft} size="small">
          Create Draft
        </Button>
        {hasCurrentDraft && (
          <Button variant="outlined" startIcon={<NoteAddIcon />} onClick={onUnselectDraft} size="small">
            New Log
          </Button>
        )}
        {hasCurrentDraft && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDeleteDraft}
            size="small"
          >
            Delete Draft
          </Button>
        )}
        {hasDrafts && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearIcon />}
            onClick={onClearAllDrafts}
            size="small"
          >
            Clear All Drafts
          </Button>
        )}
      </Box>
    </Box>
  )
}
