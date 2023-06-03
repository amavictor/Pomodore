import { createContext, useEffect, useState } from "react";
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState("")
    const colorScheme = useColorScheme()

    const getColors = (currentTheme) => {
        if (currentTheme === "dark") {
            return {
                backgroundColor: "#283849",
                textColor: "#ffffff",
                primary: "#ef5d5d"
            }
        }
        else {
            return {
                backgroundColor: "#ffffff",
                textColor: "#283849",
                primary: "#ef5d5d"
            }
        }
    }

    const colors = getColors(theme)

    useEffect(() => {
        setTheme(colorScheme)
    }, [])
    
    return (
        <ThemeContext.Provider
            value={{ theme, colors }}
        >
            {children}
        </ThemeContext.Provider>
    )

}