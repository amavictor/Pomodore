import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './src/infrastructure/navigation/navigation';
import { ThemeContextProvider } from './src/infrastructure/utilities/themeContext/themeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeContextProvider>
  );
}