import { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Modal } from "react-native";
import {
  updateUserProfile,
  getUserProfile,
} from "@/services/firebaseFunctions";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    tonePreference: "",
    // add other fields here
  });

  useEffect(() => {
    const load = async () => {
      const data = await getUserProfile();
      if (data) setForm((prev) => ({ ...prev, ...data }));
    };
    load();
  }, []);

  const handleUpdate = async () => {
    const updatedData = {
      ...form,
      age: Number(form.age), // make sure to convert if necessary
    };

    await updateUserProfile(updatedData);
    alert("Profile updated!");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEditModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="bg-white dark:bg-zinc-900 rounded-3xl w-full p-6">
          <Text className="text-lg font-bold text-center text-black dark:text-white mb-4">
            Edit Profile
          </Text>

          <TextInput
            placeholder="Name"
            value={editedProfile.name || ""}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, name: text })
            }
            className="bg-white/10 border border-zinc-400 dark:border-zinc-600 text-black dark:text-white px-4 py-2 rounded-xl mb-3"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Age"
            value={editedProfile.age?.toString() || ""}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, age: parseInt(text) || 0 })
            }
            keyboardType="numeric"
            className="bg-white/10 border border-zinc-400 dark:border-zinc-600 text-black dark:text-white px-4 py-2 rounded-xl mb-3"
            placeholderTextColor="#999"
          />

          {/* Add more fields as needed */}

          <View className="flex-row justify-between mt-4">
            <Pressable
              className="bg-red-500 px-4 py-2 rounded-xl"
              onPress={() => setEditModalVisible(false)}
            >
              <Text className="text-white">Cancel</Text>
            </Pressable>
            <Pressable
              className="bg-green-600 px-4 py-2 rounded-xl"
              onPress={() => {
                // Save the edited profile logic (local update for now)
                setProfile({ ...profile, ...editedProfile });
                setEditModalVisible(false);
              }}
            >
              <Text className="text-white">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
