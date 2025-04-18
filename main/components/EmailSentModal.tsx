import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For the gradient background
import { Ionicons } from "@expo/vector-icons"; // Close icon

interface EmailSentModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleOk: () => void;
}

const EmailSentModal: React.FC<EmailSentModalProps> = ({
  modalVisible,
  setModalVisible,
  handleOk,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)} // Close modal on back press
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            {/* Modal container with blur and gradient */}
            <LinearGradient
              colors={["#b6a8ff", "#9486f0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-4/5 p-6 bg-opacity-90 rounded-3xl items-center shadow-lg overflow-hidden"
            >
              <View className="absolute top-5 right-4">
                {/* Close button using Ionicons */}
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons
                    name="close-circle"
                    size={30}
                    color="#ffffff"
                    style={{ opacity: 0.8 }}
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-2xl font-bold mb-5 text-white">
                Email Sent!
              </Text>

              {/* Message Text */}
              <Text className="text-white mb-5 text-center">
                A verification email has been sent to your email address. Please
                check your inbox and follow the instructions.
              </Text>

              {/* OK Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleOk}
                className="w-full p-4 mb-4 rounded-3xl items-center bg-indigo-500 shadow-md"
              >
                <Text className="text-white text-lg">OK</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EmailSentModal;
