import styled from "styled-components/native"
import { View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native"
import { useContext } from "react"
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { mScale } from '../../../infrastructure/utilities/utilFunctions';
import { Stack, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Input } from "../../../ui_elements/input";
import { Button } from "../../../ui_elements/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export const FillProfile = () => {
    const { colors } = useContext(ThemeContext)
    const insets = useSafeAreaInsets()
    return (

        <BackgroundContainer colors={colors} insets={insets}>
            <TitleContainer>
                <TitleText colors={colors}>Fill your profile</TitleText>
                <TitleDescription colors={colors}>
                    Don't worry you can always change this later or you can skip this for now
                </TitleDescription>
            </TitleContainer>
            <ProfileDetailsContainer>
                <AvatarContainer>
                    <Stack center spacing={4}>
                        {/* <Avatar label="Kent Dodds" autoColor />
                            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} /> */}
                        <Avatar
                            icon={props => <Icon name="account" {...props} />}
                            size={150}
                            color={colors.buttonOutlineColor}
                            tintColor={colors.primary}
                        />
                    </Stack>
                    <EditIcon
                        source={require("../../../../assets/icons/pencil.png")}
                    />
                </AvatarContainer>
                <KeyboardAvoidingView>
                    <InputContainer>
                        <Input
                            placeholder="Full name "
                        />
                        <Input
                            placeholder="Nickname"
                        />
                    </InputContainer>
                </KeyboardAvoidingView>


            </ProfileDetailsContainer>
            <ButtonContainer>
                <Button width={`${mScale(160)}}`} alternate>Skip</Button>
                <Button width={`${mScale(160)}}`}>Start</Button>
            </ButtonContainer>
        </BackgroundContainer>

    )
}



const BackgroundContainer = styled.View` 
    padding-top: ${({ insets }) => insets.top}px;
    flex: 1;
    padding-horizontal: ${mScale(20)}px;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 80%;
    background-color: ${({ colors }) => colors.backgroundColor};
`
const TitleContainer = styled.View`
    
`
const TitleText = styled.Text`
    font-size: ${mScale(30)}px;
    color: ${({ colors }) => colors.textColor};
    font-weight: 700;
    text-align: center;
`
const TitleDescription = styled.Text`
    color: ${({ colors }) => colors.textColor};
    text-align: center;
`
const ProfileDetailsContainer = styled.View`
    gap: 25%;
`
const AvatarContainer = styled.View`
    position: relative;
    width: 100%;
    align-self: center;
`
const EditIcon = styled.Image`
    position: absolute;
    bottom:${mScale(20)}px;
    right:0;
    width: ${mScale(20)}px;
    height: ${mScale(20)}px;
`
const InputContainer = styled.View`
    width:100%;
    gap: 25%;
`
const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 20%;
    justify-content: center;
`