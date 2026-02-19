import type { SxProps } from '@mui/material'

export const styles: Record<string, SxProps> = {
  filtersRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 3,
  },
  filterFieldSearch: {
    flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
  },
  filterField: {
    flex: { xs: '1 1 100%', md: '1 1 calc(16.666% - 16px)' },
  },
  filterCount: {
    flex: { xs: '1 1 100%', md: '1 1 calc(16.666% - 16px)' },
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    mr: 1,
    color: 'text.secondary',
  },
  emptyState: {
    textAlign: 'center',
    py: 4,
  },
  descriptionCell: {
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}
