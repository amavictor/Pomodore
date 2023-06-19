import { View, Text, KeyboardAvoidingView, Platform } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { vScale, mScale } from "../../../infrastructure/utilities/utilFunctions";
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Input } from "../../../ui_elements/input";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "../../../ui_elements/buttons";
import Slider from "@react-native-community/slider";
export const AddTaskScreen = () => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)

    const [pickerMode, setPickerMode] = useState('date')
    const [show, setShow] = useState(false)

    const [dateInputValue, setDateInputValue] = useState('')
    const [timeInputValue, setTimeInputValue] = useState('')


    const defaultDate = new Date()
    const defaultTime = new Date()

    const [task, setTask] = useState({
        title: "",
        date: defaultDate,
        startTime: defaultTime,
        category: "",
        workingSessions: "",
        longBreak: "",
        shortBreak: ""
    })


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

        console.log(task)

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
        { key: '2', value: 'Meditation' },
        { key: '3', value: 'Reading' },
        { key: '4', value: 'Coding' },
        { key: '5', value: 'FUN', disabled: true },
        { key: '6', value: 'Music' },
        { key: '7', value: 'Exercise' },
    ]

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
                            value={task.date}
                            date={true}
                            showDatePicker={showDatePicker}
                            dateValueFromPicker={dateInputValue}
                            containerStyle={{ width: "70%" }}
                            onChangeText={(text) => setTask({ ...task, date: text })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label
                            colors={colors}

                        >Start Time</Label>
                        <Input
                            placeholder="Time"
                            value={() => new Date()}
                            time={true}
                            showTimePicker={showTimePicker}
                            timeValueFromPicker={timeInputValue}
                            containerStyle={{ width: "70%" }}
                            onChangeText={(text) => setTask({ ...task, time: text })}
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
                        setSelected={(val) => setSelected({ ...task, category: val })}
                        data={categoryData}
                        save="value"
                        placeholder="Select task category"
                        boxStyles={{
                            borderRadius: mScale(6),
                            backgroundColor: colors.buttonOutlineColor,
                            height: mScale(60),
                            alignItems: "center",
                            borderColor: colors.buttonOutlineColor
                        }}
                        dropdownTextStyles={{
                            fontSize: mScale(14),
                        }}
                        dropdownItemStyles={{
                            marginVertical: vScale(8)
                        }}
                        disabledItemStyles={{
                            marginVertical: vScale(8)
                        }}
                        disabledTextStyles={{
                            fontSize: mScale(16),
                        }}
                    />
                </InputContainer>

            </KeyboardAvoidingView>

            <InputContainer>
                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Working Sessions</Label>
                        <Label colors={colors}>8</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={8}
                        minimumValue={1}
                        minimumTrackTintColor={colors.primary}
                    />
                </InputContainer>

                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Long Break (mins)</Label>
                        <Label colors={colors}>30</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={8}
                        minimumValue={1}
                        minimumTrackTintColor={colors.primary}
                    />
                </InputContainer>

                <InputContainer>
                    <LabelRow>
                        <Label colors={colors}>Short Break (mins)</Label>
                        <Label colors={colors}>10</Label>
                    </LabelRow>

                    <Slider
                        maximumValue={8}
                        minimumValue={1}
                        minimumTrackTintColor={colors.primary}
                    />
                </InputContainer>
            </InputContainer>
            <Button
                style={{
                    marginTop: vScale(40),
                }}
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
    gap:10%;
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
`
const LabelRow = styled.View`
    flex-direction: row;
    justify-content:space-between;
`