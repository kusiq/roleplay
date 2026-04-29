# Activist Profile MVP Design

## Goal

Build the first usable React MVP for a youth activist profile app. The app should feel like a modern personal cabinet with light RPG mechanics: clear enough for repeated official use, but youthful enough to make progress, participation, and achievements motivating.

## Product Scope

The MVP has two screens:

1. A placeholder login form.
2. A post-login activist profile dashboard.

The first version does not include a backend, real authentication, persistent accounts, or admin workflows. Data is seeded locally in the React app so the design, layout, theme system, and interaction model can be validated early.

## Visual Direction

Use a hybrid style: an official personal cabinet with soft RPG mechanics.

The interface should not look like a state portal or a cartoon game. It should be minimal, modern, youth-oriented, and intuitive, with a tone closer to Duolingo's clarity and progress feedback, but with more restrained cards, official profile data, and calmer typography.

The UI must support both light and dark themes as first-class modes. Theme switching should be available in the app header and should preserve contrast, hierarchy, and visual polish in both modes.

## Core Flow

The app opens on the login placeholder:

- Project title and short identity line.
- `Телефон или email` field.
- `Пароль` field.
- `Войти в профиль` button.

Clicking the login button switches to the profile dashboard. Validation can be minimal because the form is a placeholder.

## Dashboard Content

The profile dashboard should include:

- Activist avatar.
- Full name.
- Headquarters affiliation.
- Supervisor name.
- Rank/title.
- Current level.
- Experience points and progress to the next level.
- Overall rating position.
- Weekly activity streak.
- Recent event participation.
- Achievements.
- Weekly goals.
- Headquarters leaderboard.

Use realistic seeded Russian-language content. Avoid placeholder words such as `Lorem ipsum`, `TODO`, or `TBD`.

## Layout

Desktop layout:

- Top app bar with project identity, theme toggle, and user/status controls.
- Main content grid with a prominent profile/status column and activity/progress content.
- Side content for achievements, weekly goals, or leaderboard.

Mobile layout:

- Single-column flow.
- Profile summary first.
- Progress and next action second.
- Events, achievements, and leaderboard below.
- No horizontal overflow and no cramped text inside controls.

## Components

Use component boundaries that can later map to real data:

- `LoginScreen`
- `Dashboard`
- `ThemeToggle`
- `ProfileCard`
- `ProgressPanel`
- `StatsGrid`
- `ActivityTimeline`
- `AchievementList`
- `Leaderboard`
- `WeeklyGoals`

For this MVP these can live in `src/app/App.tsx` if the file remains readable. If the file grows too large, split into focused files under `src/app`.

## Interaction

The MVP should include small but real local interactions:

- Login placeholder switches from login to profile.
- Theme toggle switches light/dark.
- Achievement or goal cards can show selected/active state if useful.
- The interface should feel alive through restrained transitions and hover states.

Avoid fake explanatory text inside the app that describes how to use the interface. Controls should be self-explanatory.

## Styling Standards

Use modern CSS with design tokens:

- Semantic CSS custom properties for colors, surfaces, text, borders, shadows, and accents.
- Responsive layout using grid/flex, `minmax`, `clamp` only for layout sizing where appropriate, and stable control dimensions.
- Font sizes should not scale directly with viewport width.
- Letter spacing should remain `0`.
- Cards should use restrained radii, no excessive rounding, and no nested card stacks.
- Use purposeful accent colors rather than a one-hue palette.

The visual system should include green and red accents where appropriate for the movement identity, but the page should not be dominated by one color family.

## Accessibility

The MVP should provide:

- Semantic buttons and form controls.
- Visible focus states.
- Sufficient contrast in both themes.
- Labels for inputs.
- Reduced-motion support for animations.
- Responsive text wrapping that avoids overlap or clipped content.

## Technical Constraints

Current project:

- React 19
- TypeScript
- Vite
- Sass available
- Zustand installed but not required for the MVP

Keep the first implementation simple. Local React state is enough for login/theme/selection state. Do not add routing, backend services, auth providers, UI kits, or large dependencies unless the scope changes.

## Verification

Before calling implementation complete:

- Run the production build.
- Run lint if the current config supports it.
- Start the local dev server.
- Verify the login flow and dashboard in the browser.
- Check desktop and mobile viewports.
- Confirm light and dark themes both render correctly.

## GitHub and Vercel Plan

After the first implementation is stable:

- Initialize or use the local git repository.
- Commit the initial MVP.
- Create a GitHub repository.
- Push the project.
- Import/deploy it to Vercel using the Vite build settings.

Expected Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Out of Scope For First MVP

- Real user accounts.
- Database schema.
- Event check-in QR flow.
- Admin moderation.
- Role-based access.
- Push notifications.
- Public ranking pages.
- Real integrations with youth organization systems.

These should be designed after the profile MVP proves the core information architecture and visual style.
