
import { createStackNavigator } from '@react-navigation/stack';
export const AddTaskNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AddTask-Screen"
                component={AddTaskScreen}
            />
        </Stack.Navigator>
    )
}