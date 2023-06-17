import { View, Text, Animated } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import {
    AudioIcon,
    MeditationIcon,
    ReadingIcon,
    ExerciseIcon,
    CodingIcon,
} from "../../../ui_elements/taskIcons/taskIcons"
import { useRef, useState } from "react"


export const TaskScreen = () => {

    const scrollY = useRef(new Animated.Value(0)).current
    const [inputRange, setInputRange] = useState(null)

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



    return (
        <Animated.ScrollView
            contentContainerStyle={{
                alignItems: "center",   
                padding:10
            }}
            onScroll={
                Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {useNativeDriver:true}
                )
            }
        >
            {taskData.map((task, index) => (
                <TaskCard
                    key={index}
                    index={index}
                    title={task.title}
                    time={task.time}
                    icon={task.icon}
                />
            ))}
        </Animated.ScrollView>
    )
}

