import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ProfileScreen } from '../../screens/sharedScreens/profileScreens/profileScreens';
import { EditProfile } from '../../screens/sharedScreens/profileScreens/editProfile';
import { Notifications } from '../../screens/sharedScreens/profileScreens/notifications';
import { Security } from '../../screens/sharedScreens/profileScreens/security';
import { CameraComponent } from '../../screens/sharedScreens/profileScreens/components/cameraComponent';

export const ProfileNavigation = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
                ...TransitionPresets.ModalTransition,
            })}
        >
            <Stack.Screen name="Profile-Screen" component={ProfileScreen} />
            <Stack.Screen name="edit-profile" component={EditProfile} />
            <Stack.Screen name="notifications" component={Notifications} />
            <Stack.Screen name="security" component={Security} />
            <Stack.Screen name="camera" component={CameraComponent} />
        </Stack.Navigator>
    )
}