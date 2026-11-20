# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TicketMono is an event-ticketing teaching app with two parts in one folder:

- `ticketmono_backend/`: Django 6 + Django REST Framework + SimpleJWT, using SQLite
- `ticketmono_frontend/`: React 19 + Vite + TanStack Query + React Router 7, styled with Tailwind 4 and DaisyUI

The README in this folder is lesson material for students, not project documentation.

## Commands

### Backend (run from `ticketmono_backend/` with `.venv` active: `.venv\Scripts\activate` on Windows)

```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver                 # http://localhost:8000

python manage.py create_organizers         # seeds alice_organizer / Organizer@100, bob_organizer / Organizer@101
python manage.py loaddata event_data.json  # sample venues/events/tiers (run after create_organizers)

python manage.py test                                        # all tests
python manage.py test event_tickets                          # one app
python manage.py test event_tickets.tests.EventTicketsTestCase.test_create_order   # one test

coverage run manage.py test && coverage report               # .coveragerc limits source to core, event_tickets
coverage html
```

### Frontend (run from `ticketmono_frontend/`)

```
npm install
npm run dev          # http://localhost:5173 (the only origin allowed by CORS)
npm run lint
npm run build
npm test             # vitest in watch mode
npm run test:run     # single run
npx vitest run src/__tests__/EventCard.test.jsx      # one file
npx vitest run -t "renders every event"              # by test name
```

## Architecture

### Backend

- `core` app: `CustomUser` (`AUTH_USER_MODEL`) with a `role` field (`"user"` or `"event_organizer"`), and the auth endpoints under `/api/v1/auth/` (`register/`, `login/` → SimpleJWT pair, `token/refresh/`, `me/`).
- `event_tickets` app: `Venue → Event → TicketTier → Ticket`, plus `Order` (M2M to `Ticket`; `total_price` is a computed property). A DRF `DefaultRouter` exposes `/api/v1/events/` and `/api/v1/orders/`.
- Every endpoint except register/login requires JWT auth (`Authorization: Bearer <access>`). Access tokens last 60 minutes and refresh tokens last 7 days.
- `OrderViewSet` scopes its queryset to `request.user`. Its custom `create` accepts `{"items": [{"ticket_tier_id", "quantity"}]}` (validated by `CreateNewOrderSerializer`), creates one `Ticket` row per quantity, and returns `OrderSerializer` data. `retrieve` uses `OrderDetailSerializer`.
- `EventViewSet` is a full `ModelViewSet` but uses `EventListReadOnlySerializer` for every action.
- Tests use `APITestCase` with `force_authenticate`. Existing tests pass role strings (`'attendee'`, `'organizer'`) that are not valid `ROLE_CHOICES`; `create_user` doesn't validate choices, so this goes unnoticed.

### Frontend

- **API layer (`src/api/`)**: `client.js` is a fetch wrapper with no React dependency. It reads the token from `localStorage` (via `tokenStorage.js`) on each call. On a 401 it runs a single, deduplicated refresh and retries the request; if the refresh fails it logs the user out. `AuthProvider` registers the refresh and logout callbacks through `setAuthCallbacks`. `apiClient` returns the raw `Response`, and each resource module (`events.js`, `orders.js`, `auth.js`) checks `res.ok` and parses JSON itself. The base URL is `VITE_API_URL`, falling back to `http://localhost:8000/api/v1`.
- **Server state**: TanStack Query hooks in `src/hooks/` (`useEvents`, `useEvent`, `useOrder`, `useCreateOrder`) wrap the API functions.
- **Global client state**: `AuthContext` holds the user, the token, and the login/register mutations (login stores the token, calls `/auth/me/`, then saves the user to localStorage). `CartContext` keeps cart items keyed by `${eventId}-${tierId}`, and a quantity of 0 removes the item. Components read these through `useAuth` / `useCart`.
- **Routing (`App.jsx`)**: provider order is QueryClient → Auth → Cart → BrowserRouter. Every route except `/login` and `/register` is wrapped in `ProtectedRoute`. Attendee pages live in `pages/attendee/` and follow the flow events list → event detail → select tickets → checkout → order confirmation.
- **Tests**: Vitest + jsdom + React Testing Library, with MSW for network mocking. `src/test/setup.js` starts the MSW server. Default handlers and fixtures (`mockEvents`) live in `src/test/handlers.js`; override a handler for one test with `server.use(...)`. Render components with `renderWithProviders` (`src/test/renderWithProviders.jsx`), which provides a QueryClient with retries disabled and a `MemoryRouter`. It does **not** provide `AuthProvider` or `CartProvider`, so components that need those require extra wrapping. Tests go in `src/__tests__/`.
