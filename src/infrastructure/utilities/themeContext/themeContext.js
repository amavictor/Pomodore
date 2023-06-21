import { createContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from 'react-native';

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState("")
    const colorScheme = Appearance.getColorScheme()

    const getColors = (currentTheme) => {
        if (currentTheme === "dark") {
            return {
                backgroundColor: "#181D31",
                textColor: "#ffffff",
                primary: "#ef5d5d",
                onBoardingIndicator: "#F6F1F7",
                buttonOutlineColor: "#EFEFEF",
                lineColor: "#9e9e9e",
                activeInput: "#f5e1e1",
                alternatePrimary:"#f0adad"
            }
        }
        else {
            return {
                backgroundColor: "#ffffff",
                textColor: "#283849",
                primary: "#ef5d5d",
                onBoardingIndicator: "#F6F1F1",
                buttonOutlineColor: "#EFEFEF",
                lineColor: "#9e9e9e",
                activeInput: "#f5e1e1",
                alternatePrimary:"#f0adad"
            }
        }
    }

    const updateTheme = () => {
        setTheme(colorScheme)
    }

    useEffect(() => {
        updateTheme()
    }, [colorScheme])

    

    const colors = getColors(theme)
    
    return (
        <ThemeContext.Provider
            value={{ theme, colors }}
        >
            {children}
        </ThemeContext.Provider>
    )

}