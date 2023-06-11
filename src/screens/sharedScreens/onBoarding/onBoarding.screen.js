import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList, Text } from "react-native";
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext";
import { mScale } from "../../../infrastructure/utilities/utilFunctions";
import { Button } from "../../../ui_elements/buttons";



const { width } = Dimensions.get("window");

export const OnBoardingScreen = ({navigation}) => {
  const { colors } = useContext(ThemeContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef(null)

  const slides = [
    {
      id: "1",
      image: require("../../../../assets/onBoardingImages/slide1.png"),
      title: "Easy task & work management with Pomo",
    },
    {
      id: "2",
      image: require("../../../../assets/onBoardingImages/slide2.png"),
      title: "Track your productivity and gain insights",
    },
    {
      id: "3",
      image: require("../../../../assets/onBoardingImages/slide3.png"),
      title: "Boost your productivity now and be successful",
    },
  ];

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const nextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      ref?.current?.scrollToOffset({ offset, animated: true })
      setCurrentSlideIndex(nextSlideIndex)
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current?.scrollToOffset({ offset, animated: true })
    setCurrentSlideIndex(lastSlideIndex)
  }

  return (
    <OnBoardingContainer colors={colors}>
      <Slider
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Footer
        slides={slides}
        currentSlideIndex={currentSlideIndex}
      />

      <ButtonContainer>
        {
          currentSlideIndex === slides.length - 1
            ?
            <Button onPress={()=>navigation.navigate("getIn")}>Get Started</Button>
            :
            <>
              <Button onPress={nextSlide}>Next</Button>
              <SkipButton onPress={skip}>Skip</SkipButton>
            </>
        }

      </ButtonContainer>
    </OnBoardingContainer>
  );
};

const Slide = ({ item }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <StyledView width={width}>
      <OnBoardImage source={item.image} />
      <StyledText
        colors={colors}
      >{item.title}</StyledText>
    </StyledView>
  );
};

const Footer = ({ slides, currentSlideIndex }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <StyledFooterContainer>
      <StyledIndicatorContainer>
        {slides.map((_, index) => (
          <StyledIndicator
            key={index}
            currentSlideIndex={currentSlideIndex}
            colors={colors}
            index={index}
          />
        ))}
      </StyledIndicatorContainer>
    </StyledFooterContainer>
  );
};

const OnBoardingContainer = styled.View`
  background-color: ${({ colors }) => colors.backgroundColor};
  padding-top: ${mScale(100)}px;
  width: 100%;
  flex: 1;
  align-items: center;
`;

const Slider = styled(FlatList).attrs({
  contentContainerStyle: {
    alignItems: "center",
  }
})`
  flex: 0.8;
`;
const ButtonContainer = styled.View`
  margin-top: 10%;
  width:100%;
  gap:${mScale(10)}px;
  padding-horizontal: ${mScale(20)}px;
`
const OnBoardImage = styled.Image`
  width: 100%;
  height: 75%;
  resize-mode: contain;
  align-self: center;
`;

const StyledView = styled.View`
  width: ${({ width }) => width && width}px;
  
`;

const SkipButton = styled(Button)`
  margin-top: 10px;
`

const StyledText = styled.Text`
  font-size: ${mScale(26)}px;
  font-weight: bold;
  margin-top: ${mScale(20)}px;
  text-align: center;
  width: 80%;
  align-self: center;
  color: ${({ colors }) => colors.textColor};
`;

const StyledFooterContainer = styled.View`
  height: 100px;
  justify-content: space-between;
  padding-horizontal: 20px;
`;

const StyledIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const StyledIndicator = styled.View`
  height: ${mScale(5)}px;
  width: ${({ index, currentSlideIndex }) =>
    index === currentSlideIndex ? mScale(40) + "px" : mScale(10) + "px"
  };
  background-color: ${({ colors, index, currentSlideIndex }) =>
    index === currentSlideIndex ? colors.primary : colors.onBoardingIndicator
  };
  margin-horizontal: 10px;
  border-radius: 50px;
`;