
import { createStackNavigator } from '@react-navigation/stack';
import { TaskScreen } from '../../screens/sharedScreens/taskScreens/taskScreen';
import { mScale } from '../utilities/utilFunctions';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';
export const TaskNavigator = () => {

    const Stack = createStackNavigator()
    const {colors} = useContext(ThemeContext)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitleAlign: "left",
                headerLeftContainerStyle: {
                    paddingLeft: mScale(20)
                },
                headerStyle: {
                    backgroundColor: '#ffff',

                },
                headerTintColor: colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: mScale(20)
                },
            }}
        >
            <Stack.Screen
                name="Task-Screen"
                component={TaskScreen}
            />
        </Stack.Navigator>
    )
}