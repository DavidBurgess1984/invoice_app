import React, { useContext, useState,ReactNode } from "react";


interface ThemeContextType {
  isThemeDark: boolean;
  toggleTheme: (isVisible: boolean) => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isThemeDark, toggleTheme] = useState(false);



  return (
    <ThemeContext.Provider
      value={{
        isThemeDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme() called outside of a ThemeProvider?");
  }
  return context;
};

export { ThemeProvider, useTheme };
