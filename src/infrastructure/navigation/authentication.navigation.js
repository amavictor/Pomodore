import { createStackNavigator } from "@react-navigation/stack";
import { OnBoardingScreen } from '../../screens/sharedScreens/onBoarding/onBoarding.screen';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';
import { GetIn } from "../../screens/sharedScreens/authentication/getIn";
import { SignUp } from "../../screens/sharedScreens/authentication/signUp";
import { FillProfile } from "../../screens/sharedScreens/authentication/fillProfile";
import { Login } from "../../screens/sharedScreens/authentication/login";
import { CameraComponent } from "../../screens/sharedScreens/authentication/components/camera";


const Stack = createStackNavigator()

export const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
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
            <Stack.Screen name="signUp" component={SignUp} />
            <Stack.Screen
                name="fillProfile"
                component={FillProfile}
                options={{
                    headerMode: "none",
                }}
            />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="camera" component={CameraComponent} />
            {/* <Stack.Screen name="forgotPassword" component={null}/> */}

        </Stack.Navigator>
    )
}