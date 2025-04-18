import { TabBar } from "@/components"; // Your custom tab bar component
import { Tabs } from "expo-router"; // Expo router for tab navigation
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerTitleAlign: "left",
        headerShown: false, // This hides the header for each tab screen
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
        }}
      />

      <Tabs.Screen
        name="toolbox"
        options={{
          title: "Toolbox",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
