import styled from "styled-components/native"
import { mScale } from '../infrastructure/utilities/utilFunctions';
import { PlayIcon } from "./taskIcons/taskIcons";
import { useContext } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { View } from "react-native";
export const TaskCard = ({
    title,
    time,
    icon
}) => {

    const { colors } = useContext(ThemeContext)

    return (
        <Container
            style={{
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: mScale(10),
                },
                shadowOpacity: 0.1,
                shadowRadius: 20,
            }}
            colors={colors}
        >
            <ViewContainer>
                {icon}
                <View>
                    <Title colors={colors}>{title}</Title>
                    <Time>{time}</Time>
                </View>
            </ViewContainer>
            <PlayIcon />
        </Container>
    )
}

const Container = styled.View`
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
    font-size:${mScale(16)}px;
    font-weight:500;
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