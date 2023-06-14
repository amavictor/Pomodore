
import { createStackNavigator } from '@react-navigation/stack';
import { StatisticScreen } from '../../screens/sharedScreens/statisticsScreens/statistics';
export const StatisticsNavigation = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Statistics-Screen" component={StatisticScreen} />
        </Stack.Navigator>
    )
}