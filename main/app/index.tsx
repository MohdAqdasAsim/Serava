import React from "react";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useTheme } from "@/contexts/ThemeProvider";
import { BackgroundWrapper } from "@/components";
import OnBoarding from "./misc/on-boarding";

const App = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const isFirstLaunch = useFirstLaunch();

  useAuthCheck((route, moodTheme) => {
    // if (!isFirstLaunch) {
    //   return;
    // }
    if (moodTheme) {
      setTheme(moodTheme as never);
    }
    router.replace(route as never);
  });

  if (isFirstLaunch === null) {
    return (
      <BackgroundWrapper>
        <ActivityIndicator size="large" color="#513d73" />
      </BackgroundWrapper>
    );
  }

  if (isFirstLaunch) {
    return <OnBoarding />;
  }

  return (
    <BackgroundWrapper>
      <ActivityIndicator size="large" color="#513d73" />
    </BackgroundWrapper>
  );
};

export default App;
