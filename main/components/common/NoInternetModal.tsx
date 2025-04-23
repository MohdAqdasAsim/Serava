// components/NoInternetModal.tsx
import React from "react";
import { Modal, View, Text, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const NoInternetModal: React.FC<Props> = ({ visible, onCancel }) => {
  const { theme } = useTheme();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <LinearGradient
              colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-4/5 p-6 rounded-3xl items-center overflow-hidden"
            >
              <Feather
                name="wifi-off"
                size={40}
                color="white"
                className="mb-4"
              />
              <Text className="text-white text-xl font-semibold text-center mb-2">
                You're Offline
              </Text>
              <Text className="text-white/70 text-base text-center">
                Connect to the internet to access this feature and sync your
                journals.
              </Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NoInternetModal;
