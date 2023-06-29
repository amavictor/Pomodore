import { View, Text, Platform } from "react-native"
import styled from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticationNavigator } from "./authentication.navigation";
import { useContext } from "react";
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { StatusBar } from 'react-native';
import { AuthContext } from '../authContext/authContext';
import { BottomNavigation } from "./bottom.navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//NOtification imports
import * as Device from "expo-device"
import *  as Notifications from "expo-notifications"


const Stack = createStackNavigator()



export const Navigation = () => {

    const { user, setUser } = useContext(AuthContext)
    const { colors } = useContext(ThemeContext)
    const [persistUser, setPersistUSer] = useState()


    useEffect(() => {
        (async function getUser() {
            const user = await AsyncStorage.getItem("@user")
            if (user != null) {
                setPersistUSer(JSON.parse(user))
            }
        })()
    }, [])

    return (
        <NavigationBackground colors={colors}>
            {
                (user || persistUser) ?
                    <BottomNavigation /> :
                    <AuthenticationNavigator />
            }
        </NavigationBackground>
    )

}

const NavigationBackground = styled.View`
    padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight + "px" : "0px"};
    height: 100%;
    background-color: ${({ colors }) => colors.backgroundColor};
`
