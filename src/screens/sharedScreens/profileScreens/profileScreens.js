import { useContext, useRef } from "react"
import { Text, TouchableWithoutFeedback, View,Animated } from "react-native"
import styled from "styled-components/native"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Stack, Avatar } from "@react-native-material/core"
import { mScale, vScale } from "../../../infrastructure/utilities/utilFunctions"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, Switch } from "react-native-gesture-handler"
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPicker from "react-native-wheel-color-picker"



export const ProfileScreen = () => {
    const insets = useSafeAreaInsets()
    const {
        colors,
        primary,
        setPrimary
    } = useContext(ThemeContext)

    const [showColorPallete, setShowColorPallete] = useState(false)
    const pallete  = useRef(Animation.value(0))



    return (
        <TouchableWithoutFeedback
            onPress={setShowColorPallete(false)}
        >
            <BackgroundContainer
                colors={colors}
                insets={insets}
            >
                <BackgroundScroll>
                    <ProfileDetails>
                        <AvatarContainer
                        // onPress={handleSelectImageSource}
                        >
                            <Stack center spacing={4}>
                                {/* <Avatar label="Kent Dodds" autoColor />
                            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} /> */}
                                <Avatar
                                    icon={props => <Icon name="account" {...props} />}
                                    size={150}
                                    color={colors.buttonOutlineColor}
                                    tintColor={colors.primary}
                                // image={image && { uri: image }}
                                />
                            </Stack>
                            <EditIcon
                                source={require("../../../../assets/icons/pencil.png")}
                            />
                        </AvatarContainer>

                        <UserDetails>
                            <Text>Full name</Text>
                            <Text>Nickname</Text>
                        </UserDetails>

                        <NoticeContainer
                            colors={colors}
                            style={{
                                elevation: 20,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: mScale(5)
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 20
                            }}
                        >

                        </NoticeContainer>

                    </ProfileDetails>
                    <OtherItems>
                        <ItemRow>
                            <AntDesign name="user" size={27} color="black" />
                            <ItemText>Edit Profile</ItemText>
                        </ItemRow>
                        <ItemRow>
                            <Ionicons name="notifications-outline" size={27} color="black" />
                            <ItemText>Notifications</ItemText>
                        </ItemRow>
                        <ItemRow>
                            <MaterialIcons name="security" size={27} color="black" />
                            <ItemText>Security</ItemText>
                        </ItemRow>
                        <ItemRow>
                            <Ionicons name="color-fill-outline" size={27} color="black" />
                            <ItemText>Color theme</ItemText>
                            <ColorPickerContainer
                                colors={colors}
                                style={{
                                    elevation: 20,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: mScale(5)
                                    },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 20
                                }}
                            >
                                <ColorPicker
                                    onColorChange={(newColor) => setPrimary(newColor)}
                                    thumbSize={20}
                                    sliderSize={20}
                                />
                            </ColorPickerContainer>
                        </ItemRow>
                        <ItemRow
                            style={{
                                justifyContent: "space-between"
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: mScale(10)
                                }}
                            >
                                <Ionicons name="ios-color-fill" size={27} color="black" />
                                <ItemText>Dark theme</ItemText>
                            </View>
                            <Switch />

                        </ItemRow>
                    </OtherItems>
                </BackgroundScroll>
            </BackgroundContainer>
        </TouchableWithoutFeedback>

    )
}

const BackgroundContainer = styled.View`
    background-color: ${({ colors }) => colors.backgroundColor};
    flex: 1;
    width: 100%;
    padding-top: ${({ insets }) => insets.top}px;
    padding-horizontal: ${mScale(20)}px;

`

const BackgroundScroll = styled(ScrollView).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: vScale(100)
    }
})`
    flex: 1;
    width: 100%;
    padding-bottom: ${vScale(50)}px;
`

const ProfileDetails = styled.View`
    width: 100%;
    flex: 0.3;
    padding-top: ${vScale(20)}px;
`

const AvatarContainer = styled.TouchableOpacity`
    position: relative;
    align-self: center;
`

const EditIcon = styled.Image`
    position: absolute;
    bottom:${mScale(10)}px;
    right:0;
    width: ${mScale(20)}px;
    height: ${mScale(20)}px;
`

const OtherItems = styled.View`
    width: 100%;
    flex: 0.7;
    padding-top: ${vScale(50)}px;
`

const ItemRow = styled.View`
    flex-direction: row;
    gap: ${mScale(10)}px;
    align-items: center;
    margin-vertical: ${vScale(10)}px;
    position: relative;
`

const ItemText = styled.Text`
    font-size: ${mScale(15)}px;

`

const NoticeContainer = styled.View`
    width: 100%;
    height: ${vScale(100)}px;
    background-color: ${({ colors }) => colors.primary};
    border-radius: ${mScale(14)}px;
    margin-top:10%;
`
const UserDetails = styled.View`
    margin-top: ${vScale(20)}px;
    width: 100%;
    align-items: center;
`
const ColorPickerContainer = styled.View`
    position: absolute;
    background-color: white;
    right: ${mScale(50)}px;
    top:${vScale(-200)}px;
    border-radius: ${mScale(14)}px;
    padding: ${mScale(10)}px;
`