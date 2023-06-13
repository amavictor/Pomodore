import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/sharedScreens/homeScreens/homeScreen';

export const HomeNavigation = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}