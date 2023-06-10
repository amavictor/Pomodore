import styled from "styled-components/native"
import { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { ScrollView } from "react-native";
import { mScale } from '../../../infrastructure/utilities/utilFunctions';
import { OTPInput } from '../../../ui_elements/otpinput';
import { Button } from '../../../ui_elements/buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const OtpVerification = ({navigation}) => {
    const { colors } = useContext(ThemeContext)

    const [otp, setOtp] = useState('');
    const {inset} = useSafeAreaInsets()

    const handleOTPSubmit = () => {
        navigation.navigate("reset_password")
    };


    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                paddingVertical: inset,
            }}
            keyboardShouldPersistTaps="handled"
        >
            <VerificationContainer colors={colors}>
                <SentText colors={colors}>Code has been sent to +2340808977309</SentText>
                <OTPInput length={4} setOtp={setOtp} otp={otp} />
                <Submit
                    onPress={handleOTPSubmit}
                >Submit</Submit>
            </VerificationContainer>
       
        </ScrollView>
    )
}

const VerificationContainer = styled.View`
    flex:1;
    background-color:${({ colors }) => colors.backgroundColor};
    align-items:center;
    justify-content:center;
    padding-horizontal: ${mScale(20)}px;
    gap:40% ;
`

const SentText = styled.Text`
    color:${({ colors }) => colors.textColor};
`
const Submit = styled(Button)`
    
`