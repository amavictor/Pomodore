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





export const Navigation = () => {
    const {
      user,
      setUser,
      loggedIn,
      setLoggedIn
    } = useContext(AuthContext);
    const { colors } = useContext(ThemeContext);
  
    // useEffect(() => {
    //   const getUser = async () => {
    //     try {
    //       const user = await AsyncStorage.getItem("@user");
    //       if (user !== null) {
    //         setUser(JSON.parse(user));
    //         // setLoggedIn(true);
    //       }
    //     } catch (error) {
    //       // Handle the error here
    //       console.log("Error retrieving user:", error);
    //     }
    //   };
  
    //   getUser();
    // }, []);
  
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
