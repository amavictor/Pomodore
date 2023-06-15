import styled from "styled-components"
export const TaskCard = ({
    imageSource,
    title,
    time
}) => {
    return (
        <View>
            <Image />
            <View>
                <Text>{title}</Text>
                <Text>{time}</Text>
            </View>
            <Image/>
        </View>
    )
}
