import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/infrastructure/navigation/navigation';
import { ThemeContextProvider } from './src/infrastructure/utilities/themeContext/themeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/infrastructure/authContext/authContext';

export default function App() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <ThemeContextProvider>
          <NavigationContainer>
            <Navigation />
            <StatusBar style="auto" />
          </NavigationContainer>
        </ThemeContextProvider>
      </SafeAreaProvider>
    </AuthContextProvider>

  );
}