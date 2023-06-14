import styled from "styled-components/native"
import { View, Text } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Backdrop, BackdropSubheader } from "@react-native-material/core";
import { useState, useContext } from "react";
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';

export const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    const {colors} = useContext(ThemeContext)
    
    const [backDropRevealed, setBackDropRevealed] = useState(true)
    return (
        <HomeContainer insets={insets}>
            <Backdrop
                revealed={backDropRevealed}
                header={<BackdropHeaderComponent />}
                headerHeight={"150%"}
            >
                <HomeContentContainer
                    insets={insets}
                    colors={colors}
                >
                    <Text>This is a lie</Text>
                </HomeContentContainer>
            </Backdrop>
        </HomeContainer>


    )
}


const BackdropHeaderComponent = () => {
    const {colors} = useContext(ThemeContext)
    return (
        <BackdropContainer colors={colors} >

        </BackdropContainer>
    )
}

//backdrop styles 
const BackdropContainer = styled.View`
    width:100%;
    height:5%;
    background-color:${({colors})=>colors.primary};

`


//Styles
const HomeContainer = styled.View`
    flex:1;
    padding-top:${({ insets }) => insets.top}px;
`

const HomeContentContainer = styled.ScrollView`
    flex: 1;
    padding-top: ${({ insets }) => insets.top}px;
    background-color:${({ colors }) => colors.background};
    padding-bottom:${({insets})=>insets.bottom}px;
`

