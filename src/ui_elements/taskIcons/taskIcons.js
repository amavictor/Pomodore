import { TaskIconBackground } from "../taskIconBackground"
import { Entypo, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styled from "styled-components/native"; 
import { mScale } from "../../infrastructure/utilities/utilFunctions";
import { useContext } from 'react';
import { ThemeContext } from '../../infrastructure/utilities/themeContext/themeContext';


export const ReadingIcon = () => {
    return (
        <TaskIconBackground>
            <Ionicons name="book" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const AudioIcon = () => {
    return (
        <TaskIconBackground>
            <FontAwesome name="music" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const CodingIcon = () => {
    return (
        <TaskIconBackground>
            <Entypo name="code" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const ExerciseIcon = () => {
    return (
        <TaskIconBackground>
            <FontAwesome5 name="dumbbell" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const MeditationIcon = () => {
    return (
        <TaskIconBackground>
            <MaterialCommunityIcons name="meditation" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const LaptopIcon = () => {
    return (
        <TaskIconBackground>
            <AntDesign name="laptop" size={20} color="white" />
        </TaskIconBackground>
    )
}

export const PlayIcon = () => {
    const {colors} = useContext(ThemeContext)
    return (
        <PlayIconBackground>
            <FontAwesome name="play-circle" size={20} color={colors.backgroundColor} />
        </PlayIconBackground>
    )
}

const PlayIconBackground = styled.View`
    width: ${mScale(30)}px;
    height: ${mScale(30)}px;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    background-color: #45d642;
`