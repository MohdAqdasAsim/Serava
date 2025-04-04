import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme, View } from "react-native";
import { useColorScheme as useTailwindColorScheme } from "nativewind";

type Theme = typeof Colors.light;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const { colorScheme, setColorScheme } = useTailwindColorScheme(); // NativeWind color scheme hook
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        const isDarkTheme = savedTheme === "dark";
        setIsDark(isDarkTheme);
        setColorScheme(isDarkTheme ? "dark" : "light"); // NativeWind update
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");

    setColorScheme(newTheme ? "dark" : "light"); // Sync with NativeWind
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? Colors.dark : Colors.light,
        isDark,
        toggleTheme,
      }}
    >
      {/* ✅ Ensure NativeWind applies correct styles */}
      <View className="flex-1">{children}</View>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
