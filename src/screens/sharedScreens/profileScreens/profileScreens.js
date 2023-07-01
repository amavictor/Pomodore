import {
    useContext,
    useRef,
    useState,
    useEffect,
    useCallback
} from "react"
import {
    Text,
    TouchableWithoutFeedback,
    View,
    Animated,
    Platform,
    UIManager,
    LayoutAnimation,
    Alert
} from "react-native"
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
import { CustomBackdrop } from "../../../ui_elements/bottomSheetBackDrop"
import {
    BottomSheetModalProvider,
    TouchableOpacity,
    BottomSheetModal
} from "@gorhom/bottom-sheet"
import { Camera } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { AuthContext } from "../../../infrastructure/authContext/authContext"
import { signOutUser } from "../../../infrastructure/utilities/firebaseUtils/firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"



if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}

export const ProfileScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets()
    const {
        colors,
        setPrimary
    } = useContext(ThemeContext)

    const [showColorPallete, setShowColorPallete] = useState(false)
    const [image, setImage] = useState(null)
    const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions()
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()
    const snapPoints = ["35%"]
    const bottomSheetModalRef = useRef(null)

    const { user, setUser } = useContext(AuthContext)

    console.log(user)



    useEffect(() => {
        if (route.params?.imageFromCamera) {
            setImage(route.params?.imageFromCamera)
            bottomSheetModalRef?.current?.close()
        }
    }, [route.params?.imageFromCamera])

    const handleSelectImageSource = () => {
        bottomSheetModalRef.current?.present()
    }


    const handleCamera = useCallback(() => {
        if (!cameraPermission) {
            requestCameraPermission()
        }
        if (!cameraPermission?.granted) {
            Alert.alert('Camera permission denied', 'Would you like to grant camera permission?', [
                {
                    text: "Request permission",
                    onPress: () => {
                        requestCameraPermission()
                        navigation.push('camera')
                    }
                }, {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ])
        }
        else {
            navigation.navigate('camera')
        }
    }, [cameraPermission])

    const signOutCurrentUser = async () => {

        try {
            await AsyncStorage.removeItem("@user")
            setUser(null)
            signOutUser()
        }
        catch (e) {
            Alert.alert("There was a problem signing out.")
        }

      
    }

    const selectImageFromGallery = async () => {

        const { status } = await requestMediaPermission()

        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
        else {
            let imageResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            if (!imageResult.canceled) {
                setImage(imageResult?.assets[0]?.uri)
                bottomSheetModalRef?.current?.close()
            } else {
                Alert.alert('You did not select any image.');
            }
        }
    }



    return (
        <BottomSheetModalProvider>
            <TouchableWithoutFeedback
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                    setShowColorPallete(false)
                }}
            >
                <BackgroundContainer
                    colors={colors}
                    insets={insets}
                >
                    <BackgroundScroll>
                        <ProfileDetails>
                            <AvatarContainer
                                onPress={handleSelectImageSource}
                            >
                                <Stack center spacing={4}>
                                    <Avatar
                                        icon={props => <Icon name="account" {...props} />}
                                        size={150}
                                        color={colors.buttonOutlineColor}
                                        tintColor={colors.primary}
                                        image={image && { uri: image }}
                                    />
                                </Stack>
                                <EditIcon
                                    source={require("../../../../assets/icons/pencil.png")}
                                />
                            </AvatarContainer>

                            <UserDetails>
                                <Text>Full name</Text>
                                <Text>{user?.email}</Text>
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
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: mScale(14),
                                        color: "white"
                                    }}
                                >This project is open source and available on GitHub.
                                    Your contribution will be appreciated.
                                    If you're learning React native and want to help,
                                    fork the project and contribute!
                                </Text>
                            </NoticeContainer>

                        </ProfileDetails>
                        <OtherItems>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("edit-profile")}
                            >
                                <ItemRow>
                                    <AntDesign name="user" size={27} color="black" />
                                    <ItemText>Edit Profile</ItemText>
                                </ItemRow>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("notifications")}
                            >
                                <ItemRow>
                                    <Ionicons name="notifications-outline" size={27} color="black" />
                                    <ItemText>Notifications</ItemText>
                                </ItemRow>
                            </TouchableOpacity>

                            <TouchableOpacity
                            // onPress={() => navigation.navigate("security")}
                            >
                                <ItemRow>
                                    <MaterialIcons name="security" size={27} color="black" />
                                    <ItemText>Security</ItemText>
                                </ItemRow>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => !showColorPallete ? setShowColorPallete(true) : null}>
                                <ItemRow>
                                    <Ionicons name="color-fill-outline" size={27} color="black" />
                                    <ItemText>Color theme</ItemText>
                                    {
                                        showColorPallete &&
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
                                                color={colors.primary}
                                                onColorChange={(newColor) => setPrimary(newColor)}
                                                thumbSize={20}
                                                sliderSize={20}
                                            />
                                        </ColorPickerContainer>
                                    }
                                </ItemRow>
                            </TouchableOpacity>

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

                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert(
                                        "Sign out?",
                                        "Are you sure you want to sign out?",
                                        [
                                            {
                                                text: "Sign out",
                                                onPress: signOutCurrentUser,
                                                style: "destructive",
                                            },
                                            { text: 'Stay', onPress: () => 0 },
                                        ]
                                    )
                                }}
                            >
                                <ItemRow>
                                    <AntDesign name="logout" size={27} color="black" />
                                    <ItemText>Logout</ItemText>
                                </ItemRow>
                            </TouchableOpacity>
                        </OtherItems>
                    </BackgroundScroll>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        backgroundStyle={{
                            borderRadius: 25,
                            backgroundColor: `${colors.backgroundColor}`
                        }}
                        handleIndicatorStyle={{
                            backgroundColor: `${colors.primary}`
                        }}
                        backdropComponent={CustomBackdrop}
                    >
                        <BottomSheetContentContainer>
                            <Source colors={colors}>Select image source</Source>
                            <SourceContainer>
                                <SourceBackground
                                    colors={colors}
                                    activeOpacity={0.7}
                                    onPress={handleCamera}
                                >
                                    <SourceImages source={require("../../../../assets/icons/camera.png")} />
                                </SourceBackground>
                                <SourceBackground
                                    colors={colors}
                                    onPress={selectImageFromGallery}
                                    activeOpacity={0.7}
                                >
                                    <SourceImages source={require("../../../../assets/icons/gallery.png")} />
                                </SourceBackground>
                            </SourceContainer>
                        </BottomSheetContentContainer>
                    </BottomSheetModal>
                </BackgroundContainer>
            </TouchableWithoutFeedback>
        </BottomSheetModalProvider>

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
    padding: ${mScale(20)}px;
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

const BottomSheetContentContainer = styled.View`
    width: 100%;
    align-items: center;
    align-self: center;
    padding-top: ${vScale(50)}px;
    height: 100%;
    gap: 20%;
`
const Source = styled.Text`
    font-size: ${mScale(16)}px;
    color: ${({ colors }) => colors.textColor};
    font-weight: 500;
    margin-top: ${vScale(-30)}px;
`
const SourceContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap:50%;
`
const SourceBackground = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: ${mScale(60)}px;
    height: ${mScale(60)}px;
    background-color: ${({ colors }) => colors.buttonOutlineColor};
    border-radius: 50%;
`
const SourceImages = styled.Image`
    width: ${mScale(35)}px;
    height: ${mScale(35)}px;
`