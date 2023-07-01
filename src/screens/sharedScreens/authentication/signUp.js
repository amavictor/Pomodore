import styled from "styled-components/native"
import {
    View,
    Text,
    KeyboardAvoidingView,
    Alert,
    Keyboard,
    ActivityIndicator,
    Platform
} from "react-native"
import { useColorScheme } from "react-native"
import { Input } from "../../../ui_elements/input"
import { useContext } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button } from "../../../ui_elements/buttons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../infrastructure/utilities/firebaseUtils/firebase";
import { AuthContext } from "../../../infrastructure/authContext/authContext";
import * as Haptics from 'expo-haptics';
import { CommonActions, useNavigation } from "@react-navigation/native";




export const SignUp = () => {
    const { setUser } = useContext(AuthContext)
    const { colors } = useContext(ThemeContext)
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const colorScheme = useColorScheme()
    const insets = useSafeAreaInsets()
    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        remember: false
    })



    const signUp = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        Keyboard.dismiss()
        setIsLoading(true)
        const { email, password, confirmPassword } = signupDetails
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match")
            setIsLoading(false)
            return
        }
        else if (email === "" || password === "" || confirmPassword === "") {
            Alert.alert("Please fill in all fields")
            setIsLoading(false)
            return
        }
        else {
            setIsLoading(true)
            console.log("Runningnignging")
            createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    const user = response.user
                    setUser(user)
                    setIsLoading(false)
                    
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "fillProfile" }],
                        })
                    )
                })
                .catch(e => {
                    Alert.alert(e.message)
                    setSignInFail(true)
                    setIsLoading(false)
                })
            setIsLoading(false)
        }



    }


    return (
        <BackgroundContainer colors={colors} inset={insets}>
            <SignUpText colors={colors}>Create Your Account</SignUpText>
            <KeyboardAvoidingView behavior="padding">
                <InputsContainer>
                    <Input
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        KeyboardAppearance={colorScheme}
                        clearButtonMode="unless-editing"
                        value={signupDetails.email}
                        onChangeText={(text) => setSignupDetails({ ...signupDetails, email: text })}
                        IconStart={() => <Ionicons name="mail" size={20} color={colors.textColor} />}
                    />
                    <Input
                        placeholder="Password"
                        KeyboardAppearance={colorScheme}
                        KeyboardType="default"
                        clearButtonMode="unless-editing"
                        value={signupDetails.password}
                        onChangeText={(text) => setSignupDetails({ ...signupDetails, password: text })}
                        password={true}
                        IconStart={() => <Entypo name="lock" size={20} color={colors.textColor} />}
                    />
                    <Input
                        placeholder="Confirm Password"
                        KeyboardAppearance={colorScheme}
                        KeyboardType="default"
                        value={signupDetails.confirmPassword}
                        onChangeText={(text) => setSignupDetails({ ...signupDetails, confirmPassword: text })}
                        clearButtonMode="unless-editing"
                        password={true}
                        IconStart={() => <Entypo name="lock" size={20} color={colors.textColor} />}
                    />
                </InputsContainer>
            </KeyboardAvoidingView>

            <RememberContainer>
                <BouncyCheckbox
                    size={18}
                    fillColor={colors.primary}
                    onPress={(isChecked) => setSignupDetails({ ...signupDetails, remember: isChecked })}
                />
                <RememberText>Remember me</RememberText>
            </RememberContainer>

            <Button onPress={signUp}>{
                isLoading ?
                    <ActivityIndicator size="large" color="white" /> :
                    "Sign Up"
            }
            </Button>

            <AlternateSignUpContainer>
                <LineContainer>
                    <Line colors={colors} />
                    <Text>Or</Text>
                    <Line colors={colors} />
                </LineContainer>
                <SocialSignUpContainer>
                    <Button
                        outline
                    >
                        <ButtonContent>
                            <Social source={require("../../../../assets/icons/google.png")} />
                            <ButtonText
                                colors={colors}
                            >Sign Up with Google</ButtonText>
                        </ButtonContent>

                    </Button>
                    {
                        Platform.OS === "ios" ?
                            <Button
                                outline
                            >
                                <ButtonContent>
                                    <Social source={require("../../../../assets/icons/apple-logo.png")} />
                                    <ButtonText colors={colors}>Sign Up with Apple</ButtonText>
                                </ButtonContent>
                            </Button>
                            : null
                    }
                </SocialSignUpContainer>
            </AlternateSignUpContainer>
            <ActiveAccount colors={colors}>
                Already have an account?
                <SignIn colors={colors} onPress={() => navigation.navigate("login")}>Sign In</SignIn>
            </ActiveAccount>
        </BackgroundContainer>
    )
}


const BackgroundContainer = styled.ScrollView.attrs(({ inset }) => ({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: vScale(20),
        paddingTop: inset.top + mScale(30),
        paddingBottom: inset.bottom,
        paddingHorizontal: mScale(20)
    }
}))`
    background-color: ${({ colors }) => colors.backgroundColor};
  `;
const SignUpText = styled.Text`
    font-size: ${mScale(35)}px;
    color: ${({ colors }) => colors.textColor};
    font-weight: 700;
    text-align: center;
`
const InputsContainer = styled.View`
    gap: ${vScale(20)}px;
`
const RememberContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const RememberText = styled.Text`
    font-weight: 500;
`
const Line = styled.View`
    border-bottom-color: ${({ colors }) => colors.lineColor};
    /* border-bottom-width: 1 px; */
    width:${mScale(150)}px;
    margin-horizontal:${mScale(5)}px;
`
const LineContainer = styled.View`
    align-self: center;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content:center;
`

const AlternateSignUpContainer = styled.View``


const SocialSignUpContainer = styled.View`
    gap: ${mScale(10)}px;
    margin-top: ${mScale(15)}px;
`

const Social = styled.Image`
    width: ${mScale(20)}px;
    height: ${mScale(20)}px;
`
const ButtonText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    font-size: ${mScale(12)}px;
`
const ButtonContent = styled.View`
    align-items: center;
    flex-direction: row;
    gap: ${mScale(10)}px;
`
const ActiveAccount = styled.Text`
    color: ${({ colors }) => colors.textColor};
`
const SignIn = styled.Text`
    color: ${({ colors }) => colors.primary};
    margin-left: ${mScale(5)}px;
`