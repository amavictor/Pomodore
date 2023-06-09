import {
    KeyboardAvoidingView,
    Platform,
    Alert,
    View
} from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { vScale, mScale } from "../../../infrastructure/utilities/utilFunctions";
import {
    useContext,
    useState,
    useLayoutEffect
} from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Input } from "../../../ui_elements/input";
import { SelectList } from "react-native-dropdown-select-list";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "../../../ui_elements/buttons";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics"
import { format } from "date-fns";
import { TaskContext } from "../../../infrastructure/utilities/taskContext/taskContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from '@react-native-material/core';
import { AudioIcon, CodingIcon, ExerciseIcon, MeditationIcon, ReadingIcon } from "../../../ui_elements/taskIcons/taskIcons";





export const AddTaskScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const { tasks, setTasks } = useContext(TaskContext)



    const [pickerMode, setPickerMode] = useState('date')
    const [show, setShow] = useState(false)

    const [dateInputValue, setDateInputValue] = useState('')
    const [timeInputValue, setTimeInputValue] = useState('')

    const [taskIcon, setTaskIcon] = useState(null)

    const [isLoading, setIsLoading] = useState(false)


    const defaultDate = new Date()
    const defaultTime = new Date()

    const [task, setTask] = useState({
        title: "",
        date: defaultDate,
        startTime: defaultTime,
        category: "",
        workingSessions: 0,
        longBreak: 1,
        shortBreak: 1,
        taskIcon: taskIcon
    })


    useLayoutEffect(() => {
        setTask({
            title: "",
            date: defaultDate,
            startTime: defaultTime,
            category: "",
            workingSessions: 1,
            longBreak: 1,
            shortBreak: 1,
            taskIcon: taskIcon
        })
    }, [])
    const onChangeDateTime = (e, selectedDate) => {
        if (pickerMode === "date") {
            const currentDate = selectedDate
            setTask({ ...task, date: currentDate })
        }
        else if (pickerMode === "time") {
            const currentTime = selectedDate
            setTimeInputValue(currentTime)
            setTask({ ...task, startTime: currentTime })
        }
    }

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false)
        }
        setPickerMode(currentMode)
    }

    const showDatePicker = () => {
        setShow(false)
        showMode('date')
        setShow(true)
    }

    const showTimePicker = () => {
        setShow(false)
        showMode('time')
        setShow(true)
    }

    const dateTimeSelect = () => {
        if (pickerMode === "date") {
            setDateInputValue(task.date)
            setShow(false)
        }
        else if (pickerMode === "time") {
            setTimeInputValue(task.startTime)
            setShow(false)
        }
    }

    const categoryData = [
        { key: '1', value: 'FOCUS', disabled: true },
        { key: '2', value: 'MEDITATION' },
        { key: '3', value: 'READING' },
        { key: '4', value: 'CODING' },
        { key: '5', value: 'FUN', disabled: true },
        { key: '6', value: 'MUSIC' },
        { key: '7', value: 'EXERCISE' },
    ]

    const selectCategory = (item) => {
        let selectedTaskIcon;

        switch (item) {
            case "MEDITATION":
                selectedTaskIcon = <MeditationIcon />;
                break;
            case "READING":
                selectedTaskIcon = <ReadingIcon />;
                break;
            case "CODING":
                selectedTaskIcon = <CodingIcon />;
                break;
            case "MUSIC":
                selectedTaskIcon = <AudioIcon />;
                break;
            case "EXERCISE":
                selectedTaskIcon = <ExerciseIcon />;
                break;
            default:
                selectedTaskIcon = <MeditationIcon />;
                break;
        }

        setTaskIcon(selectedTaskIcon);

        setTask({
            ...task,
            category: item,
            taskIcon: selectedTaskIcon,
        });
    };

    const submitTask = async () => {
        setIsLoading(true)
        if (
            (
                task.title === "" ||
                task.category === "" ||
                task.workingSessions === 0 ||
                task.longBreak === 0 ||
                task.shortBreak === 0 ||
                task.workingSessions < Math.min(task.longBreak, task.shortBreak) ||
                task.longBreak < task.shortBreak
            )

        ) {
            Alert.alert("Please fill missing fields")
            setIsLoading(false)
        }
        else {
            setTasks([...tasks, task])
            await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
            setTask({
                title: "",
                date: defaultDate,
                startTime: defaultTime,
                category: "",
                workingSessions: 0,
                longBreak: 0,
                shortBreak: 0,
                taskIcon: taskIcon
            })
            setIsLoading(false)
            navigation.navigate("Home")
        }
    }

    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
        }}>
            <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
    }


    return (
        <AddTaskContainer
            insets={insets}
            colors={colors}
        >
            <KeyboardAvoidingView behavior="padding">
                <InputContainer>
                    <Label
                        colors={colors}
                    >
                        Title
                    </Label>
                    <Input
                        placeholder="Enter title"
                        value={task.title}
                        onChangeText={(text) => setTask({ ...task, title: text })}
                    />
                </InputContainer>
                <DateTimeContainer>
                    <InputContainer>
                        <Label
                            colors={colors}
                        >Date</Label>
                        <Input
                            placeholder="Date"
                            value={format(task.date, "yyyy-MM-dd")}
                            date={true}
                            showDatePicker={showDatePicker}
                            dateValueFromPicker={dateInputValue}
                            containerStyle={{ width: "70%" }}
                            onChangeText={(text) => setTask({ ...task, date: format(text, "yyyy-MM-dd") })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label
                            colors={colors}

                        >Start Time</Label>
                        <Input
                            placeholder="Time"
                            value={format(task.startTime, "HH:mm")}
                            time={true}
                            showTimePicker={showTimePicker}
                            timeValueFromPicker={timeInputValue}
                            containerStyle={{ width: "70%" }}
                            onChangeText={(text) => setTask({ ...task, time: format(text, "HH:mm") })}
                        />
                    </InputContainer>
                </DateTimeContainer>
                {
                    show && (
                        <>
                            <RNDateTimePicker
                                mode={pickerMode}
                                value={pickerMode === "date" ? task.date : task.startTime}
                                minimumDate={new Date()}
                                display={"spinner"}
                                textColor={colors.primary}
                                onChange={onChangeDateTime}
                            />
                            <Button onPress={dateTimeSelect}>
                                Select {pickerMode}
                            </Button>
                        </>

                    )

                }
                <InputContainer style={{ marginTop: vScale(40) }}>
                    <Label
                        colors={colors}
                    >Select Category</Label>
                    <SelectList
                        setSelected={(val) => selectCategory(val)}
                        data={categoryData}
                        save="value"
                        placeholder="Select task category"
                        boxStyles={{
                            borderRadius: mScale(6),
                            backgroundColor: colors.buttonOutlineColor,
                            height: mScale(60),
                            alignItems: "center",
                            borderColor: colors.buttonOutlineColor,
                            marginBottom: vScale(10)
                        }}
                        dropdownItemStyles={{
                            marginVertical: vScale(8),
                            backgroundColor: colors.alternatePrimary
                        }}
                        disabledItemStyles={{
                            marginVertical: vScale(8)
                        }}
                        disabledTextStyles={{
                            fontSize: mScale(20),
                            fontWeight:700
                        }}
                        dropdownTextStyles={{
                            fontSize: mScale(18),
                            fontWeight:500
                        }}
                        onSelect={()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                    />
                </InputContainer>

            </KeyboardAvoidingView>

            <InputContainer>
                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Working Session (mins)</Label>
                        <Label colors={colors}>{task.workingSessions}</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={120}
                        minimumValue={0}
                        minimumTrackTintColor={colors.primary}
                        value={task.workingSessions}
                        onValueChange={(value) => {
                            setTask({ ...task, workingSessions: Math.round(value) })
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        }}
                        step={2}
                    />
                </InputContainer>

                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Long Break (mins)</Label>
                        <Label colors={colors}>{task.longBreak}</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={30}
                        minimumValue={0}
                        minimumTrackTintColor={colors.primary}
                        value={task.longBreak}
                        onValueChange={(value) => {
                            setTask({ ...task, longBreak: Math.round(value) })
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        }}
                        step={1}
                    />
                </InputContainer>

                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Short Break (mins)</Label>
                        <Label colors={colors}>{task.shortBreak}</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={10}
                        minimumValue={0}
                        minimumTrackTintColor={colors.primary}
                        value={task.shortBreak}
                        onValueChange={(value) => {
                            setTask({ ...task, shortBreak: Math.round(value) })
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        }}
                        step={1}
                    />
                </InputContainer>
            </InputContainer>
            <Button
                style={{
                    marginTop: vScale(20),
                }}
                onPress={() => submitTask()}
            >Create new task</Button>

            <Empty>

            </Empty>

        </AddTaskContainer>
    )
}

const AddTaskContainer = styled.ScrollView`
    flex:1;
    padding-top:${({ insets }) => vScale(20)}px;
    padding-horizontal:${mScale(20)}px;
    background-color: ${({ colors }) => colors.backgroundColor};
`
const InputContainer = styled.View`
    
    margin-bottom:${mScale(20)}px;
`
const DateTimeContainer = styled.View`
    flex-direction: row;
    align-items:center;
    width:100%;
    gap:-10%;
`

const Empty = styled.View`
    height:${vScale(150)}px; ;
`
const Label = styled.Text`
    font-size:${mScale(14)}px;
    font-weight:600 ;
    color:${({ colors }) => colors.textColor};
    margin-bottom: ${vScale(20)}px;
`
const LabelRow = styled.View`
    flex-direction: row;
    justify-content:space-between;
`