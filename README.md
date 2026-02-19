# Service Log Management

A React application for managing service logs with draft support, auto-save, and persistent storage.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** + **SWC** (fast HMR)
- **Redux Toolkit** – state management
- **Redux Persist** – persistence across page reloads
- **MUI (Material UI)** – UI components and styling
- **React Hook Form** – form handling
- **Yup** + **@hookform/resolvers** – schema validation

## Features

### Service Log Form

- Create and manage drafts (data is saved and can be resumed)
- Auto-save on input (debounced)
- Form validation (required fields, date ranges, types)
- Start date defaults to today; end date defaults to tomorrow
- When start date changes, end date updates to the next day
- Draft status indicators: "Saving...", "Draft saved", and checkmark for saved drafts

### Service Logs Table

- Table of service logs with search and filters
- Search by provider ID, service order, car ID, or description
- Filter by date range (start date)
- Filter by service type (planned, unplanned, emergency)
- Edit logs in a dialog
- Delete logs with confirmation

### Data Persistence

- Service logs and drafts persist after page reload (localStorage via redux-persist)
- New log form (when no draft selected) auto-saves and restores on reload

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── EditServiceLogDialog/          # Edit log dialog
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   ├── components/
│   │   │   ├── FormFields.tsx
│   │   │   └── index.ts
│   │   └── hooks/
│   │       ├── useEditServiceLogForm.ts
│   │       └── index.ts
│   ├── ServiceLogForm/                # Create form with draft support
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   ├── validators.ts              # Yup schema
│   │   ├── utils.ts
│   │   ├── components/
│   │   │   ├── DraftsList.tsx
│   │   │   ├── FormFields.tsx
│   │   │   ├── FormHeader.tsx
│   │   │   ├── SaveStatusAlerts.tsx
│   │   │   └── index.ts
│   │   └── hooks/
│   │       ├── useServiceLogForm.ts
│   │       └── index.ts
│   └── ServiceLogTable/               # Logs table with search/filters
│       ├── index.tsx
│       ├── styles.ts
│       ├── constants.ts
│       ├── utils.ts
│       └── components/
│           ├── ConfirmDialog.tsx
│           └── index.ts
├── constants/
│   └── serviceLog.ts                  # SERVICE_TYPES, AUTO_SAVE_DELAY
├── store/
│   ├── index.ts                       # Store + redux-persist config
│   ├── hooks.ts                       # useAppDispatch, useAppSelector
│   └── slices/
│       ├── draftsSlice.ts             # Drafts, newLogFormData, saveStatus
│       └── serviceLogsSlice.ts         # Service logs CRUD
├── types/
│   └── serviceLog.ts                  # ServiceLog, ServiceLogDraft, etc.
├── utils/
│   ├── date.ts                       # date-fns helpers
│   └── id.ts                         # UUID generation
├── App.tsx
└── main.tsx
```

## Absolute Imports

The project uses `@/` as an alias for `src/`:

```typescript
import { store } from '@/store'
import ServiceLogForm from '@/components/ServiceLogForm'
```
