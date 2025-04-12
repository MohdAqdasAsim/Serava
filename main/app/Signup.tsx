import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundWrapper } from "@/components";
import { useRouter } from "expo-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <BackgroundWrapper>
      {/* Logo */}
      <View className="w-full flex items-center mb-4">
        <Image
          source={require("../assets/images/icon.png")}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      {/* Header Text */}
      <View className="w-full flex items-center mb-6">
        <Text className="text-[#312170] font-semibold text-5xl">
          Welcome! 🌱
        </Text>
        <Text className="text-[#312170] text-2xl mt-2 text-center">
          Let's start your journey to a calmer mind 💜
        </Text>
      </View>

      {/* Inputs Container */}
      <View
        className="w-full h-80 rounded-3xl overflow-hidden mb-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: 1,
        }}
      >
        <BlurView
          intensity={50}
          tint="light"
          className="flex-1 items-center justify-center px-6 py-6"
        >
          {/* Email */}
          <Text className="self-start text-gray-700 text-base mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="white"
            className="w-full text-[#312170] placeholder:text-gray-300 text-xl bg-white/10 rounded-xl px-4 py-2 mb-4"
          />

          {/* Password */}
          <Text className="self-start text-gray-700 text-base mb-1">
            Password
          </Text>
          <View className="w-full flex-row items-center bg-white/10 rounded-xl px-4 py-2">
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              className="flex-1 text-[#312170] placeholder:text-gray-300 text-xl"
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Entypo
                name={showPassword ? "eye-with-line" : "eye"}
                size={22}
                color="#312170"
              />
            </Pressable>
          </View>

          {/* Confirm Password */}
          <Text className="self-start text-gray-700 text-base mb-1">
            Confirm Password
          </Text>
          <View className="w-full flex-row items-center bg-white/10 rounded-xl px-4 py-2">
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="white"
              className="flex-1 text-[#312170] placeholder:text-gray-300 text-xl"
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Entypo
                name={showPassword ? "eye-with-line" : "eye"}
                size={22}
                color="#312170"
              />
            </Pressable>
          </View>
        </BlurView>
      </View>

      {/* Login Button */}
      <LinearGradient
        colors={["#b6a8ff", "#9486f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl w-full h-12 overflow-hidden"
      >
        <Pressable
          android_ripple={{ color: "#d3cfff" }}
          className="w-full h-full flex items-center justify-center"
        >
          <Text className="text-2xl text-white text-center">Sign Up</Text>
        </Pressable>
      </LinearGradient>

      {/* Already Have an Account? Sign Up Link */}
      <View className="w-full flex flex-row items-center justify-center mt-6">
        <Text className="text-[#312170cb]">Already have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.replace("/Login");
          }}
        >
          <Text className="text-[#312170]">Log In</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

export default Signup;
