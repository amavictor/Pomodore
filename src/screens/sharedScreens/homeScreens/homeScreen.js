import styled from "styled-components/native"
import { View, Text, PanResponder, ScrollView, Button, Animated, TouchableOpacity, Pressable } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Backdrop, BackdropSubheader, Badge } from "@react-native-material/core";
import { useState, useContext, useRef, useEffect, useLayoutEffect } from "react";
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { getQuotes, mScale, removeTask, setTimeOfDay, vScale } from '../../../infrastructure/utilities/utilFunctions';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from "react-native-circular-progress-indicator";
import { TaskCard } from "../../../ui_elements/taskCard";
import { TaskContext } from "../../../infrastructure/utilities/taskContext/taskContext";
import { SharedElement } from "react-native-shared-element";
import { getQuote } from "../../../infrastructure/utilities/utilFunctions";



export const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const { tasks, setTasks } = useContext(TaskContext)
    const [homeTask, setHomeTask] = useState([])
    const pan = useRef(new Animated.Value(0)).current
    const [backDropRevealed, setBackdropRevealed] = useState(false)
    const [completedTask, setCompletedTask] = useState([])
    const [taskPercentage, setTaskPercentage] = useState(0)



    const calculateTaskPercentage = () => {
        if (completedTask.length > 0) {
            const total = (completedTask?.length / homeTask?.length) * 100;
            setTaskPercentage(total)
        }
    }




    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 0; // Enable pan responder only when swiping down
            },
            onPanResponderMove: (_, gestureState) => {
                pan.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    setBackdropRevealed(true);
                } else {
                    setBackdropRevealed(false);
                }
                Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
            },
        })
    ).current;

    const deleteTask = (tasks, item) => {
        const updatedTasks = tasks?.filter((activity) => activity.title !== item.title);
        setTasks(updatedTasks);
    };

    useEffect(() => {
        const currentDate = new Date();
        const currentTask = tasks.filter((item) => {
            const itemDate = new Date(item.date);
            return (
                itemDate.getFullYear() === currentDate.getFullYear() &&
                itemDate.getMonth() === currentDate.getMonth() &&
                itemDate.getDate() === currentDate.getDate()
            );
        });
        setHomeTask(currentTask)
        // calculateTaskPercentage()
    }, [tasks]);



    return (
        <HomeContainer insets={insets}>
            <Backdrop
                revealed={backDropRevealed}
                header={<BackdropHeaderComponent />}
                backLayer={<BackLayerComponent />}
                style={{
                    backgroundColor: colors.primary
                }}
            >
                <PanArea {...panResponder.panHandlers} />
                <HomeContentContainer insets={insets} colors={colors}>
                    <StatusCard
                        colors={colors}
                        style={{
                            elevation: 20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: mScale(5)
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 20
                        }}
                    >
                        <CircularProgressContainer>
                            <CircularProgress
                                value={taskPercentage}
                                title={`${taskPercentage}%`}
                                inActiveStrokeColor={colors.primary}
                                inActiveStrokeOpacity={0.2}
                                progressValueStyle={{
                                    display: "none"
                                }}
                                titleStyle={{
                                    fontSize: mScale(20),
                                    fontWeight: "bold",
                                }}
                                strokeColorConfig={[
                                    { color: 'red', value: 10 },
                                    { color: 'yellow', value: 50 },
                                    { color: '#45d642', value: 100 },
                                ]}
                            />
                        </CircularProgressContainer>
                        <TextView>
                            <StatusText colors={colors}>Today is a great day to Achieve results</StatusText>
                            <CompletedText colors={colors}>0 0f {homeTask?.length} completed</CompletedText>
                        </TextView>
                    </StatusCard>

                    <SeeAllMenu>
                        <Task colors={colors}>Today Tasks({homeTask?.length})</Task>
                        <Button color={`${colors.primary}`} title="See all" onPress={() => navigation.navigate("Task")} />
                    </SeeAllMenu>

                    <HomeContent
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            homeTask?.length > 0 ?
                                homeTask?.map((item, index) => (
                                    <TaskCard
                                        key={index}
                                        title={item.title}
                                        time={item.workingSessions}
                                        icon={item.taskIcon}
                                        onPress={() => { navigation.navigate("Timer", { item }) }}
                                        deleteTask={() => deleteTask(tasks, item)}
                                    />
                                ))
                                :
                                <Text
                                    style={{
                                        color: "grey",
                                        marginTop: "30%"
                                    }}
                                >You have no scheduled task for today</Text>
                        }

                    </HomeContent>

                </HomeContentContainer>
            </Backdrop>
        </HomeContainer>
    );
};


const BackdropHeaderComponent = () => {
    const insets = useSafeAreaInsets()
    const timeOfDay = setTimeOfDay()
    return (
        <BackdropHeaderContainer insets={insets}>
            <MorningText>{timeOfDay}, Victor!</MorningText>
            <NotificationContainer>
                <Badge
                    label={0}
                    showZero
                    color="white"
                    style={{
                        position: "absolute",
                        top: mScale(-10),
                        right: mScale(-10),
                    }}
                />
                <Ionicons name="notifications-outline" size={30} color="white" />
            </NotificationContainer>
        </BackdropHeaderContainer>
    )
}

const BackLayerComponent = () => {
    const quote = getQuote();
    return (
        <BackLayerContainer>
            <BackLayerText>
                {quote?.quote}
            </BackLayerText>
            <AuthorText>{quote.author}</AuthorText>
        </BackLayerContainer>
    );
};

//backdrop styles 
const BackdropHeaderContainer = styled.View`
    width:100%;
    height:${mScale(150)}px;
    justify-content:space-between;
    align-items:center;
    padding-horizontal:${mScale(20)}px;
    flex-direction:row;
    padding-top:${({ insets }) => insets.top}px;
    
`
const MorningText = styled.Text`
    color:"green" ;
    font-size:${mScale(24)}px;
    color:#ffff;
    font-weight:600;
`
const BackLayerContainer = styled.ScrollView`
    height:${mScale(100)}px;
    padding-horizontal: ${mScale(20)}px;
`
const BackLayerText = styled.Text`
    font-size:${mScale(14)}px;
    color: white;
`
const AuthorText = styled.Text`
    font-size:${mScale(14)}px;
    color: white;
    font-weight:800;
    margin-top:${mScale(10)};
`
const NotificationContainer = styled.View`
    position:relative;

`


//Styles
const HomeContainer = styled.View`
    flex:1;
`

const HomeContentContainer = styled(Animated.View)`
    flex: 1;
    /* padding-top: ${({ insets }) => insets.top}px; */
    background-color:${({ colors }) => colors.background};
    padding-bottom:${({ insets }) => insets.bottom}px;
    padding-horizontal: ${mScale(20)}px !important;
`

const PanArea = styled.View`
    width:100%;
    height: ${mScale(20)}px;
    background-color:transparent;
`
const StatusCard = styled.View`
    background-color:${({ colors }) => colors.backgroundColor};
    align-self:center;
    width:100%;
    height:${mScale(150)}px;
    border-radius:${mScale(14)}px;
    flex-direction:row;
    padding:${mScale(20)}px;
    gap:${mScale(20)}px;
`
const CircularProgressContainer = styled.View`

`
const StatusText = styled.Text`
    font-weight:700;
    font-size:${mScale(18)}px;
    color:${({ colors }) => colors.textColor};
    width:80%;
`
const CompletedText = styled.Text`
    font-size:${mScale(12)}px;
    color:gray;
    margin-top:${mScale(10)}px;
`
const TextView = styled.View`
    justify-content:center;
    width:${mScale(190)}px;
    align-items:flex-start;
`
const HomeContent = styled(ScrollView).attrs({
    contentContainerStyle: {
        justifyContent: "center",
        gap: 30,
        width: "100%",
        alignItems: "center",
        paddingBottom: vScale(50)

    }
})`
    height:${mScale(30)}px;
`
const SeeAllMenu = styled.View`
    flex-direction:row;
    justify-content:space-between;
    margin-vertical: ${vScale(30)}px;
`
const Task = styled.Text`
    font-weight:600;
    font-size:${mScale(16)}px;
    color:${({ colors }) => colors.textColor};
`
const SeeText = styled.Text`
    font-size:${mScale(16)}px;
    font-weight:600;
    color:${({ colors }) => colors.primary};
`