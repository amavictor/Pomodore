import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from '../../screens/sharedScreens/mainScreens/homeScreen';


export const BottomNavigation = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    )
}