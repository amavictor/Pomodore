import styled from "styled-components/native"
import { useState, useRef } from "react"
import { CameraType, Camera } from "expo-camera"
import { mScale } from '../../../../infrastructure/utilities/utilFunctions';

export const CameraComponent = ({ navigation }) => {
    const [cameraType, setCameraType] = useState(CameraType.front)
    const cameraRef = useRef(null)

    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef?.current?.takePictureAsync()
            navigation.navigate({
                name: "fillProfile",
                params: {
                    imageFromCamera: photo.uri
                },
                merge: true
            })
        }
    }
    
    const toggleType = () => {
        setCameraType(current => (current === CameraType.front ? CameraType.back : CameraType.front));
    }

    return (
        <CameraContainer>
            <CameraBody
                ref={(camera) => (cameraRef.current = camera)}
            >
                <CameraContent>
                    <FlipCameraContainer
                        onPress={toggleType}
                    >
                        <FlipCamera source={require("../../../../../assets/icons/flipCamera.png")} />
                    </FlipCameraContainer>

                    <SnapCircleContainer
                        onPress={snap}
                    >
                        <SnapCircle
                            source={require("../../../../../assets/icons/snap-circle.png")}
                        />
                    </SnapCircleContainer>

                </CameraContent>
            </CameraBody>
        </CameraContainer>
    )
}

const CameraContainer = styled.TouchableOpacity`
    flex:1;
    height: 100%;
    width: 100%;
`
const CameraContent = styled.View`
    flex:1;
    position: relative;

`
const FlipCameraContainer = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    right: 0;
`
const FlipCamera = styled.Image`
    width: ${mScale(35)}px;
    height: ${mScale(35)}px;
`
const CameraBody = styled(Camera)`
    height: 100%;
    width: 100%;
    padding: 10%;

`
const SnapCircle = styled.Image`
    width: ${mScale(80)}px;
    height: ${mScale(80)}px;
`
const SnapCircleContainer = styled.TouchableOpacity`
    position: absolute;
    bottom:10%;
    align-self: center;
`