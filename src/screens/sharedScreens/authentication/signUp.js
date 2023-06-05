import styled from "styled-components/native"
import {
    View,
    Text
} from "react-native"
import { Input } from "../../../ui_elements/input"
import { useContext } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
export const SignUp = () => {
    const {colors} = useContext(ThemeContext)
    return (
        <BackgroundContainer colors={colors}>
            <Text>SignUp</Text>
            <Input/>
        </BackgroundContainer>
    )
}


const BackgroundContainer = styled.View`
    flex: 1;
    background-color: ${({colors})=>colors.backgroundColor};
`