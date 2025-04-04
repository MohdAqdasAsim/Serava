import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { OnBoarding } from "@/pages";

const App = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [hasOnBoarded, setHasOnBoarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnBoarded = async () => {
      try {
        const value = await AsyncStorage.getItem("hasLaunched");
        if (value === null) {
          // First launch
          await AsyncStorage.setItem("hasLaunched", "true");
          setHasOnBoarded(true);
        } else {
          // Not the first launch
          setHasOnBoarded(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      }
    };

    checkOnBoarded();
  }, []);

  useEffect(() => {
    if (hasOnBoarded === false) {
      requestAnimationFrame(() => {
        router.replace("/home");
      });
    }
    navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });
  }, [hasOnBoarded, router, navigation]);

  if (hasOnBoarded === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-primary-blue-shades-darkest">
      {!hasOnBoarded && <OnBoarding />}
    </View>
  );
};

export default App;
