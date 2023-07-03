import { Text } from "react-native"
import styled from "styled-components/native"
import { mScale, vScale } from "../../../infrastructure/utilities/utilFunctions"
import { useContext, useState } from "react"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { Input } from "../../../ui_elements/input"
import { AuthContext } from "../../../infrastructure/authContext/authContext"
import { Button } from "../../../ui_elements/buttons"
import { useNavigation } from "@react-navigation/native"


export const EditProfile = () => {

    const { colors } = useContext(ThemeContext)
    const { user, setUser } = useContext(AuthContext)

    const [editInfo, setEditInfo] = useState({
        firstname: "",
        lastname: "",
    })

    const navigation = useNavigation()

    const updateProfile = async () => {
        const { firstname, lastname } = editInfo
        const newData = {
            firstname: firstname,
            lastname: lastname
        }
        try {
            await AsyncStorage.mergeItem("@user", JSON.stringify(...newData))
        }
        catch (e) {
            
        }

        navigation.goBack()
    }
    return (
        <EditContainer colors={colors}>
            <Title>
                <Text
                    style={{
                        fontSize: mScale(18),
                        color: colors.textColor,
                        fontWeight: 600
                    }}
                >
                    Edit Profile
                </Text>
            </Title>

            <Form>
                <Text
                    style={{
                        marginBottom: vScale(20),
                        fontSize: mScale(14),
                        color: colors.textColor
                    }}
                >You can only edit your first and last name</Text>
                <InputContainer>
                    <Input
                        label="First Name"
                        placeholder="First name"
                        value={editInfo.firstname}
                        onChangeText={(text) => setEditInfo({ ...editInfo, firstname: text })}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        label="Last Name"
                        placeholder="Last name"
                        value={editInfo.lastname}
                        onChangeText={(text) => setEditInfo({ ...editInfo, lastname: text })}
                    />
                </InputContainer>

                <ButtonContainer>
                    <Button
                        onPress={updateProfile}
                    >Edit Profile</Button>
                </ButtonContainer>

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
const ButtonContainer = styled.View`
    margin-top: ${vScale(20)}px;
`