import styled from "styled-components/native"
import { useContext } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';

export const OtpVerification = () => {
    const {colors} = useContext(ThemeContext)
    return (
        <VerificationContainer colors={colors}>
            
        </VerificationContainer>
    )
}

const VerificationContainer = styled.View`
    flex:1;
    background-color:${({colors})=>colors.backgroundColor};
`