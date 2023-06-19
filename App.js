import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/infrastructure/navigation/navigation';
import { ThemeContextProvider } from './src/infrastructure/utilities/themeContext/themeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider, MemoizedAuthProvider } from './src/infrastructure/authContext/authContext';
import { TaskContextProvider } from './src/infrastructure/utilities/taskContext/taskContext';

export default function App() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <SafeAreaProvider>
          <ThemeContextProvider>
            <NavigationContainer>
              <Navigation />
              <StatusBar style="auto" />
            </NavigationContainer>
          </ThemeContextProvider>
        </SafeAreaProvider>
      </TaskContextProvider>
    </AuthContextProvider>

  );
}