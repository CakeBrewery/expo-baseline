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

### API Client Generation
This project uses an OpenAPI specification from the associated `spring-boot-baseline` project to generate its TypeScript API client.

1.  **Generate OpenAPI Spec (Backend):** First, ensure the `spring-boot-baseline` project has its OpenAPI specification (`openapi.json`) up-to-date. This is typically done by running `./gradlew generateOpenApiDocs` in the `spring-boot-baseline` directory.
2.  **Copy OpenAPI Spec:** Copy the generated `openapi.json` from `spring-boot-baseline/build/api-spec/openapi.json` to `expo-baseline/src/openApi/openapi.json`.
3.  **Generate Client (Frontend):** Run the following command in this directory to regenerate the TypeScript API client based on the updated `openapi.json`:

    ```bash
    npm run gen:api
    ```
    This command uses `openapi-typescript-codegen` to generate the client in `src/generated/api`. Changes in the backend's API contract will be reflected here after this step.
