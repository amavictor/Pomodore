import { createStackNavigator } from "@react-navigation/stack";
import { OnBoardingScreen } from '../../screens/sharedScreens/onBoarding/onBoarding.screen';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { GetIn } from "../../screens/sharedScreens/authentication/getIn";
import { SignUp } from "../../screens/sharedScreens/authentication/signUp";
import { FillProfile } from "../../screens/sharedScreens/authentication/fillProfile";
import { Login } from "../../screens/sharedScreens/authentication/login";
import { CameraComponent } from "../../screens/sharedScreens/authentication/components/camera";
import { ForgotPassword } from "../../screens/sharedScreens/authentication/forgot-password";
import { OtpVerification } from "../../screens/sharedScreens/authentication/OtpVerification";
import { ResetPassword } from "../../screens/sharedScreens/authentication/reset-password";
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import { Alert } from 'react-native';
import { mScale } from '../utilities/utilFunctions';


const Stack = createStackNavigator()

export const AuthenticationNavigator = () => {
    const {colors} = useContext(ThemeContext)
    const [onBoard, setOnboard] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function getOnboard() {
            try {
                const jsonValue = await AsyncStorage.getItem('@onBoarding');
                if (jsonValue != null) {
                    setOnboard(JSON.parse(jsonValue));
                }
            } catch (e) {
                Alert.alert(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return null; 
    }
    return (
        <Stack.Navigator
            initialRouteName={onBoard ? "getIn" : "onBoarding"}
            screenOptions={{
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
                name="onBoarding"
                component={OnBoardingScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="getIn"
                component={GetIn}
                options={{
                    headerShown: false
                }}
            />
            {/* <Stack.Screen name="signInOptions" component={null}/> */}
            <Stack.Screen
                name="signUp"
                component={SignUp}
                options={{
                    title: null,
                }}
            />
            <Stack.Screen
                name="fillProfile"
                component={FillProfile}
                options={{
                    headerMode: "none",
                }}
            />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="camera" component={CameraComponent} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="otp_verification" component={OtpVerification} />
            <Stack.Screen name="reset_password" component={ResetPassword} />
        </Stack.Navigator>
    )
}