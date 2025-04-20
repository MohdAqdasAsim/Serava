import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { checkUserProfileExists } from "@/services/firebaseFunctions";
import { auth, db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const useAuthCheck = (onComplete: (route: string, theme?: string) => void) => {
  useEffect(() => {
    const checkAuth = async () => {
      const netState = await NetInfo.fetch();

      // Offline? Use cache!
      if (!netState.isConnected) {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const cachedProfile = await AsyncStorage.getItem("userProfile");

        if (isLoggedIn === "true" && cachedProfile) {
          const profile = JSON.parse(cachedProfile);
          return onComplete("/home", profile.moodTheme);
        } else {
          return onComplete("/auth/login");
        }
      }

      // Online? Do Firebase auth check
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const profileExists = await checkUserProfileExists();
          if (profileExists) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const profile = userDoc.data();
            if (profile) {
              await AsyncStorage.setItem("isLoggedIn", "true");
              await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
              return onComplete("/home", profile.moodTheme);
            }
          } else {
            return onComplete("/auth/profile-setup");
          }
        } else {
          await AsyncStorage.setItem("isLoggedIn", "false");
          return onComplete("/auth/login");
        }
      });

      return () => unsubscribe();
    };

    checkAuth();
  }, []);
};
