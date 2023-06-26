import styled from "styled-components/native"
import { mScale, vScale } from '../infrastructure/utilities/utilFunctions';
import { PlayIcon } from "./taskIcons/taskIcons";
import { useContext, useLayoutEffect, useRef } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { View, Animated, PanResponder, Image, UIManager, LayoutAnimation, Text } from "react-native";
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';



if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}
export const TaskCard = ({
    title,
    time,
    icon,
    deleteTask,
    onPress,
    ...otherProps }) => {
    const { colors } = useContext(ThemeContext);
    const pan = useRef(new Animated.Value(0)).current;
    const deleteIconScale = useRef(new Animated.Value(1)).current;
    const deleteThreshold = -110;

    const panResponder = useRef(
        PanResponder.create({
            // onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return (
                    (Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3) && gestureState.dx < -10) ||
                    (Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3) && gestureState.dx > -1000)
                );
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < -10 || gestureState.dx > -150) {
                    pan.setValue(gestureState.dx);
                }
                const scale = Math.max(-(gestureState.dx) / 100, 0.5);
                Animated.spring(deleteIconScale, {
                    toValue: scale,
                    useNativeDriver: true,
                    duration: 0,
                }).start();

                if (gestureState.dx < deleteThreshold) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < deleteThreshold) {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    deleteTask()
                } else {
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
                Animated.spring(deleteIconScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 150,
                }).start();
            },
        })
    ).current;

    return (
        <Body
            colors={colors}
            {...otherProps}
        >
            <Container
                style={{
                    elevation: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: mScale(2)
                    },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    transform: [{ translateX: pan }],
                }}
                colors={colors}
                {...panResponder.panHandlers}
            >
                <ViewContainer
                    onPress={onPress}
                >
                    {icon}
                    <View>
                        <Title colors={colors}>{title}</Title>
                        <Time>{time} minutes</Time>
                    </View>
                </ViewContainer>
                <PlayIcon onPress={ onPress} />
            </Container>
            <Text
                style={{
                    position: "absolute",
                    top: "40%",
                    left: mScale(10),
                    zIndex: -1,
                    color: colors.textColor,
                    fontSize:mScale(10)
                }}
            >Swipe Left to delete</Text>
            <Animated.Image
                source={require("../../assets/icons/delete.png")}
                style={{
                    width: mScale(20),
                    height: mScale(20),
                    position: "absolute",
                    top: "40%",
                    right: mScale(20),
                    zIndex: -1,
                    transform: [{ scale: deleteIconScale }],
                }}
            />
        </Body>
    );
};
const Container = styled(Animated.View)`
    width: 100%;
    height: ${mScale(80)}px;
    padding: ${mScale(10)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ colors }) => colors.backgroundColor};
    border-radius: ${mScale(14)}px;
  `;

const Title = styled.Text`
    font-size: ${mScale(18)}px;
    font-weight: 600;
    margin-bottom: ${mScale(5)}px;
    color: ${({ colors }) => colors.textColor};
  `;

const Time = styled.Text`
    font-size: ${mScale(12)}px;
    font-weight: 400;
    color: gray;
  `;

const ViewContainer = styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: ${mScale(30)}px;
    width: 87%;
  `;

const Body = styled.View`
    width: 100%;
    position: relative;
    background-color: ${({ colors }) => colors.alternatePrimary};
    border-radius: ${mScale(14)}px;
  `;