# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build
pnpm start        # Serve production build
pnpm typecheck    # Generate React Router types + run tsc
```

## Architecture

This is a React SPA (SSR disabled) built with React Router v7, styled after a Gemini-like chat interface.

**Tech stack:** React 19, React Router v7 (file-based routing), Vite 7, Tailwind CSS v4, Zustand, TanStack React Query, Remixicon icons, TypeScript, pnpm

**Path alias:** `~/` maps to `app/`

### Key directories

- `app/routes/` — File-based route components (configured in `app/routes.ts`)
- `app/components/layout/` — Layout components (ChatLayout, Sidebar, MainHeader, ChatInput, etc.)
- `app/components/ui/` — Reusable UI primitives
- `app/stores/` — Zustand stores (chat-store.ts manages sidebar, conversations, input state)
- `app/services/` — API service layer (placeholder, ready for backend integration)
- `app/queries/` — TanStack React Query hooks (placeholder)
- `app/types/` — TypeScript type definitions
- `app/lib/` — Utilities and mock data

### State management

- **Zustand** for client-side UI state (sidebar toggle, active conversation, input value)
- **React Query** for server state — QueryClient configured with 60s staleTime, 1 retry

### Styling

Tailwind CSS v4 with custom theme variables defined in `app/app.css` (`--color-sidebar-bg`, `--color-accent`, etc.). Light theme with Gemini-inspired design tokens.

### Component hierarchy

`root.tsx` (Layout + QueryClientProvider) → `routes/home.tsx` (ChatLayout) → Sidebar + MainHeader + WelcomeArea + ChatInput
