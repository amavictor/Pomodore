import { View, Text } from "react-native"
import styled from "styled-components/native"
import { mScale, vScale } from "../../../infrastructure/utilities/utilFunctions"
import { useContext } from "react"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { Input } from "../../../ui_elements/input"


export const EditProfile = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <EditContainer colors={colors}>
            <Title>
                <Text
                    style={{
                        fontSize: mScale(18),
                        color: colors.textColor,
                        fontWeight: 600
                    }}
                >Edit Profile</Text>
            </Title>

            <Form>
                <Text
                    style={{
                        marginBottom: vScale(20),
                        fontSize: mScale(14),
                        color:colors.textColor
                    }}
                >You can only edit your first and last name</Text>
                <InputContainer>
                    <Input
                        label="First Name"
                        placeholder="First name"
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        label="Last Name"
                        placeholder="Last name"
                    />
                </InputContainer>

            </Form>
        </EditContainer>
    )
}


const EditContainer = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({ colors }) => colors.backgroundColor};
`
const Title = styled.View`
    width: 100%;
    padding: ${vScale(20)}px;
`

const Form = styled.View`
    flex:0.8%;
    padding-horizontal:${mScale(20)}px;
`
const InputContainer = styled.View`
    margin-vertical: ${vScale(10)}px;
`