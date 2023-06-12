import styled from "styled-components/native"
import {
    View,
    Text,
    KeyboardAvoidingView,
    Alert,
    Keyboard
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
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleSignIn } from "../../../infrastructure/utilities/firebaseUtils/firebase";
import { AuthContext } from "../../../infrastructure/authContext/authContext";
import * as Haptics from 'expo-haptics';
import { ActivityIndicator } from "@react-native-material/core";





export const SignUp = ({ navigation }) => {
    const { user, setUser } = useContext(AuthContext)
    const { colors } = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(false)
    const colorScheme = useColorScheme()
    const insets = useSafeAreaInsets()
    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const signUp = async (details) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        Keyboard.dismiss()
        const { email, password } = signupDetails
        if (signupDetails.password !== signupDetails.confirmPassword) {
            Alert.alert("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            const response = await createUserWithEmailAndPassword(auth, email, password)
            setUser(response.user)
            console.log(user)
            setIsLoading(false)
        }
        catch (e) {
            Alert.alert(e.message)
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }

        // navigation.navigate("fillProfile")
    }

    const googleLogin = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider)
            console.log(response.user)
        } catch (e) {
            Alert.alert(e.message);
        }
    };
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
                />
                <RememberText>Remember me</RememberText>
            </RememberContainer>

            <Button onPress={signUp}>{
                isLoading ?
                    <ActivityIndicator size="small" color="#ffff" /> :
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
                        onPress={googleLogin}
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
    border-bottom-width: 1 px;
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