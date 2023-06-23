import { Text, View, Image } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import { SharedElement } from "react-navigation-shared-element";


export const TimerScreen = ({ route }) => {
    const { dataItem } = route.params;
    return (
        <View style={{ flex: 1, width: '100%' }}>

            <Text>I am a timer!!</Text>
        </View>
    );
};