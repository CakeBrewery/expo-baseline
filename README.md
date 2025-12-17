# Expo Baseline

This is a baseline Expo (React Native) application. Use as boilerplate to quickly build new ideas.

To use in conjunction with [spring-boot-baseline](https://github.com/CakeBrewery/spring-boot-baseline)

## Getting Started

1. Ensure you have Node.js 18+ and `npm` installed along with the Expo CLI (`npm install -g expo-cli`).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Launch the Expo development server:

   ```bash
   npm start
   ```

   From the Expo menu you can open:

   - `i` for the iOS simulator.
   - `a` for the Android emulator.
   - `w` for the progressive web build in your browser.

### Project Structure

- `App.tsx` – Cross-platform UI for the empty workspace state.
- `index.js` – Registers the root component for native and web renderers.
- `app.json` – Expo project configuration.
- `tsconfig.json` – Strict TypeScript settings tuned for React Native.
- `assets/` – Reserved for future icons, splash screens, and illustrations.

### Next steps

- Wire up an actual search bar using a debounced text input and data provider.
- Model selected stocks in a global store (Zustand/Jotai/Recoil) to drive the workspace panels.
- Integrate a charting solution compatible with Expo Web, such as Victory Native or React Native SVG Charts.
- Layer on Expo Router when navigation beyond this single workspace screen is needed.
