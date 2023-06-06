import styled from "styled-components/native"
import { useContext } from "react"
import { KeyboardAvoidingView, Text } from "react-native"
import { useColorScheme } from "react-native"
import { Input } from "../../../ui_elements/input"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { mScale, vScale } from "../../../infrastructure/utilities/utilFunctions"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { Button } from "../../../ui_elements/buttons"
import { Ionicons, Entypo } from '@expo/vector-icons';
export const Login = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const colorScheme = useColorScheme()
    return (
        <BackgroundContainer colors={colors}>
            <SignUpText colors={colors}>Login To Your Account</SignUpText>

            <KeyboardAvoidingView>
                <InputsContainer>
                    <Input
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        KeyboardAppearance={colorScheme}
                        clearButtonMode="unless-editing"
                        IconStart={() => <Ionicons name="mail" size={20} color={colors.textColor} />}
                    />
                    <Input
                        placeholder="Password"
                        keyboardType="password"
                        KeyboardAppearance={colorScheme}
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

            <Button onPress={() => navigation.navigate("fillProfile")}>Login</Button>

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
                            <ButtonText colors={colors}>Login with Google</ButtonText>
                        </ButtonContent>

                    </Button>
                    {
                        Platform.OS === "ios" ?
                            <Button
                                outline
                            >
                                <ButtonContent>
                                    <Social source={require("../../../../assets/icons/apple-logo.png")} />
                                    <ButtonText colors={colors}>Login with Apple</ButtonText>
                                </ButtonContent>
                            </Button>
                            : null
                    }
                </SocialSignUpContainer>
            </AlternateSignUpContainer>
            <ActiveAccount colors={colors}>
                Already have an account?
                <SignIn colors={colors}>Sign In</SignIn>
            </ActiveAccount>
        </BackgroundContainer>
    )
}


const BackgroundContainer = styled.View`
    flex: 1;
    background-color: ${({ colors }) => colors.backgroundColor};
    padding-horizontal: ${mScale(20)}px;
    justify-content: center;
    align-items: center;
    gap:${mScale(30)}px;
`
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
    border-bottom-width: 1px;
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
const AlternateSignUpContainer = styled.View`

`
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