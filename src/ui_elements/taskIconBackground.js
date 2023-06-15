import styled from "styled-components/native"
import { mScale } from '../infrastructure/utilities/utilFunctions';
import { color } from 'react-native-reanimated';
import { useEffect,useContext } from "react";
import { ThemeContext } from "../infrastructure/utilities/themeContext/themeContext";
export const TaskIconBackground = ({ children }) => {
    const {colors} = useContext(ThemeContext)
    const [color, setColor] = useState(colors.primary)
    const colorsArray = [
        "#7B52AB",
        "#D93F76",
        "#45A7A6",
        "#FA8432",
        "#3D8B56",
        "#D12F4A",
        "#5E63C3",
        "#A4A33C",
        "#9E448B",
        "#3F87D1"
    ]
    useEffect(() => {
        (function selectRandomColors() {
            const randomColorIndex = Math.floor(Math.random() * colorsArray.length)
            setColor(colorsArray[randomColorIndex])
        })()
    },[])
    return (
        <Background color={color}>
            {children}
        </Background>
    )
}

const Background = styled.View`
    width: ${mScale(40)}px;
    align-items:center;
    justify-content:center;
    border-radius:${mScale(14)}px;
    background-color:${({color})=>color} ;
`