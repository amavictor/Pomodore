import {Platform } from "react-native"
import styled from "styled-components/native";
]import { AuthenticationNavigator } from "./authentication.navigation";
import { useContext } from "react";
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { StatusBar } from 'react-native';
import { AuthContext } from '../authContext/authContext';
import { BottomNavigation } from "./bottom.navigation";





export const Navigation = () => {
    const {
      user,
      setUser,
      loggedIn,
      setLoggedIn
    } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  
    return (
      <NavigationBackground colors={colors}>
        {loggedIn ? <BottomNavigation /> : <AuthenticationNavigator />}
      </NavigationBackground>
    );
  };
  
  const NavigationBackground = styled.View`
    padding-top: ${Platform.OS === "android"
      ? StatusBar.currentHeight + "px"
      : "0px"};
    height: 100%;
    background-color: ${({ colors }) => colors.backgroundColor};
  `;
