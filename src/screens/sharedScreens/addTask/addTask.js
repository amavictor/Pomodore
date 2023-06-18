import { View, Text, KeyboardAvoidingView } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { vScale, mScale } from "../../../infrastructure/utilities/utilFunctions";
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../infrastructure/utilities/themeContext/themeContext';
import { Input } from "../../../ui_elements/input";
import { SelectList } from "react-native-dropdown-select-list";
export const AddTaskScreen = () => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)

    const [task, setTask] = useState({
        title: "",
        date: "",
        startTime: "",
        category: "",
        workingSessions: "",
        longBreak: "",
        shortBreak: ""
    })

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    return (
        <AddTaskContainer
            insets={insets}
            colors={colors}
        >
            <KeyboardAvoidingView>
                <InputContainer>
                    <Text>
                        Title
                    </Text>
                    <Input
                        placeholder="Enter title"
                        value={task.title}
                        onChangeText={(text) => setTask({ ...task, title: text })}
                    />
                </InputContainer>
                <DateTimeContainer>
                    <InputContainer>
                        <Text>Date</Text>
                        <Input
                            placeholder="Date"
                            value={task.date}
                            containerStyle={{width:"50%"}}
                            onChangeText={(text) => setTask({ ...task, title: text })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Text>Start Time</Text>
                        <Input
                            placeholder="Time"
                            value={task.title}
                            containerStyle={{width:"50%"}}
                            onChangeText={(text) => setTask({ ...task, title: text })}
                        />
                    </InputContainer>
                </DateTimeContainer>
                <InputContainer>
                    <Text>Select Category</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                </InputContainer>
            </KeyboardAvoidingView>

        </AddTaskContainer>
    )
}

const AddTaskContainer = styled.View`
    flex:1;
    padding-top:${({ insets }) => insets.top + vScale(50)}px;
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
`