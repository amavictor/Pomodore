import styled from "styled-components/native"
import {
    View,
    Text,
    KeyboardAvoidingView
} from "react-native"
import { useColorScheme } from "react-native"
import { Input } from "../../../ui_elements/input"
import { useContext } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { mScale,vScale } from '../../../infrastructure/utilities/utilFunctions';



export const SignUp = () => {
    const { colors } = useContext(ThemeContext)
    const colorScheme = useColorScheme()
    return (
        <BackgroundContainer colors={colors}>
            <SignUpText colors={colors}>SignUp</SignUpText>

            <KeyboardAvoidingView>
                <InputsContainer>
                    <Input
                        placeholder="Email"
                        inputMode={"email"}
                        keyboardType={"email-address"}
                        KeyboardAppearance={colorScheme}
                        clearButtonMode={"always"}
                        IconStart={() => <Ionicons name="mail" size={20} color={colors.textColor} />}

                    />
                    <Input
                        placeholder="Password"
                        keyboardType={"password"}
                        KeyboardAppearance={colorScheme}
                        clearButtonMode={"always"}
                        passWord
                        IconStart={() => <Entypo name="lock" size={20} color={colors.textColor} />}
                    />
                </InputsContainer>
            </KeyboardAvoidingView>
        </BackgroundContainer>
    )
}


const BackgroundContainer = styled.View`
    flex: 1;
    background-color: ${({ colors }) => colors.backgroundColor};
    padding-horizontal: ${mScale(20)}px;
    justify-content: center;
    align-items: center;
    gap:${mScale(70)}px;
`
const SignUpText = styled.Text`
    font-size: ${mScale(35)}px;
    color: ${({ colors }) => colors.textColor};
    font-weight: 700;
`
const InputsContainer = styled.View`
    gap: ${vScale(20)}px;
`
const RememberContainer = styled.View`
    flex-direction: row;
`