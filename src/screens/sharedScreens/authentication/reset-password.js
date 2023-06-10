import styled from "styled-components/native"
import {
    View,
    Text,
    KeyboardAvoidingView,
    Modal
} from "react-native"
import { useColorScheme } from "react-native"
import { Input } from "../../../ui_elements/input"
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button } from "../../../ui_elements/buttons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';




export const ResetPassword = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const colorScheme = useColorScheme()
    const insets = useSafeAreaInsets()

    const [modalVisibility, setModalVisibility] = useState(true)

    const resetPassword = () => {

    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisibility}
            >
                <ModalContainer colors={colors}>
                    <ModalContainer>

                    </ModalContainer>
                </ModalContainer>
            </Modal>
            <BackgroundContainer colors={colors} inset={insets}>

                <SecurityImage
                    source={require("../../../../assets/password-reset.png")}
                />

                <KeyboardAvoidingView behavior="padding">
                    <InputsContainer>
                        <Input
                            placeholder="Password"
                            KeyboardAppearance={colorScheme}
                            KeyboardType="default"
                            clearButtonMode="unless-editing"
                            password={true}
                            IconStart={() => <Entypo name="lock" size={20} color={colors.textColor} />}
                        />
                        <Input
                            placeholder="Confirm Password"
                            KeyboardAppearance={colorScheme}
                            KeyboardType="default"
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

                <ContinueButton onPress={() => null}>Continue</ContinueButton>

            </BackgroundContainer>
        </>

    )
}


const BackgroundContainer = styled.ScrollView.attrs(({ inset }) => ({
    contentContainerStyle: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: vScale(20),
        paddingHorizontal: mScale(20)
    }
}))`
    background-color: ${({ colors }) => colors.backgroundColor};
    height:100%;
  `;

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

const SecurityImage = styled.Image`
    width:100%;
    height:${mScale(200)}px; ;
`
const ContinueButton = styled(Button)`
    margin-top:${mScale(80)}px;
`

const ModalContainer = styled.View`
    background-color:${({ colors }) => colors?.backgroundColor};
    height:70%;
    width: 70%;
`
