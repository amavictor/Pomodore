import styled from "styled-components/native"
import { View, Text, Animated } from "react-native"
import { TaskCard } from "../../../ui_elements/taskCard"
import { useRef, useContext } from "react"
import { mScale, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { TaskContext } from "../../../infrastructure/utilities/taskContext/taskContext"



export const TaskScreen = () => {

    const scrollY = useRef(new Animated.Value(0)).current
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const { tasks, setTasks } = useContext(TaskContext)

    // const diffClamp = Animated.diffClamp(scrollY, 0, vScale(60))

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, vScale(60)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, vScale(60)],
        outputRange: [0, -vScale(60)],
        extrapolate: "clamp",
    });



    return (
        <TaskContainer
            insets={insets}
            colors={colors}
        >
            <TaskHeader
                style={{
                    opacity: headerOpacity,
                    transform: [{ translateY: headerTranslateY }],
                }}
            >
                <TaskText colors={colors}>All tasks ({tasks.length})</TaskText>
            </TaskHeader>
            {
                tasks.length > 0 ?

                    <Animated.FlatList
                        data={tasks}
                        contentContainerStyle={{
                            padding: mScale(20),
                            gap: vScale(10)
                        }}
                        keyExtractor={item => item.title}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                -1,
                                0,
                                mScale(93) * index,
                                mScale(93) * (index + 2)
                            ]
                            const opacityInputRange = [
                                -1,
                                0,
                                mScale(93) * index,
                                mScale(93) * (index + .5)
                            ]
                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange: [1, 1, 1, 0],
                                extrapolate: "clamp"
                            })
                            const opacity = scrollY.interpolate({
                                inputRange: opacityInputRange,
                                outputRange: [1, 1, 1, 0],
                                extrapolate: "clamp"
                            })

                            return <Animated.View
                                style={{
                                    opacity,
                                    transform: [{ scaleX: scale }, { scaleY: scale }],
                                }}
                            >
                                <TaskCard
                                    key={index}
                                    index={index}
                                    title={item.title}
                                    time={item.workingSessions}
                                    icon={item.taskIcon}
                                    allTasks={tasks}
                                    setAllTasks={setTasks}
                                    specificTask={item}
                                />
                            </Animated.View>
                        }}

                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )
                        }
                        scrollEventThrottle={16}
                    >
                    </Animated.FlatList>

                    :
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: mScale(16),
                                color: "gray"
                            }}
                        >You have no activities</Text>
                    </View>

            }

        </TaskContainer>

    )
}

const TaskContainer = styled(Animated.View)`
    flex: 1;
    padding-top:${({ insets }) => insets.top};
    background-color:#FAFAFA;
    
`
const TaskHeader = styled(Animated.View)`
    flex-direction: row;
    height:${mScale(30)}px;
    padding-horizontal:${mScale(20)}px;
    align-items: center;
`

const TaskText = styled.Text`
    font-size:${mScale(18)}px;
    font-weight:600;
    color:${({ colors }) => colors.textColor};
`