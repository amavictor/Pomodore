import styled from "styled-components/native"
import {
    KeyboardAvoidingView,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native"
import {
    useContext,
    useRef,
    useState,
    useEffect,
    useCallback
} from "react"
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { Stack, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Input } from "../../../ui_elements/input";
import { Button } from "../../../ui_elements/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomBackdrop } from "../../../ui_elements/bottomSheetBackDrop";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import { AuthContext } from "../../../infrastructure/authContext/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FillProfile = ({ navigation, route }) => {
    const { colors } = useContext(ThemeContext)
    const insets = useSafeAreaInsets()
    const bottomSheetModalRef = useRef(null)
    const [image, setImage] = useState(null)
    const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions()

    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()
    const { setLoggedIn, setUser, user } = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState({
        firstname: "",
        lastname: ""
    })



    useEffect(() => {
        if (route.params?.imageFromCamera) {
            setImage(route.params?.imageFromCamera)
            bottomSheetModalRef?.current?.close()
        }
    }, [route.params?.imageFromCamera])

    const snapPoints = ["20%"]
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
                        navigation.navigate('camera')
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

    const enterApp = async () => {
        const updatedUser = {
            ...user,
            image: image,
            ...userDetails
        };

        setUser({ ...user, image: image, ...userDetails });

        try {
            await AsyncStorage.mergeItem("@user", JSON.stringify(updatedUser));
            setLoggedIn(true);
        } catch (e) {
            Alert.alert(e.message);
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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        alignItems: "center"
                    }}
                    behavior={"padding"}
                >
                    <BackgroundContainer colors={colors} insets={insets}>
                        <TitleContainer>
                            <TitleText colors={colors}>Fill your profile</TitleText>
                            <TitleDescription colors={colors}>
                                Don't worry you can always change this later or you can skip this for now
                            </TitleDescription>
                        </TitleContainer>
                        <ProfileDetailsContainer>
                            <AvatarContainer
                                onPress={handleSelectImageSource}
                            >
                                <Stack center spacing={4}>
                                    {/* <Avatar label="Kent Dodds" autoColor />
                            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} /> */}
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

                            <InputContainer>
                                <Input
                                    placeholder="Firstname"
                                    value={userDetails?.firstname}
                                    onChangeText={(text) => setUserDetails({ ...userDetails, firstname: text })}
                                />
                                <Input
                                    placeholder="Lastname"
                                    value={userDetails?.email}
                                    onChangeText={(text) => setUserDetails({ ...userDetails, lastname: text })}
                                />
                            </InputContainer>

                        </ProfileDetailsContainer>
                        <ButtonContainer>
                            <Button width={mScale(160)}
                                alternate
                                onPress={() => enterApp()}
                            >Skip</Button>
                            <Button
                                width={mScale(160)}
                                onPress={() => enterApp()}
                            >Start</Button>
                        </ButtonContainer>

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
                </KeyboardAvoidingView>

            </TouchableWithoutFeedback>
        </BottomSheetModalProvider>

    )
}



const BackgroundContainer = styled.View`
    background-color: ${({ colors }) => colors.backgroundColor};
    padding-top:${({ insets }) => insets.top}px; 
    padding-bottom: ${({ insets }) => insets.bottom}px;
    flex:1;
    justify-content:center;
    align-items:center;
    padding-horizontal: ${mScale(20)}px;
    gap:100%;
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
const AvatarContainer = styled.TouchableOpacity`
    position: relative;
    width: 100%;
    align-self: center;
`
const EditIcon = styled.Image`
    position: absolute;
    bottom:${mScale(10)}px;
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
const BottomSheetContentContainer = styled.View`
    width: 100%;
    align-items: center;
    align-self: center;
    justify-content: center;
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