import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { NetworkProvider } from "@/contexts/NetworkProvider";
import { AlertProvider } from "@/contexts/AlertProvider";
import { Text, View } from "react-native";
import { ErrorBoundary } from "react-error-boundary";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function ErrorFallback({ error }: { error: Error }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
        😓 Oops! Something went wrong.
      </Text>
      <Text style={{ fontSize: 14, color: "red", textAlign: "center" }}>
        {error.message}
      </Text>
    </View>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Heartful: require("../assets/fonts/Heartful.ttf"),
  });

  useEffect(() => {
    const warmBackend = async () => {
      try {
        const res = await fetch(
          "https://gemini-backend-97la.onrender.com/ping"
        );
        res.ok
          ? console.log("✅ Backend is awake!")
          : console.warn("⚠️ Backend ping returned non-200");
      } catch (error) {
        console.error("🔥 Backend wake-up failed:", error);
      }
    };

    warmBackend();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <NetworkProvider>
          <AlertProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </AlertProvider>
        </NetworkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
