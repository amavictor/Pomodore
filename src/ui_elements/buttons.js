import styled from "styled-components/native"
import { useContext } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { mScale } from '../infrastructure/utilities/utilFunctions';


export const Button = ({
    children,
    width,
    height,
    fontSize,
    outline,
    ...otherProps
  }) => {
  const { colors } = useContext(ThemeContext);
  
  
    return (
      <ButtonElement
        colors={colors}
        activeOpacity={0.8}
        height={height}
        width={width}
        fontSize={fontSize}
        outline={outline} // Added outline prop here
        {...otherProps}
      >
        <ButtonText colors={colors} fontSize={fontSize}>
          {children}
        </ButtonText>
      </ButtonElement>
    );
  };
  
  const ButtonElement = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ width }) => (width ? width + 'px' : "100%")};
    background-color: ${({ colors, outline }) =>
      outline ? 'transparent' : colors.primary};
    height: ${({ height }) => (height ? height : mScale(50))}px;
    border-width: ${({ outline }) => (outline ? '2px' : '0')};
    border-color: ${({ colors, outline }) =>
      outline ? colors.buttonOutlineColor : 'transparent'};
    border-radius: ${mScale(25)}px;
    shadow-color: ${({ colors, outline }) => colors.primary};
    shadow-offset: ${mScale(2)}px ${mScale(10)}px;
    shadow-opacity: 0.25;
    shadow-radius: 15px;
    elevation: 2;
  `;
  
  const ButtonText = styled.Text`
    font-size: ${({ fontSize }) => (fontSize ? fontSize : mScale(16))}px;
    font-weight: 600;
    color: ${({ colors }) => colors.backgroundColor};
  `;
  