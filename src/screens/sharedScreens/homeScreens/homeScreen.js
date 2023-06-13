import styled from "styled-components/native"
import { View, Text } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    return (
        <HomeContainer insets={insets}>
            <Text>This is a lie</Text>
        </HomeContainer>
    )
}

const HomeContainer = styled.View`
    flex: 1;
    padding-top: ${({insets})=>insets.top}px;
`

