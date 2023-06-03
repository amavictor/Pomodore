import styled from "styled-components/native"
import { Dimensions, FlatList } from "react-native"
import { LottieViewComponent } from "../../../infrastructure/themes/lottiView/lottieView"
import { useContext } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Button } from "../../../ui_elements/buttons";
import { mScale } from '../../../infrastructure/utilities/utilFunctions';


export const OnBoardingScreen = () => {
    const {colors} = useContext(ThemeContext)
    const { width, height } = Dimensions.get("window")

    const slides = [
        {
            id: '1',
            image: require('../../../../assets/onBoardingImages/slide1.png'),
            title: 'Easy task & work management with Pomo'
        },
        {
            id: '2',
            image: require('../../../../assets/onBoardingImages/slide2.png'),
            title: 'Track your productivity and gain insights'
        },
        {
            id: '3',
            image: require('../../../../assets/onBoardingImages/slide3.png'),
            title: 'Boost your productivity now and be successful'
        },

    ]

    return (
        <SafeArea>
            <OnBoardingContainer>
                <Slider
                    height={height}
                    data={slides}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=> <Slide item={item}/>}
                />
                
            </OnBoardingContainer>
        </SafeArea>
    )
}

const SafeArea = styled.SafeAreaView``

const OnBoardingContainer = styled.View`
    padding: ${mScale(25)}px;
    flex: 1;
`
const Slider = styled(FlatList).attrs(({ height }) => ({
    contentContainerStyle: {
      height: height * 0.75
    }
    
}))``;