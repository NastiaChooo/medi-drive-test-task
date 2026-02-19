import type { SxProps } from '@mui/material'

export const styles: Record<string, SxProps> = {
  paper: {
    p: 3,
    mb: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  headerActions: {
    display: 'flex',
    gap: 1,
  },
  draftsSection: {
    mb: 3,
  },
  draftsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
  alert: {
    mb: 2,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
  },
  formField: {
    flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
  },
  formFieldFull: {
    width: '100%',
  },
  formActions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
  },
}
