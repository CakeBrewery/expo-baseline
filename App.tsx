import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WorkspaceScreen from './src/screens/WorkspaceScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <WorkspaceScreen />
    </SafeAreaProvider>
  );
}
