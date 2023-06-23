import { HomeScreen } from '../../screens/sharedScreens/homeScreens/homeScreen';
import { TimerScreen } from '../../screens/sharedScreens/timerScreen/TimerScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';



export const HomeNavigation = () => {
    const Stack = createSharedElementStackNavigator();

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
                sharedElements={(route, otherRoute, showing) => {
                    const { dataItem } = route.params;
                    return [
                        {
                            id:  `image`,
                            animation: 'move',
                            resize: 'clip',
                        },
                    ];
                }}
            />
        </Stack.Navigator>
    );
};