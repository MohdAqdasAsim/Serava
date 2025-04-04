import { useTheme } from "@/contexts/ThemeProvider";
import { View, Text, Button } from "react-native";

export default function App() {
  const { isDark, theme, toggleTheme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-accent">Hello World! (Tailwind)</Text>
      <Text style={{ color: theme.box }}>Hello World! (Manual Style)</Text>

      <View className="w-32 aspect-square bg-box dark:bg-dark-box flex items-center justify-center border-2">
        <Text>hello world!</Text>
      </View>

      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
