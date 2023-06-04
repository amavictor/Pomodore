import { View, Text, Platform } from "react-native"
import styled from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticationNavigator } from "./authentication.navigation";
import { useContext } from "react";
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { StatusBar } from 'react-native';


const Stack = createStackNavigator()


export const Navigation = () => {

    const { colors } = useContext(ThemeContext)
    return (
        <NavigationBackground colors={colors}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="authentication" component={AuthenticationNavigator} />
            </Stack.Navigator>
        </NavigationBackground>
    )

}

const NavigationBackground = styled.View`
    padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight + "px"  : "0px"};
    height: 100%;
    background-color: ${({ colors }) => colors.backgroundColor};
`
