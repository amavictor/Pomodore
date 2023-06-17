import styled from "styled-components/native"
import { View, Text, Animated } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import {
    AudioIcon,
    MeditationIcon,
    ReadingIcon,
    ExerciseIcon,
    CodingIcon,
} from "../../../ui_elements/taskIcons/taskIcons"
import { useRef, useContext } from "react"
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';


export const TaskScreen = () => {

    const scrollY = useRef(new Animated.Value(0)).current
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)

    const taskData = [
        {
            title: "Sing",
            time: "57 minutes",
            icon: <AudioIcon />
        },
        {
            title: "Pray",
            time: "57 minutes",
            icon: <MeditationIcon />
        },
        {
            title: "Read",
            time: "57 minutes",
            icon: <ReadingIcon />
        },
        {
            title: "Gym",
            time: "57 minutes",
            icon: <ExerciseIcon />
        },
        {
            title: "Code",
            time: "57 minutes",
            icon: <CodingIcon />
        },
        {
            title: "Sing",
            time: "57 minutes",
            icon: <AudioIcon />
        },
        {
            title: "Pray",
            time: "57 minutes",
            icon: <MeditationIcon />
        },
        {
            title: "Read",
            time: "57 minutes",
            icon: <ReadingIcon />
        },
        {
            title: "Gym",
            time: "57 minutes",
            icon: <ExerciseIcon />
        },
        {
            title: "Code",
            time: "57 minutes",
            icon: <CodingIcon />
        },
        {
            title: "Code",
            time: "57 minutes",
            icon: <CodingIcon />
        },
        {
            title: "Sing",
            time: "57 minutes",
            icon: <AudioIcon />
        },
        {
            title: "Pray",
            time: "57 minutes",
            icon: <MeditationIcon />
        },
        {
            title: "Read",
            time: "57 minutes",
            icon: <ReadingIcon />
        },
        {
            title: "Gym",
            time: "57 minutes",
            icon: <ExerciseIcon />
        },
        {
            title: "Code",
            time: "57 minutes",
            icon: <CodingIcon />
        },
    ]

    const diffClamp = Animated.diffClamp(scrollY, 0, mScale(60))

    const headerOpacity = diffClamp.interpolate({
        inputRange: [0, mScale(60)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const headerTranslateY = diffClamp.interpolate({
        inputRange: [0, mScale(60)],
        outputRange: [0, -mScale(60)],
        extrapolate: "clamp",
    });


    return (
        <TaskContainer
            insets={insets}
            colors={colors}
        >
            <TaskHeader
                style={{
                    opacity: headerOpacity,
                    transform: [{ translateY: headerTranslateY }],
                }}
            >
                <TaskText colors={colors}>Today's Task (16)</TaskText>
            </TaskHeader>
            <Animated.FlatList
                data={taskData}
                contentContainerStyle={{
                    padding: mScale(20),
                    gap: vScale(10)
                }}
                keyExtractor={item => item.title}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        mScale(93) * index,
                        mScale(93) * (index + 2)
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        mScale(93) * index,
                        mScale(93) * (index + .5)
                    ]
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                        extrapolate: "clamp"
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                        extrapolate: "clamp"
                    })

                    scrollY

                    return <TaskCard
                        key={index}
                        index={index}
                        title={item.title}
                        time={item.time}
                        icon={item.icon}
                        style={{
                            opacity,
                            transform: [{ scale }]
                        }}
                    />
                }}

                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )
                }
                // scrollEventThrottle={16}
            >
            </Animated.FlatList>
        </TaskContainer>

    )
}

const TaskContainer = styled(Animated.View)`
    flex: 1;
    padding-top:${({ insets }) => insets.top};
    background-color:#FAFAFA;
    
`
const TaskHeader = styled(Animated.View)`
    flex-direction: row;
    height:${mScale(60)}px;
    padding-horizontal:${mScale(20)}px;
    align-items: center;
`

const TaskText = styled.Text`
    font-size:${mScale(18)}px;
    font-weight:600;
    color:${({ colors }) => colors.textColor};
`