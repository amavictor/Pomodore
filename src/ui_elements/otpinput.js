import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { useContext } from 'react';
import { mScale } from '../infrastructure/utilities/utilFunctions';




export const OTPInput = ({ length, setOtp }) => {
    const [otpArray, setOtpArray] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);
    const { colors } = useContext(ThemeContext)

    const handleOtpChange = (index, value) => {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = value;
        setOtpArray(newOtpArray);
        setOtp(newOtpArray.join('')); 

        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0 && !otpArray[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <Container>
            {Array(length)
                .fill()
                .map((_, index) => {
                    const isActive = index === otpArray.length;

                    return (
                        <Input
                            colors={colors}
                            key={index}
                            index={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            value={otpArray[index]}
                            onChangeText={(value) => handleOtpChange(index, value)}
                            onKeyPress={({ nativeEvent: { key } }) =>
                                handleOtpKeyPress(index, key)
                            }
                            keyboardType="numeric"
                            maxLength={1}
                            isActive={isActive}
                        />
                    );
                })}
        </Container>
    );
};

const Container = styled.View`
  flex-direction: row;
  gap:25%;
`;

const Input = styled.TextInput`
  width: ${mScale(60)}px;
  height: ${mScale(60)}px;
  border-radius: ${mScale(4)}px;
  font-size: ${mScale(20)}px;
  text-align: center;
  font-weight:600;
  color:${({colors})=>colors.primary} ;
  background-color: ${({ isActive, colors }) =>
        isActive ? colors.activeInputBackground : colors.buttonOutlineColor};
`;