
import { createStackNavigator } from '@react-navigation/stack';
import { TaskScreen } from '../../screens/sharedScreens/taskScreens/taskScreen';
export const TaskNavigator = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Task-Screen"
                component={TaskScreen}
            />
        </Stack.Navigator>
    )
}