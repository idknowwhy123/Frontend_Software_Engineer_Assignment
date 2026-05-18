# Next Airline Flight Log

Frontend screening assignment built with Next.js and Tailwind CSS.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Extra Work Selected

### Optimize Average Lookup To O(1)

Implemented an average-time map keyed by route, for example:

```text
bangkok to tokyo
```

The app keeps accumulated `totalTime` and `counts` per route, so printing each route average can read directly from the map instead of recalculating every passenger log from scratch.

### Refactor Code And Project Structure

Refactored repeated UI into reusable components:

- `Button`
- `Card`
- `Badge`
- `EmptyState`
- `DarkModeToggle`

Reason: the original UI used inline styles and repeated layout patterns. Shared components make the code easier to maintain and keep states such as hover, focus, active, and disabled consistent.

## Challenge Work Selected

### Refactoring With Reasoning

I refactored the home page from a starter Next.js page into a focused flight-log dashboard.

Main decisions:

- Use a dashboard layout because the app is an operational tool, not a landing page.
- Use summary cards for total logs, pending arrivals, and tracked routes so users can quickly understand the current state.
- Use semantic HTML such as `header`, `main`, `section`, `footer`, `table`, and `fieldset` to improve accessibility.
- Use a real table for flight logs because passenger, airport, timestamp, and type are tabular data.

### CSS And Visual Design

I used Tailwind CSS for styling.

Improvements:

- Responsive layout for mobile and desktop.
- Clear typography hierarchy.
- Consistent spacing and card surfaces.
- Styled form controls with focus and error states.
- Dark mode support.
- Empty state for the log table.
- Status badges for departure and arrival logs.
