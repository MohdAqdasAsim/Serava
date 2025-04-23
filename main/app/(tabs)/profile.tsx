import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import {
  getUserProfile,
  logout,
  updateUserProfile,
} from "@/services/firebaseFunctions";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { GradientWrapper, NoInternetModal, SaveModal } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useFont } from "@/contexts/FontProvider";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNetwork } from "@/contexts/NetworkProvider";
import { useAuth } from "@/contexts/AuthProvider";

interface UserProfile {
  name?: string;
  email?: string;
  profileImage?: string;
  age?: number;
  pronouns?: string;
  tonePreference?: string;
  emotionalReason?: string;
  checkInFrequency?: string;
  preferredTime?: string;
  avoidTopics?: string;
  plan?: string;
}

export default function Profile() {
  const { isConnected } = useNetwork();
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const { isFontEnabled, toggleFont } = useFont();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isSavedModalVisible, setIsSavedModalVisible] = useState(false);
  const [isConnectedToInternetModal, setIsConnectedToInternetModal] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        if (data) {
          setProfile(data);
          setEditedProfile(data);
        }
        await AsyncStorage.setItem("userProfile", JSON.stringify(data));
      } catch (error) {
        console.warn("Online fetch failed. Attempting cache...");
        const cached = await AsyncStorage.getItem("userProfile");
        if (cached) {
          const parsed = JSON.parse(cached);
          setProfile(parsed);
          setEditedProfile(parsed);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    setActionLoading(true);
    await logout();
    setActionLoading(false);
    router.replace("/auth/login");
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      await updateUserProfile(editedProfile);
      setIsSavedModalVisible(true);
      setProfile(editedProfile);
      setActionLoading(false);
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

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
        {isLoggedIn ? (
          <>
            <View className="flex flex-row justify-between items-center px-2 mb-2">
              <Text className="text-2xl text-white">Profile</Text>
              <TouchableOpacity
                onPress={
                  isConnected
                    ? handleLogout
                    : () => setIsConnectedToInternetModal(true)
                }
              >
                <Feather name="log-out" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between items-center px-2 mt-4">
              <Text className="text-white text-center text-lg">
                No profile data found.
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/auth/profile-setup")}
                className="px-4 py-2 bg-white rounded-2xl"
              >
                <Text style={{ color: Colors[theme].primary }}>
                  Create Profile
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center px-4">
            <Feather name="log-in" size={40} color="white" className="mb-4" />
            <Text className="text-white text-xl font-semibold text-center mb-2">
              You’re not logged in
            </Text>
            <Text className="text-white/70 text-base text-center mb-4">
              Please log in.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/auth/login")}
              className="bg-white/20 border border-white/30 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </GradientWrapper>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      setEditedProfile({
        ...editedProfile,
        profileImage: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };

  return (
    <GradientWrapper>
      {actionLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 justify-center items-center pointer-events-none">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ padding: 12, paddingBottom: 72 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Edit Toggle Button */}
        <View className="flex flex-row justify-between items-center px-2 mb-2">
          <Text className="text-2xl text-white">Profile</Text>
          <View className="flex flex-row gap-4">
            <TouchableOpacity
              onPress={
                isConnected
                  ? () => setIsEditing((prev) => !prev)
                  : () => setIsConnectedToInternetModal(true)
              }
            >
              <Feather
                name={isEditing ? "x" : "edit-3"}
                size={16}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                isConnected
                  ? isEditing
                    ? handleSave
                    : handleLogout
                  : () => setIsConnectedToInternetModal(true)
              }
            >
              <Feather
                name={isEditing ? "save" : "log-out"}
                size={16}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Header */}
        <BlurView
          intensity={90}
          className="flex-row items-center mb-4 rounded-3xl overflow-hidden px-4 py-2"
        >
          <TouchableOpacity
            disabled={!isEditing}
            onPress={pickImage}
            className="w-20 h-20 rounded-full overflow-hidden"
          >
            {editedProfile.profileImage ? (
              <Image
                source={{ uri: editedProfile.profileImage }}
                className="w-20 h-20"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-20 h-20 justify-center items-center"
                style={{ backgroundColor: Colors[theme].tabBar }}
              >
                <Feather name="user" size={34} color={Colors[theme].tabIcon} />
              </View>
            )}
          </TouchableOpacity>
          <View className="ml-4">
            <TextInput
              editable={isEditing}
              placeholder="Name"
              value={editedProfile.name || ""}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, name: text })
              }
              className="text-white text-2xl font-bold"
              placeholderTextColor="#ccc"
            />
            <Text className="text-white text-sm">{profile.email}</Text>
          </View>
        </BlurView>

        {/* Personal Info */}
        <View className="flex-row gap-3 mb-3">
          <BlurView
            intensity={90}
            className="p-3 rounded-2xl flex-1 overflow-hidden"
          >
            <Text className="text-white mb-1">Age</Text>
            <TextInput
              editable={isEditing}
              keyboardType="numeric"
              placeholder="Age"
              value={editedProfile.age?.toString() || ""}
              onChangeText={(text) =>
                setEditedProfile({
                  ...editedProfile,
                  age: Number(text) || undefined,
                })
              }
              className={`text-white px-3 py-2 rounded-xl ${
                isEditing ? "bg-white/10" : ""
              }`}
              placeholderTextColor="#ccc"
            />
          </BlurView>
          <BlurView
            intensity={90}
            className="p-3 rounded-2xl flex-1 overflow-hidden"
          >
            <Text className="text-white mb-1">Pronouns</Text>
            <TextInput
              editable={isEditing}
              placeholder="Pronouns"
              value={editedProfile.pronouns || ""}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, pronouns: text })
              }
              className={`text-white placeholder:text-white px-3 py-2 rounded-xl ${
                isEditing ? "bg-white/10" : ""
              }`}
              placeholderTextColor="#ccc"
            />
          </BlurView>
        </View>

        {/* Emotional Preferences */}
        <BlurView
          intensity={90}
          className="p-4 rounded-2xl mb-3 overflow-hidden"
        >
          <Text className="text-white mb-1">Tone Preference</Text>
          <TextInput
            editable={isEditing}
            placeholder="e.g., Friendly, Supportive"
            value={editedProfile.tonePreference || ""}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, tonePreference: text })
            }
            className={`text-white placeholder:text-white px-3 py-2 rounded-xl ${
              isEditing ? "bg-white/10" : ""
            } mb-3`}
            placeholderTextColor="#ccc"
          />
          <Text className="text-white mb-1">Why you're here</Text>
          <TextInput
            editable={isEditing}
            placeholder="e.g., Stress relief, journaling"
            value={
              editedProfile.emotionalReason || "To help me control my emotions"
            }
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, emotionalReason: text })
            }
            className={`text-white px-3 py-2 rounded-xl ${
              isEditing ? "bg-white/10" : ""
            }`}
            placeholderTextColor="#ccc"
          />
        </BlurView>

        {/* App Preferences */}
        <View className="flex-row gap-3 mb-3">
          {/* Check-in Frequency */}
          <BlurView
            intensity={90}
            className="p-3 rounded-2xl flex-1 overflow-hidden"
          >
            <Text className="text-white mb-1">Check-in Frequency</Text>
            {isEditing ? (
              <Picker
                selectedValue={editedProfile.checkInFrequency ?? undefined}
                onValueChange={(value) =>
                  setEditedProfile({
                    ...editedProfile,
                    checkInFrequency: value,
                  })
                }
                style={{
                  color: "white",
                  backgroundColor: "#ffffff10",
                  borderRadius: 12,
                }}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select frequency..." value={undefined} />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Only when I ask" value="manual" />
                <Picker.Item label="Never" value="never" />
              </Picker>
            ) : (
              <Text className="text-white uppercase px-3 py-2 rounded-xl">
                {editedProfile.checkInFrequency || "Not set"}
              </Text>
            )}
          </BlurView>

          {/* Preferred Time */}
          <BlurView
            intensity={90}
            className="p-3 rounded-2xl flex-1 overflow-hidden"
          >
            <Text className="text-white mb-1">Preferred Time</Text>
            {isEditing ? (
              <Picker
                selectedValue={editedProfile.preferredTime ?? undefined}
                onValueChange={(value) =>
                  setEditedProfile({ ...editedProfile, preferredTime: value })
                }
                style={{
                  color: "white",
                  backgroundColor: "#ffffff10",
                  borderRadius: 12,
                }}
                dropdownIconColor="#fff"
              >
                <Picker.Item label="Select time..." value={undefined} />
                <Picker.Item label="Morning" value="morning" />
                <Picker.Item label="Afternoon" value="afternoon" />
                <Picker.Item label="Evening" value="evening" />
                <Picker.Item label="Night" value="night" />
                <Picker.Item label="Late night" value="late-night" />
              </Picker>
            ) : (
              <Text className="text-white uppercase px-3 py-2 rounded-xl">
                {editedProfile.preferredTime || "Not set"}
              </Text>
            )}
          </BlurView>
        </View>

        {/* Avoid Topics */}
        <BlurView
          intensity={90}
          className="p-4 rounded-2xl mb-3 overflow-hidden"
        >
          <Text className="text-white mb-1">Topics to Avoid</Text>
          <TextInput
            editable={isEditing}
            placeholder="e.g., Trauma, Work"
            value={editedProfile.avoidTopics || "Past Trauma"}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, avoidTopics: text })
            }
            className={`text-white px-3 py-2 rounded-xl ${
              isEditing ? "bg-white/10" : ""
            }`}
            placeholderTextColor="#ccc"
          />
        </BlurView>

        {/* Plan */}
        <BlurView
          intensity={90}
          className="p-2 py-3 rounded-2xl mb-3 overflow-hidden"
        >
          <Text className="text-white mb-1">
            Currently you are on free plan
          </Text>
        </BlurView>

        <View className="w-full flex flex-row items-center justify-between pl-2 mb-2">
          <Text className="text-white text-base font-semibold">Fancy Font</Text>

          <TouchableOpacity
            className={`w-16 h-8 px-1 flex justify-center ${
              isFontEnabled ? "items-end" : "items-start"
            } bg-white/40 rounded-3xl`}
            onPress={toggleFont}
            activeOpacity={0.9}
          >
            <View className="w-6 h-6 bg-white rounded-full shadow-md" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SaveModal
        visible={isSavedModalVisible}
        onClose={() => setIsSavedModalVisible(false)}
        message={"Profile updated!"}
      />

      <NoInternetModal
        visible={isConnectedToInternetModal}
        onCancel={() => setIsConnectedToInternetModal(false)}
      />
    </GradientWrapper>
  );
}
