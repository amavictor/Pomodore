import { useContext } from "react"
import { Dimensions, KeyboardAvoidingView, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { mScale,vScale } from "../../../infrastructure/utilities/utilFunctions"
import { Input } from "../../../ui_elements/input"
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../../ui_elements/buttons"
export const ForgotPassword = ({navigation}) => {
    const { inset } = useSafeAreaInsets()
    const { width, height } = Dimensions.get("window")
    const { colors } = useContext(ThemeContext)
    return (
        <PasswordContainer
            colors={colors}
            inset={inset}
            keyboardDismissMode={"on-drag"}
        >
            <ImageContainer>
                <ImageElement width={width} height={height} source={require("../../../../assets/icons/forgot-password.png")} />
                <ForgotText colors={colors}>Select which contact you would like to use to reset your password</ForgotText>
            </ImageContainer>

            <KeyboardAvoidingView behavior="padding">
                <Input
                    placeholder="Email"
                    inputMode="email"
                    keyboardType="email-address"
                    IconStart={() => <Ionicons name="mail" size={20} color={colors.textColor} />}
                />
            </KeyboardAvoidingView>
            <ButtonCustom
                onPress={()=>navigation.navigate("otp_verification")}
            >Continue</ButtonCustom>

        </PasswordContainer>
    )
}

const PasswordContainer = styled.ScrollView.attrs(({ inset }) => ({
    contentContainerStyle: {
        flexGrow: 1,
        paddingVertical: inset,
        paddingHorizontal: mScale(20),
        alignItems: "center",  
        gap: vScale(70),
    }
}))`
    background-color:${({ colors }) => colors.backgroundColor};
`
const ImageContainer = styled.View`
    width:100%;
`
const ImageElement = styled.Image`
    width: ${({ width }) => width};
    height: ${({ height }) => height * 0.4};
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
