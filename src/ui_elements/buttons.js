import styled from "styled-components"
import { useContext } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { mScale } from '../infrastructure/utilities/utilFunctions';


export const Button = ({
    children,
    width,
    height,
    fontSize
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <ButtonElement
            colors={colors}
            activeOpacity={0.8}
            height={height}
            width={width}
        >
            <Text
                colors={colors}
            >
                {children}
            </Text>
        </ButtonElement>
    )

}

const ButtonElement = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({width})=> width ? width : "100%"};
    background-color: ${({ colors }) => colors.primary};
    height: ${({ height }) => height ? height : mScale(50)}px;
    border-radius: ${mScale(4)};
`
const Text = styled.Text`
    font-size: ${({fontSize})=>fontSize ? fontSize : mScale(16)}px;
    color: ${({ colors }) => colors.backgroundColor};
`
