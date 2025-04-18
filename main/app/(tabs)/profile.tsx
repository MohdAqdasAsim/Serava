import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { getUserProfile, logout } from "@/services/firebaseFunctions";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { GradientWrapper } from "@/components";

export default function Profile() {
  const { theme } = useTheme();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <GradientWrapper>
        <ActivityIndicator size="large" color="#fff" />
      </GradientWrapper>
    );
  }

  if (!profile) {
    return (
      <GradientWrapper>
        <Text className="text-white text-lg">No profile data found.</Text>
      </GradientWrapper>
    );
  }

  const handleLogout = async () => {
    await logout(); // Call the logout function
    router.replace("/Login");
  };

  return (
    <GradientWrapper>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Profile Header */}
        <BlurView
          intensity={90}
          className="flex flex-row items-center mb-6 gap-6 rounded-3xl overflow-hidden shadow-lg"
        >
          {profile.profileImage ? (
            <Image
              source={{ uri: profile.profileImage }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
              className="m-3"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-300 justify-center items-center">
              <Text className="text-3xl text-gray-700">👤</Text>
            </View>
          )}
          <View className="pl-6">
            <Text className="text-white text-2xl font-semibold">
              {profile.name}
            </Text>
            <Text className="text-white text-sm mt-2">{profile.email}</Text>
          </View>
        </BlurView>

        {/* Age and Pronouns */}
        <BlurView
          intensity={90}
          className="p-6 mb-4 rounded-3xl overflow-hidden"
        >
          <View className="flex flex-row justify-between">
            <Text className="text-white text-lg">Age: {profile.age}</Text>
            {profile.pronouns && (
              <Text className="text-white text-lg">
                Pronouns: {profile.pronouns}
              </Text>
            )}
          </View>
        </BlurView>

        {/* Tone and Emotional Reason */}
        <BlurView
          intensity={90}
          className="p-6 mb-4 rounded-3xl overflow-hidden"
        >
          <View className="flex flex-row justify-between">
            {profile.tonePreference && (
              <Text className="text-white text-lg">
                Tone: {profile.tonePreference}
              </Text>
            )}
            {profile.emotionalReason && (
              <Text className="text-white text-lg">
                Why you're here: {profile.emotionalReason}
              </Text>
            )}
          </View>
        </BlurView>

        {/* Check-in Frequency and Preferred Time */}
        <BlurView
          intensity={90}
          className="p-6 mb-4 rounded-3xl overflow-hidden"
        >
          <View className="flex flex-row justify-between">
            {profile.checkInFrequency && (
              <Text className="text-white text-lg">
                Check-in frequency: {profile.checkInFrequency}
              </Text>
            )}
            {profile.preferredTime && (
              <Text className="text-white text-lg">
                Preferred time: {profile.preferredTime}
              </Text>
            )}
          </View>
        </BlurView>

        {/* Avoid Topics */}
        {profile.avoidTopics && (
          <BlurView
            intensity={90}
            className="p-6 mb-4 rounded-3xl overflow-hidden"
          >
            <Text className="text-white text-lg">
              Avoid topics: {profile.avoidTopics}
            </Text>
          </BlurView>
        )}

        {/* Plan */}
        <BlurView
          intensity={90}
          className="p-6 mb-4 rounded-3xl overflow-hidden"
        >
          <Text className="text-white text-lg">Plan: {profile.plan}</Text>
        </BlurView>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          style={{
            backgroundColor: Colors[theme].primary,
            paddingVertical: 12,
            borderRadius: 25,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientWrapper>
  );
}
