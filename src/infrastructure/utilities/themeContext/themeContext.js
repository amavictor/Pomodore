import { createContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from 'react-native';

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState("")
    const colorScheme = useColorScheme()

    const getColors = (currentTheme) => {
        if (currentTheme === "dark") {
            return {
                backgroundColor: "#181D31",
                textColor: "#ffffff",
                primary: "#ef5d5d",
                onBoardingIndicator: "#F6F1F7"
            }
        }
        else {
            return {
                backgroundColor: "#ffffff",
                textColor: "#283849",
                primary: "#ef5d5d",
                onBoardingIndicator: "#F6F1F1"
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