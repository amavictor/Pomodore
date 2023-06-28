import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeNavigation } from "./home.navigation"
import { Ionicons } from '@expo/vector-icons';
import { TaskNavigator } from "./task.navigation";
import { View, Text, StyleSheet } from 'react-native';
import { mScale, vScale } from '../utilities/utilFunctions';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { AddTaskNavigator } from './addTask.navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatisticsNavigation } from './statistic.navigation';
import { ProfileNavigation } from './profile.navigation';
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics';



const AddComponent = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <TouchableOpacity
            onPress={()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={{
                width: mScale(50),
                height: mScale(50),
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                top: -10,
                borderRadius: "50%",
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: mScale(5)
                },
                shadowOpacity: 0.15,
                shadowRadius: 20

            }}
        >
            <AddButton>+</AddButton>
        </TouchableOpacity>
    )
}
const AddButton = styled.Text`
    font-size:${mScale(20)}px;
    color: #fff;
    font-size:${mScale(30)}px;
    font-weight:700;
`
export const BottomNavigation = () => {

    const Tab = createBottomTabNavigator()
    const { colors } = useContext(ThemeContext)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline"
                        return <Ionicons name={iconName} size={30} color={colors.primary} />
                    } else if (route.name === "Task") {
                        iconName = focused ? "md-calendar" : "ios-calendar-sharp"
                        return <Ionicons name={iconName} size={30} color={colors.primary} />
                    }
                    else if (route.name === "Add-task") {
                        iconName = focused ? "add-circle" : "add-circle-outline"
                        return <AddComponent />
                    }
                    else if (route.name === "Statistics") {
                        iconName = focused ? "stats-chart" : "stats-chart-outline"
                        return <Ionicons name={iconName} size={30} color={colors.primary} />
                    }
                    else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline"
                        return <Ionicons name={iconName} size={30} color={colors.primary} />
                    }

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
                    shadowRadius: 20,
                    zIndex: 1,
                    backgroundColor: `transparent`,

                },
                tabBarBackground: () => (
                    <TabBarBackground>
                        <BlurView intensity={100} style={StyleSheet.absoluteFill} />
                    </TabBarBackground>
                ),
                tabBarIconStyle: {
                    justifySelf: "center"
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeNavigation} />
            <Tab.Screen name="Task" component={TaskNavigator} />
            <Tab.Screen name="Add-task" component={AddTaskNavigator} />
            <Tab.Screen name="Statistics" component={StatisticsNavigation} />
            <Tab.Screen name="Profile" component={ProfileNavigation} />
        </Tab.Navigator>
    )
}

const TabBarBackground = styled.View`
    flex: 1;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${mScale(15)}px;
    overflow: hidden;
`