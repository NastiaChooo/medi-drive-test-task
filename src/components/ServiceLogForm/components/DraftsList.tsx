import { Box, Button, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { ServiceLogDraft } from '@/types/serviceLog'
import { styles } from '@/components/ServiceLogForm/styles'

interface DraftsListProps {
  drafts: ServiceLogDraft[]
  currentDraftId: string | null
  onLoadDraft: (draftId: string) => void
}

export function DraftsList({ drafts, currentDraftId, onLoadDraft }: DraftsListProps) {
  if (drafts.length === 0) return null

  return (
    <Box sx={styles.draftsSection}>
      <Typography variant="subtitle2" gutterBottom>
        Drafts:
      </Typography>
      <Box sx={styles.draftsList}>
        {drafts.map((draft) => (
          <Button
            key={draft.id}
            variant={draft.id === currentDraftId ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onLoadDraft(draft.id)}
            startIcon={draft.isSaved ? <CheckCircleIcon color="success" /> : null}
          >
            {draft.providerId || 'Untitled'} {draft.isSaved && '✓'}
          </Button>
        ))}
      </Box>
    </Box>
  )
}
