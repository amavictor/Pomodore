import { createStackNavigator } from "@react-navigation/stack";
import { OnBoardingScreen } from '../../screens/sharedScreens/onBoarding/onBoarding.screen';
import { useContext } from 'react';
import { ThemeContext } from '../utilities/themeContext/themeContext';


const Stack = createStackNavigator()

export const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="onBoarding"
                component={OnBoardingScreen}
                options={{
                    headerShown:false
                }}
            />
            {/* <Stack.Screen name="signInOptions" component={null}/>
            <Stack.Screen name="signUp" component={null} />
            <Stack.Screen name="fillProfile" component={null} />
            <Stack.Screen name="login" component={null} />
            <Stack.Screen name="forgotPassword" component={null}/> */}
            
        </Stack.Navigator>
    )
}