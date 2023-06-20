import React, { createContext, useState } from "react";

// Create the theme context
export const ThemeContext = createContext();

// Create a provider component to wrap around your app
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("");

  // Toggle the theme when the button is clicked
  const toggleTheme = () => {
    setTheme(theme === "light_theme_" ? "" : "light_theme_");
  };

  // Provide the theme value and toggle function to the context
  const themeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
