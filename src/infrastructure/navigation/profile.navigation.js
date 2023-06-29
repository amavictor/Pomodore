import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../screens/sharedScreens/profileScreens/profileScreens';
export const ProfileNavigation = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Profile-Screen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}