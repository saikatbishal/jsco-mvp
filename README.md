# JSCO MVP - Project Management Dashboard

## Overview
A React + TypeScript project management dashboard built with Vite, featuring role-based access control for different user types within an organization.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **State Management**: React `useState` hooks (centralized in `App.tsx`)

---

## Architecture Flow

```
index.html → index.tsx → App.tsx → Components
```

1. **Entry Point**: `index.html` loads Tailwind and mounts the React app
2. **Bootstrap**: `index.tsx` renders `<App />` into the DOM
3. **Root Component**: `App.tsx` manages all state and routing

---

## User Roles & Access Control

| Role | Default Screen | Key Features |
|------|---------------|--------------|
| **Sales** | Sales Dashboard | Create/manage deals, company clients |
| **Project Manager** | Dashboard (Command Center) | Projects, tasks, reviews, deals |
| **Team Lead** | Team Tasks | Task management, subtasks, reviews |
| **Team Owner** | Team Owner Dashboard | Team oversight |
| **Team Member** | Team Member Dashboard | My work, task execution, reviews |

**Authentication**: Static credentials in `constants.ts` with password `123456`

---

## State Management

All state is centralized in `App.tsx`:
- `projects` - Project list
- `deals` - Deal/sales pipeline
- `tasks` - Task list
- `companiesAndAgencies` - Client organizations
- `subtasks` - Team lead subtasks
- `currentUser` - Authenticated user
- `activeScreen` - Current view (enum-based routing)

---

## Screen Routing

Uses a `Screen` enum with ~30 screens. `renderScreen()` conditionally renders components based on:
1. User role (Team Member gets isolated flow)
2. Active screen state

---

## Key Data Types (`types.ts`)

| Entity | Purpose |
|--------|---------|
| `Project` | Trackable project with budget, timeline, health |
| `Deal` | Sales deal with services, client info, status |
| `Task` | Work item with assignees, priority, dependencies |
| `TeamLeadSubtask` | Subtask for team leads with approval workflow |
| `Company/Agency` | Client organizations |
| `User` | Team members with roles and avatars |

---

## Component Structure (`components/`)

### Layout
- `Sidebar.tsx` - Role-aware navigation
- `Header.tsx` / `TeamOwnerHeader.tsx` / `SalesHeader.tsx` - Role-specific headers

### Core Screens
- `Dashboard.tsx` - PM command center
- `SalesDashboard.tsx` - Sales pipeline overview
- `TeamOwnerDashboard.tsx` / `TeamMemberDashboard.tsx` - Role dashboards

### Entity Management
- `ProjectList.tsx` / `ProjectDetail.tsx` - Project CRUD
- `DealList.tsx` / `CreateDeal.tsx` / `DealDetailPanel.tsx` - Deal pipeline
- `TaskList.tsx` / `TaskDetail.tsx` / `CreateTask.tsx` - Task management
- `Companies.tsx` / `CreateCompany.tsx` / `CreateAgency.tsx` - Client management

### Workflow
- `TaskReview.tsx` / `TaskReviewList.tsx` - Review workflows
- `SubtasksScreen.tsx` / `SubtaskReviewsScreen.tsx` - Subtask management
- `CreateProjectFromDeal.tsx` - Deal-to-project conversion

---

## Data Flow

1. **Login** → `handleLogin()` validates credentials → sets `currentUser` → navigates to role dashboard
2. **CRUD Operations** → Handler functions update state → UI re-renders
3. **Navigation** → `setActiveScreen()` updates enum → `renderScreen()` shows component

---

## Configuration (`vite.config.ts`)

- Development server on port 3000 (configurable)
- Path alias `@` → project root
- Environment variable support for Gemini API key

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
├── App.tsx              # Root component with state & routing
├── index.tsx            # React entry point
├── index.html           # HTML template with Tailwind
├── types.ts             # TypeScript interfaces
├── constants.ts         # Static data & user credentials
├── vite.config.ts       # Vite configuration
├── components/          # React components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Dashboard.tsx
│   ├── SalesDashboard.tsx
│   ├── ProjectList.tsx
│   ├── TaskList.tsx
│   └── ... (40+ components)
└── package.json
```

