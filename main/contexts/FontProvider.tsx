import React, { createContext, useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Create context for font toggle
interface FontContextType {
  isFontEnabled: boolean;
  toggleFont: () => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

// Custom hook to use the font context
export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};

// Font provider component to manage the font state
export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFontEnabled, setIsFontEnabled] = useState<boolean>(false);

  // Load the font setting from AsyncStorage on mount
  useEffect(() => {
    const loadFontSetting = async () => {
      try {
        const storedFontSetting = await AsyncStorage.getItem("isFontEnabled");
        if (storedFontSetting !== null) {
          setIsFontEnabled(JSON.parse(storedFontSetting)); // Parse the stored value
        }
      } catch (error) {
        console.error("Failed to load font setting:", error);
      }
    };

    loadFontSetting();
  }, []);

  // Toggle the font state and store it in AsyncStorage
  const toggleFont = async () => {
    try {
      const newFontSetting = !isFontEnabled;
      setIsFontEnabled(newFontSetting);
      await AsyncStorage.setItem(
        "isFontEnabled",
        JSON.stringify(newFontSetting)
      ); // Store the new state
    } catch (error) {
      console.error("Failed to save font setting:", error);
    }
  };

  return (
    <FontContext.Provider value={{ isFontEnabled, toggleFont }}>
      {children}
    </FontContext.Provider>
  );
};

// TypeScript-safe monkey patch
const TextAny = Text as unknown as { render: (...args: any[]) => JSX.Element };
const defaultRender = TextAny.render;

TextAny.render = function (...args: any[]) {
  const origin = defaultRender.call(this, ...args);
  const { isFontEnabled } = useFont(); // Get font state from context

  // Apply the custom font if the flag is true
  const style = isFontEnabled
    ? [{ fontFamily: "Heartful" }, origin.props.style]
    : [{ fontFamily: "Arial" }, origin.props.style];

  return React.cloneElement(origin, { style });
};
