import { Text, View, Image, TouchableWithoutFeedback } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
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
    const {
        item,
        setCompletedTasks,
    } = route.params
    const insets = useSafeAreaInsets();
    const [remainingTime, setRemainingTime] = useState(item?.workingSessions * 60);
    const [longBreak, setLongBreak] = useState(item?.longBreak * 60)
    const [shortBreak, setShortBreak] = useState(item?.shortBreak * 60)
    const [breakActive, setBreakActive] = useState(false)
    const [breakType, setBreakType] = useState("")
    const [play, setPlay] = useState(false);
    const timerProgressRef = useRef(null);
    const [maxValue, setMaxValue] = useState(item?.workingSessions * 60);
    const [longBreakComplete, setLongBreakComplete] = useState(false)
    const [shortBreakComplete, setShortBreakComplete] = useState(false)

    useEffect(() => {
        let intervalId;

        if (play && remainingTime > 0) {
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
            return onComplete()
        }
    }, [remainingTime]);

    useEffect(() => {
        let intervalId;
        if (play === false && breakActive) {
            if (longBreak > 0) {
                intervalId = setInterval(() => {
                    setLongBreak(prevLongBreak => prevLongBreak - 1);
                }, 1000)
            } else if (longBreak < 0) {
                clearInterval(intervalId);
            }
        }


        return () => {
            clearInterval(intervalId);
        };
    }, [longBreak, breakActive, play])

    useEffect(() => {
        let intervalId;
        if (play === false && breakActive) {
            if (shortBreak > 0) {
                intervalId = setInterval(() => {
                    setShortBreak(prevLongBreak => prevLongBreak - 1);
                }, 1000)
            } else if (shortBreak < 0) {
                clearInterval(intervalId);
            }
        }


        return () => {
            clearInterval(intervalId);
        };
    }, [shortBreak, breakActive, play])

    useEffect(() => {
        if (longBreak === 0) {
            setPlay(true);
            setLongBreak(0)
            setBreakActive(false)
            setLongBreakComplete(true)
            return
        }
    }, [longBreak]);

    useEffect(() => {
        if (shortBreak === 0) {
            setPlay(true);
            setLongBreak(0)
            setBreakActive(false)
            setShortBreakComplete(true)
            return
        }
    }, [shortBreak]);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };


    const startLongBreak = () => {
        setPlay(false);
        setBreakType("Long")
        setBreakActive(true)
    };

    const startShortBreak = () => {
        setPlay(false);
        setBreakType("Long")
        setBreakActive(true)
    };


    const start = () => {
        if (remainingTime === 0) {
            return
        }
        setPlay(prevPlay => !prevPlay);
        if (!play) {
            timerProgressRef.current.play();
        } else {
            timerProgressRef.current.pause();
        }
    };

    const restart = () => {
        setRemainingTime(item?.workingSessions * 60)
        setMaxValue(item?.workingSessions * 60)
        timerProgressRef.current.reAnimate()
        setPlay(false)
    }

    const onComplete = () => {
        const updatedItem = { ...item, completed: true };
        setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks,updatedItem ])
        navigation.navigate("Home")
    }



    const stop = () => {
        setPlay(false);
        setRemainingTime(item?.workingSessions * 60);
    };
    return (
        <TouchableWithoutFeedback>
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
                            { color: 'red', value: ((remainingTime * 60) * 0.25) / 60 },
                            { color: 'yellow', value: ((remainingTime * 60) * 0.5) / 60 },
                            { color: '#45d642', value: ((remainingTime * 60) * 1) / 60 },
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
                        {
                            !longBreakComplete ?
                                <Button
                                    fontSize={mScale(12)}
                                    width={100}
                                    height={mScale(45)}
                                    alternate={true}
                                    onPress={startLongBreak}
                                    disabled={breakActive}
                                >Long break</Button>
                                :
                                null
                        }

                        {
                            !shortBreakComplete ?
                                <Button
                                    width={100}
                                    height={mScale(45)}
                                    fontSize={mScale(12)}
                                    onPress={startShortBreak}
                                    disabled={breakActive}

                                >Short break</Button>
                                :
                                null
                        }


                    </BreaksContainers>
                    {
                        breakActive &&
                        <BreakText colors={colors}>
                            <Text style={{ fontWeight: 600 }}>{formatTime(longBreak)}</Text> of {breakType} break remaining
                        </BreakText>
                    }



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

const BreakText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    margin-top: ${vScale(20)}px;
`