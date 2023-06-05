import styled from "styled-components/native";
import { useContext } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { mScale } from '../infrastructure/utilities/utilFunctions';
import { useState } from 'react';

export const Input = ({
    placeholder
}) => {
    const { colors } = useContext(ThemeContext)

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <InputContainer
            colors={colors}
        >
            <IconContainer>
                <IconImage />
            </IconContainer>
            <InputElement
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                focused={isFocused}
            />

        </InputContainer>
    )
}


const InputContainer = styled.View`
    width: 80%;
    border-radius: ${mScale(6)}px;
    background-color: ${({ colors }) => colors.buttonOutlineColor};
    height: ${mScale(60)}px;
    flex-direction: row;
    align-items: center;
    padding: ${mScale(10)}px;
`
const InputElement = styled.TextInput`
    width: 100%;
`
const IconContainer = styled.View`
`
const IconImage = styled.Image`
    width: ${mScale(10)}px;
    height: ${mScale(10)}px;
`

