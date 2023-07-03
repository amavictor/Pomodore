import styled from "styled-components/native"
import {
    View,
    KeyboardAvoidingView,
    Modal,
} from "react-native"
import { useColorScheme } from "react-native"
import { Input } from "../../../ui_elements/input"
import {
    useContext,
    useState,
    useEffect,
    useRef
} from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Entypo } from '@expo/vector-icons';
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button } from "../../../ui_elements/buttons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from "react-native-reanimated";



const ModalPopUp = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <ModalBackground>
                <ModalContainer style={{ transform: [{ scale: scaleValue }] }}>
                    {children}
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
};

export const ResetPassword = ({ navigation }) => {
    const { colors } = useContext(ThemeContext)
    const colorScheme = useColorScheme()
    const insets = useSafeAreaInsets()

    const [modalVisibility, setModalVisibility] = useState(true)

    const resetPassword = () => {
        setModalVisibility(true)
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
        >
            <BackgroundContainer colors={colors} inset={insets}>

                    <PassImage source={require("../../../../assets/icons/password-reset.png")} />
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
                <RememberContainer>
                    <BouncyCheckbox
                        size={18}
                        fillColor={colors.primary}
                    />
                    <RememberText>Remember me</RememberText>
                </RememberContainer>

                <ContinueButton onPress={() => null}>Continue</ContinueButton>

            </BackgroundContainer>
        </KeyboardAvoidingView>

    )
}


const BackgroundContainer = styled.View`
    background-color: ${({ colors }) => colors.backgroundColor};
    height:100%;
    justify-content:center;
    align-items:center;
    gap:${vScale(20)}px;
    padding-horizontal:${mScale(20)}px;
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

const ModalBackground = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled(Animated.View)`
  width: 80%;
  background-color: white;
  padding-horizontal: 20px;
  padding-vertical: 30px;
  border-radius: 20px;
  elevation: 20;
`;

const PassImage = styled.Image`
    width:100%;
    height:40%;
    resize-mode:contain;
`