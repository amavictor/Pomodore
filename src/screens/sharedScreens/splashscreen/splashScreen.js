
import React from 'react'
import styled from 'styled-components/native'
import { mScale } from '../../../infrastructure/utilities/utilFunctions'

export const SplashScreen = () => {
    return (
        <SplashContainer>
            <LogoLetter>P</LogoLetter>
            <Logodescription>Pomodoro</Logodescription>
        </SplashContainer>
    )
}

const SplashContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #ef5d5d;
`
const LogoLetter = styled.Text`
    font-size: ${mScale(200)}px;
    text-align: center;
    margin-left: ${mScale(60)}px;
    font-weight: 800;
    color:white;

`
const Logodescription = styled.Text`
    font-size: ${mScale(30)}px;
    color: white;
    font-weight: 600;
`

