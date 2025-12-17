# Agents for Expo React Native Projects

This workspace targets a single codebase that ships to iOS, Android, and the web through Expo. When running AI powered development flows, use purpose built agents rather than a single generalist so that each step stays deterministic and focused on quality.

## Recommended Agent Roster

| Agent | Primary Goal | Typical Inputs | Tools / Stack Awareness |
| --- | --- | --- | --- |
| **Planner** | Break down user stories into cross platform UI, state, and data subtasks. | Product requirements, high level mocks. | Knows Expo Router basics, TypeScript strict mode, and app-wide design tokens. |
| **UI Builder** | Implement React Native screens/components with responsive styling. | Detailed component specs from Planner. | Uses `App.tsx`, `StyleSheet`, hooks, and Expo assets. Generates snapshot worthy JSX and minimal dependencies. |
| **Data & State** | Manage application state, API adapters, and caching. | Contracts for stock search, workspace panels, or chart data. | Prefers lightweight stores (Zustand/Jotai) and fetch wrappers that run on native + web. |
| **Testing & QA** | Add or update Jest + React Native Testing Library coverage plus lint/TypeScript fixes. | PR diff, edge cases flagged by Planner/UI/Data agents. | Runs `npm test`, `expo start --web`, and static analysis. Produces failing test repro steps when needed. |
| **DX Guardian** | Maintains build scripts, CI config, lint rules, and developer ergonomics. | Toolchain updates, Expo SDK bumps, TypeScript config tweaks. | Familiar with `package.json`, `tsconfig.json`, and Metro bundler constraints. |

## Workflow

1. Planner agent converts product intent into sequenced tasks, surfacing platform caveats (e.g., safe area padding, haptics).
2. UI Builder delivers pixel-ready components while documenting prop contracts for downstream agents.
3. Data & State wires APIs and stores, reusing Planner specs and UI contracts to keep props consistent.
4. Testing & QA validates functionality with unit/UI tests plus linting to enforce TypeScript strictness.
5. DX Guardian periodically audits dependencies, scripts, and Expo SDK versions to keep the dev loop smooth.

## Prompting Tips

- Include the relevant snippet from `README.md` so agents understand the target platform envelope.
- Remind UI focused agents that the project is TypeScript first; they should not fallback to `.js` files.
- Share screenshots or Figma links with the Planner/UI Builder so they can reason about responsive spacing, theming, and typography.
- When asking Testing & QA for help, supply the command output (e.g., failing Jest log) to minimize guesswork.

Following this playbook keeps autonomy high while ensuring each agent remains tightly scoped to its strengths.
