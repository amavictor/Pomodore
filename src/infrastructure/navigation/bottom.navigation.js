import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeNavigation } from "./home.navigation"
import { Ionicons } from '@expo/vector-icons';
import { TaskNavigator } from "./task.navigation";
import { View, Text } from 'react-native';
import { mScale, vScale } from '../utilities/utilFunctions';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';



const AddComponent = () => {
    const {colors} = useContext(ThemeContext)
    return (
        <View
            style={{
                width: mScale(40),
                height: mScale(40),
                backgroundColor: colors.primary,
                alignItems: center,
                justifyContent: center
            }}
        >
            <Text>+</Text>
        </View>
    )
}

export const BottomNavigation = () => {

    const Tab = createBottomTabNavigator()
    const {colors} = useContext(ThemeContext)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Task") {
                        iconName = focused ? "md-calendar" : "ios-calendar-sharp"
                    }
                    return <Ionicons name={iconName} size={30} color={colors.primary} />
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: mScale(25),
                    left: mScale(25),
                    right: mScale(25),
                    borderRadius: mScale(15),
                    elevation: 20,
                    height: vScale(60), 
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 1,
                        height: mScale(10),
                    },
                    shadowOpacity: 0.1,
                    shadowRadius:20

                },
                tabBarIconStyle: {
                    justifySelf:"center"
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeNavigation} />
            <Tab.Screen name="Task" component={TaskNavigator} />
        </Tab.Navigator>
    )
}

