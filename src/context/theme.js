import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkMode: () => {},
    lightMode: () => {},
})

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ThemeContext.Provider