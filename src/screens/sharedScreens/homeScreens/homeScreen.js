import styled from "styled-components/native"
import { View, Text, Animated, PanResponder } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Backdrop, BackdropSubheader } from "@react-native-material/core";
import { useState, useContext, useRef } from "react";
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from "react-native-circular-progress-indicator";

export const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const pan = useRef(new Animated.Value(0)).current
    const [backDropRevealed, setBackdropRevealed] = useState(false)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 0; // Enable pan responder only when swiping down
            },
            onPanResponderMove: (_, gestureState) => {
                pan.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    setBackdropRevealed(true);
                } else {
                    setBackdropRevealed(false);
                }
                Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
            },
        })
    ).current;
    return (
        <HomeContainer insets={insets}>
            <Backdrop
                revealed={backDropRevealed}
                header={<BackdropHeaderComponent />}
                backLayer={<BackLayerComponent />}
                style={{
                    backgroundColor: colors.primary
                }}
            >
                <PanArea {...panResponder.panHandlers} />
                <HomeContentContainer insets={insets} colors={colors}>
                    <StatusCard
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
                        <CircularProgressContainer>
                            <CircularProgress

                            />
                        </CircularProgressContainer>
                        <TextView>
                            <StatusText colors={colors}>Wow you're almost there, don't give up!</StatusText>
                            <CompletedText colors={colors}>12 0f 12 completed</CompletedText>
                        </TextView>
                    </StatusCard>

                    <SeeAllMenu>
                        <Task colors={colors}>Today Tasks(0)</Task>
                        <SeeText colors={colors}>See All</SeeText>
                    </SeeAllMenu>
                </HomeContentContainer>
            </Backdrop>

        </HomeContainer>
    );
};


const BackdropHeaderComponent = () => {
    return (
        <BackdropHeaderContainer>
            <MorningText>Morning Victor!</MorningText>
            <Ionicons name="notifications-outline" size={30} color="white" />
        </BackdropHeaderContainer>
    )
}

const BackLayerComponent = () => {
    return (
        <BackLayerContainer>
            <BackLayerText>It was said in the days of old, "make hay while the sun shines".
                We still live byt that till date
            </BackLayerText>
            <AuthorText>Ben Larson...</AuthorText>
        </BackLayerContainer>
    )
}

//backdrop styles 
const BackdropHeaderContainer = styled.View`
    width:100%;
    height:${mScale(100)}px;
    justify-content:space-between;
    align-items:center;
    padding-horizontal:${mScale(20)}px;
    flex-direction:row;
`
const MorningText = styled.Text`
    color:"green" ;
    font-size:${mScale(30)}px;
    color:#ffff;
    font-weight:600;
`
const BackLayerContainer = styled.View`
    height:${mScale(100)}px;
    padding-horizontal: ${mScale(20)}px;
`
const BackLayerText = styled.Text`
    font-size:${mScale(14)}px;
    color: white;
`
const AuthorText = styled.Text`
    font-size:${mScale(14)}px;
    color: white;
    font-weight:800;
    margin-top:${mScale(10)};
`


//Styles
const HomeContainer = styled.View`
    flex:1;
    padding-top:${({ insets }) => insets.top}px;
`

const HomeContentContainer = styled(Animated.View)`
    flex: 1;
    /* padding-top: ${({ insets }) => insets.top}px; */
    background-color:${({ colors }) => colors.background};
    padding-bottom:${({ insets }) => insets.bottom}px;
    padding-horizontal: ${mScale(20)}px !important;
`
const PanArea = styled.View`
    width:100%;
    height: ${mScale(20)}px;
    background-color:transparent;
`
const StatusCard = styled.View`
    background-color:${({ colors }) => colors.backgroundColor};
    align-self:center;
    width:100%;
    height:${mScale(150)}px;
    border-radius:${mScale(14)}px;
    flex-direction:row;
    padding:${mScale(20)}px;
    gap:${mScale(20)}px;
`
const CircularProgressContainer = styled.View`

`
const StatusText = styled.Text`
    font-weight:700;
    font-size:${mScale(18)}px;
    color:${({colors})=>colors.textColor};
`
const CompletedText = styled.Text`
    font-size:${mScale(12)}px;
    color:gray;
    margin-top:${mScale(10)}px;
`
const TextView = styled.View`
    justify-content:center;
    width:${mScale(190)}px;
    align-items:flex-start;
`
const HomeContent = styled.ScrollView`

`
const SeeAllMenu = styled.View`
    flex-direction:row;
    justify-content:space-between;
    margin-vertical: ${vScale(30)}px;
`
const Task = styled.Text`
    font-weight:600;
    font-size:${mScale(16)}px;
    color:${({ colors })=>colors.textColor};
`
const SeeText = styled.Text`
    font-size:${mScale(16)}px;
    font-weight:600;
    color:${({ colors }) => colors.primary};
`