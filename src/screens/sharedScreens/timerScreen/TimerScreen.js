import { Text, View, Image, Button } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import Animated from "react-native-reanimated";
import { SharedElement } from 'react-navigation-shared-element';
import styled from "styled-components/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useContext, useRef, useState, useEffect } from "react";
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';


export const TimerScreen = ({ route }) => {
    const { colors } = useContext(ThemeContext);
    const { item } = route.params;
    const insets = useSafeAreaInsets();
    const progressRef = useRef(null);

    const [remainingTime, setRemainingTime] = useState(item.workingSessions);
    const [timeDisplay, setTimeDisplay] = useState("");



    useEffect(() => {
        setTimeout(() => {
            if (remainingTime > 0) {
                formatTime(remainingTime);
                setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
            }
        }, 1000);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60)
        setTimeDisplay(`${minutes}:${remainingSeconds}`)
    };

    const play = () => {
        progressRef.current.play()
    };

    const pause = () => {
        progressRef.current.pause()
    };

    const restart = () => {
        progressRef.current.reAnimate()
    };

    const stop = () => {
        setIsRunning(false)
        setRemainingTime(item.workingSession)
        progressRef.current.reAnimate()
    };

    return (
        <Container insets={insets} colors={colors}>
            <CardContainer>
                <TaskCard
                    title={item.title}
                    time={remainingTime}
                    icon={item.taskIcon}

                />
            </CardContainer>

            <TimerContainer>
                <CircularProgress
                    value={remainingTime}
                    radius={mScale(100)}
                    progressValueColor={colors.textColor}
                    activeStrokeColor={colors.primary}
                    inActiveStrokeColor={colors.primary}
                    inActiveStrokeOpacity={0.3}
                    inActiveStrokeWidth={20}
                    activeStrokeWidth={18}
                    ref={progressRef}
                />
            </TimerContainer>

        </Container>
    )
}


const Container = styled.View`
    flex:1;
    width:100% ;
    padding-top:${({ insets }) => insets.top}px;
    background-color:${({ colors }) => colors.backgroundColor};
    align-items:center;
    padding-horizontal:${mScale(20)}px;
`

const TimerContainer = styled.View`
    flex:0.8;
    width:100%;
    padding-top:${vScale(50)}px; 
    align-items:center;
`

const CardContainer = styled.View`
    width:100%;
    flex:0.2;
    margin-top:${vScale(50)}px;
`