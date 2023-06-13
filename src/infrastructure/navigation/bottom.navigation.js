import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeNavigation } from "./home.navigation"


export const BottomNavigation = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigation} />
        </Tab.Navigator>
    )
}