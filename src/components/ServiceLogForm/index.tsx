import { Box, Paper } from '@mui/material'
import { useServiceLogForm } from '@/components/ServiceLogForm/hooks'
import { FormHeader, DraftsList, SaveStatusAlerts, FormFields } from '@/components/ServiceLogForm/components'
import { styles } from '@/components/ServiceLogForm/styles'

export default function ServiceLogForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    drafts,
    currentDraftId,
    saveStatus,
    currentDraft,
    handleCreateDraft,
    handleUnselectDraft,
    handleDeleteDraft,
    handleClearAllDrafts,
    handleLoadDraft,
    onSubmit,
  } = useServiceLogForm()

  return (
    <Paper elevation={2} sx={styles.paper}>
      <FormHeader
        onCreateDraft={handleCreateDraft}
        onUnselectDraft={handleUnselectDraft}
        onDeleteDraft={handleDeleteDraft}
        onClearAllDrafts={handleClearAllDrafts}
        hasCurrentDraft={!!currentDraftId}
        hasDrafts={drafts.length > 0}
      />

      <DraftsList
        drafts={drafts}
        currentDraftId={currentDraftId}
        onLoadDraft={handleLoadDraft}
      />

      <SaveStatusAlerts
        saveStatus={saveStatus}
        hasCurrentDraft={!!currentDraftId}
        isCurrentDraftSaved={!!currentDraft?.isSaved}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.form}>
          <FormFields control={control} errors={errors} />
        </Box>
      </form>
    </Paper>
  )
}
