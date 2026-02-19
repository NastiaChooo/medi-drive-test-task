import { Container, Box, Typography } from '@mui/material'
import ServiceLogForm from '@/components/ServiceLogForm'
import ServiceLogTable from '@/components/ServiceLogTable'

function App() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Service Log Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create, manage, and track service logs for your fleet
        </Typography>
      </Box>

      <ServiceLogForm />
      <ServiceLogTable />
    </Container>
  )
}

export default App
