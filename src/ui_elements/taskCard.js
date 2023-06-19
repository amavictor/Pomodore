import styled from "styled-components/native"
import { mScale, vScale } from '../infrastructure/utilities/utilFunctions';
import { PlayIcon } from "./taskIcons/taskIcons";
import { useContext, useLayoutEffect, useRef } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { View, Animated } from "react-native";
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';
export const TaskCard = ({
    title,
    time,
    icon,
    ...otherProps
}) => {

    const { colors } = useContext(ThemeContext)

    const cardRef = useRef(null)

    // useEffect(() => {
    //     (function feedBack() {
    //         cardRef.current.measure((x, y, width, height, pageX, pageY) => {
    //             const scrollThreshold = vScale(60);
    //             if (scrollThreshold === pageY) {
    //                 Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    //             }
    //         })
    //     })()
    // }, [])

    // useLayoutEffect(() => {
    //     (function feedBack() {
    //         cardRef.current.measure((x, y, width, height, pageX, pageY) => {
    //             const scrollThreshold = vScale(60);
    //             if (scrollThreshold === pageY) {
    //                 Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    //             }
    //         })
    //     })()
    // },[])
    console.log(icon)
    return (
        <Container
            style={{
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: mScale(5),
                },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            }}
            colors={colors}
            ref={cardRef}
            {...otherProps}
        >
            <ViewContainer>
                {icon}
                <View>
                    <Title colors={colors}>{title}</Title>
                    <Time>{time} minutes</Time>
                </View>
            </ViewContainer>
            <PlayIcon />
        </Container>
    )
}

const Container = styled(Animated.View)`
    width: 100%;
    height:${mScale(80)}px;
    padding: ${mScale(10)}px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color:${({ colors }) => colors.backgroundColor};
    border-radius: ${mScale(14)}px;
`
const Title = styled.Text`
    font-size:${mScale(18)}px;
    font-weight:600;
    margin-bottom:${mScale(5)}px; ;
    color:${({ colors }) => colors.textColor};
`
const Time = styled.Text`
    font-size:${mScale(12)}px;
    font-weight:400;
    color:gray;
`
const ViewContainer = styled.View`
    flex-direction:row;
    align-items:center;
    gap:${mScale(30)}px;
`