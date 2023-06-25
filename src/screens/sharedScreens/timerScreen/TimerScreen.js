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

    const [remainingTime, setRemainingTime] = useState(item?.workingSessions * 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
            console.log(remainingTime);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [remainingTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <Container insets={insets} colors={colors}>
            <CardContainer>
                <TaskCard title={item.title} time={item?.workingSessions} icon={item.taskIcon} />
            </CardContainer>

            <TimerContainer>
                <CircularProgress
                    initialValue={remainingTime}
                    value={remainingTime}
                    radius={mScale(130)}
                    progressValueColor={colors.textColor}
                    activeStrokeColor={colors.primary}
                    inActiveStrokeColor={colors.primary}
                    inActiveStrokeOpacity={0.3}
                    inActiveStrokeWidth={20}
                    activeStrokeWidth={mScale(25)}
                    title={formatTime(remainingTime)}
                    titleColor={colors.textColor}
                    titleFontSize={mScale(60)}
                    clockwise={true}
                    strokeColorConfig={[
                        { color: 'red', value: 0 },
                        { color: 'skyblue', value: 50 },
                        { color: 'yellowgreen', value: 100 },
                    ]}
                    titleStyle={{
                        fontWeight: 600,
                    }}
                    progressValueStyle={{
                        display: "none",
                    }}
                    ref={progressRef}
                />
                <FocusedText colors={colors}>Stay focused for {item?.workingSessions} minutes</FocusedText>
            </TimerContainer>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-top: ${({ insets }) => insets.top}px;
    background-color: ${({ colors }) => colors.backgroundColor};
    align-items: center;
    padding-horizontal: ${mScale(20)}px;
  `;

const TimerContainer = styled.View`
    flex: 0.8;
    width: 100%;
    padding-top: ${vScale(50)}px;
    align-items: center;
  `;

const CardContainer = styled.View`
    width: 100%;
    flex: 0.2;
    margin-top: ${vScale(50)}px;
  `;

const FocusedText = styled.Text`
    color: ${({ colors }) => colors.textColor};
    margin-top: ${mScale(20)}px;
  `;