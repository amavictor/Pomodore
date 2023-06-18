
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AddTaskScreen } from '../../screens/sharedScreens/addTask/addTask';
import { mScale } from '../utilities/utilFunctions';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';
export const AddTaskNavigator = () => {
    const Stack = createStackNavigator()
    const {colors} = useContext(ThemeContext)
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AddTask-Screen"
                component={AddTaskScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitleAlign: "left",
                    headerStyle: {
                        backgroundColor: '#ffff',

                    },
                    headerTintColor: colors.textColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: mScale(20)
                    },
                    title:"Create new task"
                }}
            />
        </Stack.Navigator>
    )
}