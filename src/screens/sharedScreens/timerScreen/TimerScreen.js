import { Text, View, Image, TouchableWithoutFeedback } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import Animated from "react-native-reanimated";
import { SharedElement } from 'react-navigation-shared-element';
import styled from "styled-components/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useContext, useRef, useState, useEffect, useCallback } from "react";
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from "../../../ui_elements/buttons"
import { useFocusEffect } from "@react-navigation/native";



export const TimerScreen = ({ route, navigation, params }) => {
    const { colors } = useContext(ThemeContext);
    const { item } = route.params;
    const insets = useSafeAreaInsets();
    const [showBottomNav, setShowBottomNav] = useState(true);
    const [remainingTime, setRemainingTime] = useState(item?.workingSessions * 60);
    const [play, setPlay] = useState(false);
    const timerProgressRef = useRef(null);
    const [maxValue, setMaxValue] = useState(item?.workingSessions * 60);

    useEffect(() => {
        let intervalId;

        if (play) {
            intervalId = setInterval(() => {
                setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [play]);

    useEffect(() => {
        if (remainingTime === 0) {
            setPlay(false);
        }
    }, [remainingTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible: showBottomNav
        });
    }, [showBottomNav]);

    const hideBottomNav = () => {
        setShowBottomNav(!showBottomNav);
    };

    const start = () => {
        setPlay(prevPlay => !prevPlay);
        if (!play) {
            timerProgressRef.current.play();
        } else {
            timerProgressRef.current.pause();
        }
    };

    const restart = () => {
        setRemainingTime(item?.workingSessions * 60)
        timerProgressRef.current.reAnimate()
        setPlay(false)
    }

    const stop = () => {
        setPlay(false);
        setRemainingTime(item?.workingSessions * 60);
    };
    return (
        <TouchableWithoutFeedback onPress={hideBottomNav}>
            <Container insets={insets} colors={colors}>
                <CardContainer>
                    <TaskCard title={item.title} time={item?.workingSessions} icon={item.taskIcon} />
                </CardContainer>

                <TimerContainer>
                    <CircularProgress
                        ref={timerProgressRef}
                        initialValue={remainingTime}
                        value={remainingTime}
                        maxValue={maxValue}
                        radius={130}
                        progressValueColor={colors.textColor}
                        activeStrokeColor={colors.primary}
                        inActiveStrokeColor={colors.primary}
                        inActiveStrokeOpacity={0.3}
                        inActiveStrokeWidth={20}
                        activeStrokeWidth={25}
                        title={formatTime(remainingTime)}
                        titleColor={colors.textColor}
                        titleFontSize={60}
                        clockwise={true}
                        strokeColorConfig={[
                            { color: 'red', value: ((remainingTime * 60 ) * 0.25) /60 },
                            { color: 'yellow', value: ((remainingTime * 60) * 0.5) / 60},
                            { color: '#45d642', value: ((remainingTime * 60) * 1)/60 },
                        ]}
                        titleStyle={{
                            fontWeight: '600',
                        }}
                        progressValueStyle={{
                            display: 'none',
                        }}
                    />
                    <FocusedText colors={colors}>Stay focused for {Math.round(remainingTime / 60)} minutes</FocusedText>
                    <ButtonContainer>
                        <Buttons
                            colors={colors}
                            onPress={restart}
                        >
                            <MaterialCommunityIcons name="restart" size={24} color="gray" />
                        </Buttons>
                        <Buttons
                            colors={colors}
                            style={{
                                width: mScale(80),
                                height: mScale(80),
                                backgroundColor: colors.primary
                            }}
                            onPress={() => start()}
                        >
                            {
                                play ? <FontAwesome name="pause" size={24} color="white" />
                                    :
                                    <FontAwesome name="play" size={30} color="white" />
                            }

                        </Buttons>
                        <Buttons 
                            colors={colors}
                            onPress={stop}
                        >
                            <Entypo name="controller-stop" size={24} color="gray" />
                        </Buttons>
                    </ButtonContainer>

                    <BreaksContainers>
                        <Button
                            fontSize={mScale(12)}
                            width={100}
                            height={mScale(45)}
                            alternate={true}
                        >Long break</Button>
                        <Button
                            width={100}
                            height={mScale(45)}
                            fontSize={mScale(12)}
                        >Short break</Button>
                    </BreaksContainers>

                </TimerContainer>

            </Container>
        </TouchableWithoutFeedback>
    );
};

const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-top: ${({ insets }) => insets.top}px;
    background-color: ${({ colors }) => colors.backgroundColor};
    align-items: center;
    padding-horizontal: ${mScale(20)}px;
  `

const TimerContainer = styled.View`
    flex: 0.9;
    width: 100%;
    padding-top: ${vScale(40)}px;
    align-items: center;
  `;

const CardContainer = styled.View`
    width: 100%;
    flex: 0.1;
    margin-top: ${vScale(20)}px;
  `;

const FocusedText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    margin-top: ${mScale(20)}px;
  `
const ButtonContainer = styled.View`
    flex-direction: row;
    width:100%;
    justify-content:center;
    margin-top:${vScale(20)}px; 
    gap:25%;
    align-items: center;
`

const Buttons = styled.Pressable`
    width:${mScale(50)}px;
    height:${mScale(50)}px;
    background-color:${({ colors }) => colors.buttonOutlineColor}; 
    border-radius:50%;
    display:flex;
    align-Items:center;
    justify-content: center;
`
const BreaksContainers = styled.View`
    width:100%;
    flex-direction: row;
    justify-content: center;
    gap:30%;
    margin-top: ${vScale(20)}px;
`