import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import OnBoarding from "./OnBoarding";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebaseConfig";
import { checkUserProfileExists } from "@/services/firebaseFunctions";
import { BackgroundWrapper } from "@/components";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "@/contexts/ThemeProvider";

const App = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const value = await AsyncStorage.getItem("hasLaunched");
      setLoading(false);
      if (value === null) {
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      if (isFirstLaunch === false) {
        setLoading(true);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const profileExists = await checkUserProfileExists();
            if (profileExists) {
              try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const profile = userDoc.data();
                if (profile?.moodTheme) {
                  const validThemes = [
                    "joy",
                    "serenity",
                    "tension",
                    "sorrow",
                    "fury",
                    "haze",
                  ];
                  if (validThemes.includes(profile.moodTheme)) {
                    setTheme(profile.moodTheme);
                  }
                }
              } catch (e) {
                console.log("Failed to load theme from Firestore:", e);
              }
              router.replace("/home");
            } else {
              router.replace("/ProfileSetup");
            }
          } else {
            router.replace("/Login");
          }
          setLoading(false);
        });
      }
    };

    checkAuthAndProfile();
    navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });
  }, [isFirstLaunch, router, navigation]);

  if (isFirstLaunch === null || loading) {
    return (
      <BackgroundWrapper>
        <ActivityIndicator size="large" color="#513d73" />
      </BackgroundWrapper>
    );
  }

  return (
    <View className="flex-1 flex items-center justify-center">
      {isFirstLaunch && <OnBoarding />}
    </View>
  );
};

export default App;
