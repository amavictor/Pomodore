import { useContext } from "react"
import {
    SafeAreaView,
    View,
    Text,
    Platform,
    Image
} from "react-native";
import styled from "styled-components/native"
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { mScale } from '../../../infrastructure/utilities/utilFunctions';
import { Button } from "../../../ui_elements/buttons";


export const GetIn = ({ navigation }) => {

    const { colors } = useContext(ThemeContext)

    return (
        <Container colors={colors}>
            <View>
                <GetStartedText colors={colors}>Get Started Today!</GetStartedText>
            </View>

            <ButtonContainer>
                <Button outline={true}>
                    <ButtonContent>
                        <SocialImage source={require("../../../../assets/icons/google.png")} />
                        <SocialText colors={colors}>Continue with Google</SocialText>
                    </ButtonContent>
                </Button>

                {Platform.OS === "ios" &&
                    <Button outline={true}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: mScale(10) }}>
                            <SocialImage source={require("../../../../assets/icons/google.png")} />
                            <SocialText colors={colors}>Continue with Google</SocialText>
                        </View>
                    </Button>
                }
            </ButtonContainer>

            <LineContainer>
                <Line colors={colors} />
                <Text>Or</Text>
                <Line colors={colors} />
            </LineContainer>

            <PasswordButtonContainer>
                <Button
                    width={() => `${mScale(100)}px`}
                    onPress={() => navigation.navigate("login")}
                >Sign in with password</Button>
            </PasswordButtonContainer>

            <AccountText colors={colors}>Don't have an account?
                <SignUpText
                    onPress={() => navigation.navigate("signUp")}
                    colors={colors}>
                    Sign up
                </SignUpText>
            </AccountText>



        </Container>
    )
}



const Container = styled.View`
    height: 100%;
    background-color: ${({ colors }) => colors.backgroundColor};
    align-items: center;
    justify-content: center;
    gap: ${mScale(40)}px;
    width: 100%;
    padding-horizontal:${mScale(20)}px;
`
const GetStartedText = styled.Text`
    font-size: ${mScale(35)}px;
    font-weight: 700;
    color: ${({ colors }) => colors.textColor};
`
const ButtonContainer = styled.View`
    gap: ${mScale(30)}px;
    width: 100%;
`
const Line = styled.View`
    border-bottom-color: ${({ colors }) => colors.lineColor};
    border-bottom-width: 1px;
    width:${mScale(150)}px;
    margin-horizontal:${mScale(5)}px;
`
const LineContainer = styled.View`
    align-self: center;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    margin-bottom: ${mScale(10)}px;
`
const PasswordButtonContainer = styled(View)`
    width: 100%;
`
const ButtonContent = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${mScale(10)}px;
`
const SocialText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    font-weight: 600;
`
const SocialImage = styled.Image`
    width: ${mScale(20)}px;
    height: ${mScale(20)}px;
`
const AccountText = styled.Text`
    color: ${({ colors }) => colors.textColor};
`
const SignUpText = styled.Text`
    color: ${({ colors }) => colors.primary};
`