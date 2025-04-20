import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfile } from "@/services/firebaseFunctions";
import { BackgroundWrapper } from "@/components";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { Theme, useTheme } from "@/contexts/ThemeProvider";

const steps = [0, 1, 2, 3, 4];

const ProfileSetup = () => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    profileImage: "",
    pronouns: "",
    tonePreference: "",
    emotionalReason: "",
    checkInFrequency: "",
    preferredTime: "",
    avoidTopics: "",
    plan: "free" satisfies "free" | "premium",
  });
  const [loading, setLoading] = useState(false);
  const [moodTheme, setMoodTheme] = useState<Theme>("joy");
  const [ambientSounds, setAmbientSounds] = useState<boolean>(false);

  const { setTheme, setAmbientSounds: setAmbientSoundInContext } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setForm({
        ...form,
        profileImage: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };

  const handleNext = () => {
    // Validate required fields at each step
    if (stepIndex === 0) {
      if (!form.name.trim()) return Alert.alert("Name is required.");
      const ageNumber = Number(form.age);
      if (!ageNumber || isNaN(ageNumber) || ageNumber < 1) {
        return Alert.alert("Please enter a valid age.");
      }
    }
    if (stepIndex === 2 && !form.emotionalReason.trim()) {
      return Alert.alert("Please share why you're here.");
    }
    if (stepIndex === 3) {
      if (!form.checkInFrequency) {
        return Alert.alert("Please select a check-in frequency.");
      }
      if (!form.preferredTime) {
        return Alert.alert("Please select a support time.");
      }
    }
    if (stepIndex === 4 && !moodTheme) {
      return Alert.alert("Please choose a mood theme.");
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleProfileSubmit();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleProfileSubmit = async () => {
    if (!form.name) return Alert.alert("Name is required.");

    const ageNumber = Number(form.age);
    if (!ageNumber || isNaN(ageNumber) || ageNumber < 0) {
      return Alert.alert("Please enter a valid age.");
    }

    const profileData = {
      ...form,
      age: ageNumber,
      plan: "free" as const,
    };

    setLoading(true);
    const { success, message } = await saveUserProfile(profileData);
    Alert.alert(message);
    setLoading(false);

    setTheme(moodTheme);
    setAmbientSoundInContext(ambientSounds);

    if (success) {
      router.replace("/home");
    }
  };

  const renderInputs = () => {
    switch (stepIndex) {
      case 0:
        return (
          <View className="flex flex-row items-start justify-center mt-8 gap-4">
            <View className="flex items-center mt-8 h-full">
              {form.profileImage ? (
                <View className="relative">
                  <Image
                    source={{ uri: form.profileImage }}
                    className="w-24 h-24 rounded-full bg-gray-300"
                  />
                  <Pressable
                    onPress={() => setForm({ ...form, profileImage: "" })}
                    className="absolute top-0 right-0 bg-white rounded-full p-1"
                  >
                    <Entypo name="cross" size={18} color="black" />
                  </Pressable>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={pickImage}
                  className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 opacity-70"
                >
                  <Entypo name="camera" size={34} color="white" />
                </TouchableOpacity>
              )}
              <Text className="text-xs text-gray-500 mt-1">
                Add/Change Photo
              </Text>
            </View>

            <View className="flex-1 pl-6">
              <Text className="text-lg text-[#523c72]">
                What should we call you?
              </Text>
              <TextInput
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Your name"
                className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
              />

              <Text className="text-lg text-[#523c72]">How old are you?</Text>
              <TextInput
                value={form.age || ""}
                onChangeText={(text) => setForm({ ...form, age: text })}
                placeholder="e.g., 22"
                keyboardType="numeric"
                maxLength={3}
                className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
              />
            </View>
          </View>
        );
      case 1:
        return (
          <>
            <Text className="text-lg mb-2 text-[#523c72]">
              Your pronouns (optional):
            </Text>
            <TextInput
              value={form.pronouns}
              onChangeText={(text) => setForm({ ...form, pronouns: text })}
              placeholder="e.g., she/her, he/him"
              className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
            />
            <Text className="text-lg mb-2 text-[#523c72]">
              Preferred tone from Serava:
            </Text>
            <TextInput
              value={form.tonePreference}
              onChangeText={(text) =>
                setForm({ ...form, tonePreference: text })
              }
              placeholder="gentle, poetic, funny..."
              className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
            />
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-lg mb-2 text-[#523c72]">
              What brings you here?
            </Text>
            <TextInput
              value={form.emotionalReason}
              onChangeText={(text) =>
                setForm({ ...form, emotionalReason: text })
              }
              placeholder="e.g., anxiety, self-growth"
              className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
            />
            <Text className="text-lg mb-2 text-[#523c72]">
              Topics you'd like to avoid?
            </Text>
            <TextInput
              value={form.avoidTopics}
              onChangeText={(text) => setForm({ ...form, avoidTopics: text })}
              placeholder="grief, trauma, etc."
              className="border-b border-[#523c72] text-[#523c72] mb-4 w-full text-lg"
            />
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-lg mb-2 text-[#523c72]">
              How often for check-ins?
            </Text>
            <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, checkInFrequency: value })
              }
              placeholder={{ label: "Select frequency...", value: null }}
              value={form.checkInFrequency}
              items={[
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Only when I ask", value: "manual" },
                { label: "Never", value: "never" },
              ]}
            />

            <Text className="text-lg mb-2 text-[#523c72]">
              Preferred support time?
            </Text>
            <RNPickerSelect
              onValueChange={(value) =>
                setForm({ ...form, preferredTime: value })
              }
              placeholder={{ label: "Select time...", value: null }}
              value={form.preferredTime}
              items={[
                { label: "Morning", value: "morning" },
                { label: "Afternoon", value: "afternoon" },
                { label: "Evening", value: "evening" },
                { label: "Night", value: "night" },
                { label: "Late night", value: "late-night" },
              ]}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text className="text-lg mb-2 text-[#523c72]">
              Mood theme to begin with:
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setMoodTheme(value)}
              placeholder={{ label: "Select a mood theme...", value: null }}
              value={moodTheme}
              items={[
                { label: "Joy 🌞", value: "joy" },
                { label: "Serenity 🌿", value: "serenity" },
                { label: "Tension ⚡", value: "tension" },
                { label: "Sorrow 🌧️", value: "sorrow" },
                { label: "Fury 🔥", value: "fury" },
                { label: "Haze 🌫️", value: "haze" },
              ]}
            />

            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-lg text-[#523c72]">
                Enable ambient sounds?
              </Text>
              <Switch
                value={ambientSounds}
                onValueChange={(value) => setAmbientSounds(value)}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <BackgroundWrapper>
      <View className="w-full flex items-center mb-12">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      <BlurView
        intensity={70}
        tint="light"
        className="w-full rounded-3xl overflow-hidden p-4 max-w-md"
      >
        {renderInputs()}

        <View className="flex-row justify-between mt-6">
          {stepIndex > 0 && (
            <Pressable
              onPress={handleBack}
              className="bg-gray-300 py-3 px-6 rounded-2xl"
            >
              <Text className="text-gray-800 text-center text-lg">Back</Text>
            </Pressable>
          )}

          <Pressable
            onPress={handleNext}
            className="bg-[#9486f0] py-3 px-6 rounded-2xl ml-auto"
            disabled={loading}
          >
            <Text className="text-white text-center text-lg">
              {loading
                ? "Saving..."
                : stepIndex === steps.length - 1
                ? "Finish Setup"
                : "Continue"}
            </Text>
          </Pressable>
        </View>
      </BlurView>
    </BackgroundWrapper>
  );
};

export default ProfileSetup;
