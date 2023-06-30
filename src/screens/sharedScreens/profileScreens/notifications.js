import { useContext } from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"
import { ThemeContext } from "../../../infrastructure/utilities/themeContext/themeContext"
import { vScale, mScale } from "../../../infrastructure/utilities/utilFunctions"


export const Notifications = () => {
  const { colors } = useContext(ThemeContext)
  return (
    <NotificationContainer colors={colors}>
      <Title>
        <Text
          style={{
            fontSize: mScale(18),
            color: colors.textColor,
            fontWeight: 600
          }}
        >Notifications</Text>
      </Title>

      <Body>
        <Text
          style={{
            color: "grey"
          }}
        >You have no notifications at this time</Text>
      </Body>

    </NotificationContainer>
  )
}

const NotificationContainer = styled.View`
  background-color: ${({ colors }) => colors.backgroundColor};
  flex: 1;
  width: 100%;
`

const Title = styled.View`
    width: 100%;
    padding: ${vScale(20)}px;
`
const Body = styled.View`
  width: 100%;
  flex: 0.8;
  padding-horizontal: ${mScale(20)}px;
  justify-content: center;
  align-items: center;
`
