import styled from "styled-components/native";
import { useContext } from 'react';
import { ThemeContext } from '../infrastructure/utilities/themeContext/themeContext';
import { mScale, vScale } from '../infrastructure/utilities/utilFunctions';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export const Input = ({
  IconStart,
  IconEnd,
  password,
  options,
  date,
  time,
  showDatePicker,
  showTimePicker,
  containerStyle,
  dateValueFromPicker,
  timeValueFromPicker,
  ...otherProps
}) => {
  const { colors } = useContext(ThemeContext);

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const handleFocus = () => {
    setIsFocused(true);
    if(date) {
      showDatePicker();
    }
    else if (time) {
      showTimePicker();
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
  };


  return (
    <InputContainer colors={colors} focused={isFocused}
      style={containerStyle}
    >
      <IconContainer>{IconStart && <IconStart />}</IconContainer>
      <InputElement
        onFocus={handleFocus}
        onBlur={handleBlur}
        colors={colors}
        showSoftInputOnFocus={(date || time ) ? false : true}
        value={dateValueFromPicker ? dateValueFromPicker : timeValueFromPicker ? timeValueFromPicker : ''}
        secureTextEntry={password ? showPassword : false}
        {...otherProps}
      />
      {password && (
        <IconContainer>
          <Ionicons
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="black"
          />
        </IconContainer>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View`
  width: 100%;
  border-radius: ${mScale(6)}px;
  background-color: ${({ colors, focused }) => focused ? colors.activeInput : colors.buttonOutlineColor};
  height: ${mScale(60)}px;
  flex-direction: row;
  align-items: center;
  gap: ${mScale(20)}px;
  padding: ${mScale(10)}px;
  border-width: ${({ focused }) => focused ? 1 : 0}px;
  border-color: ${({ colors, focused }) => focused ? colors.primary : null};
`
const InputElement = styled.TextInput`
    width: 75%;
    color: ${({ colors }) => colors.textColor};
    font-weight: 500;
    height:100%
`
const IconContainer = styled.View`

`



