import type { SxProps } from '@mui/material'

export const styles: Record<string, SxProps> = {
  content: {
    pt: 2,
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
}
