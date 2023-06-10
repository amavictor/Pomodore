import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/infrastructure/navigation/navigation';
import { ThemeContextProvider } from './src/infrastructure/utilities/themeContext/themeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
          <StatusBar style="auto" />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}