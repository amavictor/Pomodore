import { HomeScreen } from '../../screens/sharedScreens/homeScreens/homeScreen';
import { TimerScreen } from '../../screens/sharedScreens/timerScreen/TimerScreen';
import { createStackNavigator } from '@react-navigation/stack';


export const HomeNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Timer"
                component={TimerScreen}
            />
        </Stack.Navigator>
    );
};