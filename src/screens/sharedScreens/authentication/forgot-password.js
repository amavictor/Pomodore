import { useContext } from "react"
import { Dimensions, KeyboardAvoidingView, Text, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { mScale, vScale } from "../../../infrastructure/utilities/utilFunctions"
import { Input } from "../../../ui_elements/input"
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../../ui_elements/buttons"
export const ForgotPassword = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const { width, height } = Dimensions.get("window")
    const { colors } = useContext(ThemeContext)
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={"padding"}
            >
                <PasswordContainer
                    colors={colors}
                    inset={insets}
                    keyboardDismissMode={"on-drag"}
                >
                    <ImageContainer>
                        <ImageElement width={width} height={height} source={require("../../../../assets/icons/forgot-password.png")} />
                        <ForgotText colors={colors}>Select which contact you would like to use to reset your password</ForgotText>
                    </ImageContainer>


                    <Input
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        IconStart={() => <Ionicons name="mail" size={20} color={colors.textColor} />}
                    />

                    <ButtonCustom onPress={() => navigation.navigate("otp_verification")}>Continue</ButtonCustom>

                </PasswordContainer>
            </KeyboardAvoidingView>

        </TouchableWithoutFeedback>

    )
}

const PasswordContainer = styled.View`
    background-color:${({ colors }) => colors.backgroundColor};
    padding-top: ${({ inset }) => inset.top + mScale(50)}px;
    padding-bottom: ${({ inset }) => inset.bottom}px;
    padding-horizontal: ${mScale(20)}px;
    align-items: center;
    gap: ${vScale(70)}px;
    flex:1;
`
const ImageContainer = styled.View`
    width:100%;
`
const ImageElement = styled.Image`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height * 0.3}px;
    resize-mode: contain;
`
const ForgotText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    text-align: center;
    font-size: ${mScale(14)}px;
`
const ButtonCustom = styled(Button)`
    justify-self: flex-end;
`
