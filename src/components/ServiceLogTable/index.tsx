import { useState, useMemo } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { deleteServiceLog } from '@/store/slices/serviceLogsSlice'
import type { ServiceLog } from '@/types/serviceLog'
import { SERVICE_TYPES } from '@/constants/serviceLog'
import { filterLogs } from '@/components/ServiceLogTable/utils'
import { SERVICE_TYPE_LABELS, SERVICE_TYPE_COLORS } from '@/components/ServiceLogTable/constants'
import EditServiceLogDialog from '@/components/EditServiceLogDialog'
import { ConfirmDialog } from '@/components/ServiceLogTable/components'
import { styles } from '@/components/ServiceLogTable/styles'

export default function ServiceLogTable() {
  const dispatch = useAppDispatch()
  const { logs } = useAppSelector((state) => state.serviceLogs)
  const [searchQuery, setSearchQuery] = useState('')
  const [startDateFilter, setStartDateFilter] = useState<string>('')
  const [endDateFilter, setEndDateFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [editingLog, setEditingLog] = useState<ServiceLog | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filteredLogs = useMemo(() => {
    return filterLogs(
      logs,
      searchQuery,
      startDateFilter || null,
      endDateFilter || null,
      typeFilter || null
    )
  }, [logs, searchQuery, startDateFilter, endDateFilter, typeFilter])

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      dispatch(deleteServiceLog(deleteConfirmId))
      setDeleteConfirmId(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null)
  }

  const handleEdit = (log: ServiceLog) => {
    setEditingLog(log)
  }

  const handleCloseEditDialog = () => {
    setEditingLog(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Service Logs
        </Typography>

        <Box sx={styles.filtersRow}>
          <Box sx={styles.filterFieldSearch}>
            <TextField
              fullWidth
              label="Search"
              placeholder="Search by provider, order, car ID, or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={styles.searchIcon} />,
              }}
            />
          </Box>

          <Box sx={styles.filterField}>
            <TextField
              fullWidth
              type="date"
              label="Start Date From"
              slotProps={{ inputLabel: { shrink: true } }}
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
          </Box>

          <Box sx={styles.filterField}>
            <TextField
              fullWidth
              type="date"
              label="Start Date To"
              slotProps={{ inputLabel: { shrink: true } }}
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </Box>

          <Box sx={styles.filterField}>
            <TextField
              fullWidth
              select
              label="Service Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) => {
                  if (value === '' || !value) {
                    return 'All Types'
                  }
                  return SERVICE_TYPES.find((t) => t.value === value)?.label || String(value)
                },
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              {SERVICE_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={styles.filterCount}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredLogs.length} of {logs.length}
            </Typography>
          </Box>
        </Box>

        {filteredLogs.length === 0 ? (
          <Box sx={styles.emptyState}>
            <Typography variant="body1" color="text.secondary">
              No service logs found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Provider ID</TableCell>
                  <TableCell>Service Order</TableCell>
                  <TableCell>Car ID</TableCell>
                  <TableCell align="right">Odometer (mi)</TableCell>
                  <TableCell align="right">Engine Hours</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.providerId}</TableCell>
                    <TableCell>{log.serviceOrder}</TableCell>
                    <TableCell>{log.carId}</TableCell>
                    <TableCell align="right">{log.odometer.toLocaleString()}</TableCell>
                    <TableCell align="right">{log.engineHours.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(log.startDate)}</TableCell>
                    <TableCell>{formatDate(log.endDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={SERVICE_TYPE_LABELS[log.type]}
                        color={SERVICE_TYPE_COLORS[log.type]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={log.serviceDescription}>
                        <Typography variant="body2" sx={styles.descriptionCell}>
                          {log.serviceDescription}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(log)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(log.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {editingLog && (
        <EditServiceLogDialog log={editingLog} open={!!editingLog} onClose={handleCloseEditDialog} />
      )}

      <ConfirmDialog
        open={deleteConfirmId !== null}
        title="Delete service log"
        message="Are you sure you want to delete this service log? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="error"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
