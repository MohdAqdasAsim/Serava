import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { ReactNode, useEffect } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ToolboxPageWrapperProps {
  children: ReactNode;
  title: string;
}

const ToolboxPageWrapper: React.FC<ToolboxPageWrapperProps> = ({
  children,
  title,
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
      className="w-full h-full p-4"
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center px-2 py-1">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-3">
            <ArrowLeft size={24} color={Colors[theme].tabIcon} />
          </TouchableOpacity>

          {title && (
            <Text
              className="text-2xl font-semibold"
              style={{ color: Colors[theme].tabIcon }}
            >
              {title}
            </Text>
          )}
        </View>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ToolboxPageWrapper;
