# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Inventory management system for a motorcycle parts shop (refaccionaria). Laravel 12 API backend + React 19 + TypeScript SPA frontend, communicating via Axios with Sanctum token auth. **Not** an Inertia.js app despite the dependency — the frontend is a standalone SPA served from `resources/views/app.blade.php`.

## Commands

### Development

```bash
# Run everything (Laravel server + queue + pail logger + Vite)
composer dev

# Frontend only
pnpm run dev

# Build frontend
pnpm run build
```

### Testing

```bash
# Run all tests (uses SQLite in /tmp/testing.sqlite)
php artisan test --env=testing

# Run a single test file
php artisan test --env=testing tests/Feature/Venta/VentaTest.php

# Run a specific test method
php artisan test --env=testing --filter=test_store_venta
```

Tests use `DatabaseTransactions` (not `RefreshDatabase`) and run `migrate:fresh && db:seed` once per test run via a static `$migrated` flag in `TestCase`. The `loginAdmin()` / `createUser(RoleEnum $role)` helpers in `TestCase` authenticate via `Sanctum::actingAs`.

### Code Formatting

```bash
# Format everything (frontend + PHP)
composer format

# Frontend only
pnpm run format

# PHP only
./vendor/bin/pint

# Type check frontend
pnpm run types

# Lint frontend
pnpm run lint
```

### Database

```bash
# Manual DB backup (stored in storage/app/backups/)
php artisan db:backup
```

### Docker

```bash
# Start dev environment
docker compose up --build -d

# Run tests in Docker
docker compose -f docker-compose.test.yml run --rm php_test

# Stop containers (add --volumes to wipe DB data)
docker compose down
```

When using Docker, set these env vars:
```
VITE_APP_URL=http://localhost:8000
DB_HOST=mysql
DB_PASSWORD=root
```

## Architecture

### Backend (Laravel 12)

**API structure** — all routes are under `/api` via `routes/api.php`, split into per-module files in `routes/modules/`. All routes except `/api/auth/*` require `auth:sanctum`. The web route (`routes/web.php`) catches every non-API path and returns `app.blade.php` to support client-side routing.

**Response macros** — custom macros registered in `AppServiceProvider` via `ResponseMacros::register()`. Use these everywhere instead of raw `response()->json()`:
- `Response::success($data)` → 200 `{status: "OK", data: ...}`
- `Response::successDataTable($paginator, $headers)` → 206 with paginated data + column definitions for the frontend datatable
- `Response::error($message)` → 422
- `Response::unauthenticated()` / `Response::unauthorized()` → 401/403

**Logic layer** — business logic lives in `app/Logic/{Module}/` not in controllers. Controllers are thin: they validate via `FormRequest`, delegate to a `Logic` class, and return the response. The `IndexLogic` base class in `app/Core/Logic/IndexLogic.php` handles pagination, filtering, searching, and ordering for list endpoints. Extend it and override `tableHeaders()`, `customFilters()`, `withRelations()`, and `getColumnSearch()`.

**Actions** — `app/Actions/` contains single-action classes for complex operations (e.g. sale processing, product adjustments, returns).

**Movimientos trait** — `app/Traits/Movimientos.php` must be used whenever stock changes. Call `$this->nuevoMovimiento([...])` with the required 7 keys to log every inventory movement to `reporte_movimientos`.

**Printer module** — `app/Printer/` is a self-contained ESC/POS ticket printing subsystem with interfaces for connector (CUPS/network/OS) and formatter. Configured via `PRINTER_NAME`, `PRINTER_DRIVER`, and `PRINTER_HOST` env vars.

**Enums** — domain enums in `app/Enums/`: `RoleEnum`, `StatusVentaEnum`, `TipoCompraEnum`, `TipoMovimientoEnum`, `TipoProductoEnum`, `ProductoUnidadEnum`, `StatusDevolucionEnum`. Use these instead of raw strings.

### Frontend (React 19 + TypeScript)

**Entry** — `resources/js/main.tsx` → `App.tsx`. Provider order matters: `AxiosProvider` → `MantineProvider` → `ThemeProvider` → `QueryClientProvider` → `RouterProvider`.

**Auth** — token stored in `localStorage` as `authToken`. `AxiosContext` injects it into all Axios requests and handles 401 by calling `logout()` (clears storage + redirects to `/login`). The logged-in user object is also persisted in `localStorage`.

**Routing** — React Router v7 via `resources/js/router/routes.routes.tsx`. Routes are defined per module in `resources/js/router/modules/` and composed into `authRoutes`, `adminRoutes`, and `errorRoutes`. The `PrivateRoute` component wraps protected pages; `AppLayout` wraps all non-blank pages.

**Data fetching** — TanStack Query (`@tanstack/react-query`) with `refetchOnWindowFocus: false`. Per-module service functions in `resources/js/Services/{module}/` wrap `axiosApi` calls.

**State** — Zustand stores in `resources/js/store/`: `useSelectOptionsStore` (shared dropdown options by key) and `useSelectedItemStore` (selected row/item for modals).

**Tables** — `mantine-datatable` with the `useDatatable` hook which talks to `Response::successDataTable` endpoints (HTTP 206). Column definitions come from the backend response.

**Forms** — Formik + Yup validation. The `useOnSubmit` hook standardizes form submission.

**UI** — Tailwind CSS v4 + shadcn/ui (Radix UI primitives) + Mantine components. Icons from `@solar-icons/react` and `lucide-react`. Notifications via `react-toastify` and `sweetalert2` for confirmations.

**Package manager** — `pnpm` (v10). Do not use `npm` or `yarn`.

## Default Users (dev/seeded)

| Role       | Email                      | Password   |
|------------|----------------------------|------------|
| superadmin | superadmin@repamotos.com   | password   |
| admin      | admin@repamotos.com        | password   |
| employee   | empleado@repamotos.com     | password   |

## Printer Setup (CUPS)

```bash
# List devices
lpinfo -v

# Enable remote access
sudo cupsctl --remote-any --remote-admin --share-printers

# Add POS80 printer
lpadmin -p POS80_Series_POS80_Printer_USB -E -v usb://POS80_Series/POS80_Printer_USB -m raw
```
