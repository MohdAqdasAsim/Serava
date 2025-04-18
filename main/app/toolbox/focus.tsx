import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToolboxPageWrapper } from "@/components";
import { BlurView } from "expo-blur";

const focusTime = 25 * 60;
const breakTime = 5 * 60;

const FocusTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  // Load the timer state from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTimerState = async () => {
      try {
        const state = await AsyncStorage.getItem("FOCUS_TIMER_STATE");
        if (state) {
          const { secondsLeft, isRunning, onBreak } = JSON.parse(state);
          setSecondsLeft(secondsLeft);
          setIsRunning(isRunning);
          setOnBreak(onBreak);
        }
      } catch (e) {
        console.error("Error loading timer state:", e);
      }
    };

    loadTimerState();
  }, []);

  // Save the timer state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveTimerState = async () => {
      try {
        await AsyncStorage.setItem(
          "FOCUS_TIMER_STATE",
          JSON.stringify({ secondsLeft, isRunning, onBreak })
        );
      } catch (e) {
        console.error("Error saving timer state:", e);
      }
    };

    saveTimerState();
  }, [secondsLeft, isRunning, onBreak]);

  // Timer countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    }

    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setOnBreak((prev) => !prev);
      setSecondsLeft(onBreak ? focusTime : breakTime);
    }

    return () => clearTimeout(timer);
  }, [isRunning, secondsLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <ToolboxPageWrapper title="Focus Timer">
      <BlurView
        intensity={60}
        tint="dark"
        className="px-8 py-10 rounded-3xl items-center justify-center bg-white/5"
      >
        <Text className="text-white text-7xl font-extrabold mb-4 text-shadow-neon">
          {formatTime(secondsLeft)}
        </Text>
        <Text className="text-zinc-200 italic text-lg mb-6">
          {onBreak ? "Break Time ☕" : "Focus Mode 🔥"}
        </Text>

        <TouchableOpacity
          onPress={() => setIsRunning((r) => !r)}
          className="bg-white/10 border border-white rounded-2xl px-6 py-3 shadow-md shadow-cyan-400 active:bg-white/20"
        >
          <Text className="text-white text-lg font-semibold">
            {isRunning ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </ToolboxPageWrapper>
  );
};

export default FocusTimer;
