import { GradientWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { Theme, useTheme } from "@/contexts/ThemeProvider";
import { Themed } from "@/themed";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

const toolRoutes: Record<string, string> = {
  Breathe: "/toolbox/breathing",
  Reframe: "/toolbox/reframe",
  Ground: "/toolbox/grounding",
};

const emotionIcons = [
  { id: "joy", source: require("@/assets/icons/emoticons/joy.png") },
  { id: "serenity", source: require("@/assets/icons/emoticons/calm.png") },
  { id: "tension", source: require("@/assets/icons/emoticons/anxiety.png") },
  { id: "sorrow", source: require("@/assets/icons/emoticons/sad.png") },
  { id: "fury", source: require("@/assets/icons/emoticons/anger.png") },
  { id: "haze", source: require("@/assets/icons/emoticons/confusion.png") },
];

const quotes = [
  "You don't have to control your thoughts. You just have to stop letting them control you.",
  "Peace begins with a deep breath.",
  "It's okay to feel. Let it pass through you.",
  "Healing is not linear.",
  "Breathe. You’re doing the best you can.",
  "Small steps every day add up to big change.",
  "You are more than your thoughts.",
  "Let go of what you can't control.",
  "You are allowed to rest.",
  "Your feelings are valid.",
  "Be gentle with yourself.",
  "This too shall pass.",
  "Every day is a fresh start.",
  "Progress, not perfection.",
  "It’s okay to ask for help.",
  "You are not alone.",
  "Take it one breath at a time.",
  "Rest is productive.",
  "Trust the timing of your journey.",
  "One moment at a time.",
  "You are doing better than you think.",
  "Feel it to heal it.",
  "Give yourself permission to feel.",
  "Honor your emotions.",
  "Storms don't last forever.",
  "Keep going, you’re growing.",
  "Your mind deserves peace too.",
  "Be proud of how far you’ve come.",
  "You’re trying and that’s enough.",
  "You are not your anxiety.",
  "Growth happens in the quiet.",
  "Your pace is perfect.",
  "Let today be enough.",
  "You deserve kindness — even from yourself.",
  "The sky is still blue above the clouds.",
  "You’ve made it through tough days before.",
  "You are strong enough to keep going.",
  "Healing starts with awareness.",
  "Listen to what your body is saying.",
  "Self-care isn’t selfish.",
  "It's okay to not be okay.",
  "You’ve got this.",
  "Don’t rush your healing.",
  "Give yourself credit.",
  "This feeling is temporary.",
  "Light exists even in darkness.",
  "You are a work in progress, and that’s okay.",
  "Choose peace over perfection.",
  "You’re learning every day.",
  "Trust your inner wisdom.",
  "You’re allowed to pause.",
  "Self-love is a journey.",
  "Every emotion has a message.",
  "Be curious, not judgmental.",
  "Even a slow start is a start.",
  "Embrace the ebb and flow.",
  "Find calm in the chaos.",
  "Your path is yours alone.",
  "You have the power to shift your thoughts.",
  "Compassion is a superpower.",
  "This moment is enough.",
  "You’re not behind. You’re on your way.",
  "Let your breath guide you.",
  "Take space when you need it.",
  "It's brave to feel deeply.",
  "You are worthy of peace.",
  "Recharging is necessary.",
  "Take time to nourish your soul.",
  "Notice what feels good.",
  "Create room for calm.",
  "Self-acceptance changes everything.",
  "Speak kindly to yourself.",
  "The smallest step is still a step.",
  "Stillness is strength.",
  "You don’t need to have it all figured out.",
  "You are capable and resilient.",
  "Let go of what weighs you down.",
  "Focus on what you can control.",
  "You are not your worst day.",
  "There’s beauty in slowing down.",
  "Let kindness be your compass.",
  "You matter more than you know.",
  "One breath at a time, one step at a time.",
  "Your story isn’t over.",
  "You deserve to feel seen.",
  "Peace lives in the present.",
  "Emotions are not enemies.",
  "Let your heart lead with softness.",
  "The sun always rises.",
  "Feelings aren't facts.",
  "You’re allowed to feel joy.",
  "Gentleness is powerful.",
  "Slow down and just be.",
  "The present moment is a gift.",
  "You are your safe space.",
  "Keep showing up for yourself.",
  "You’re not too much — you’re enough.",
  "The universe is rooting for you.",
  "Celebrate your tiny victories.",
  "There is light in you.",
  "Take time to exhale.",
  "Your calm is contagious.",
  "You are growing through what you’re going through.",
];

export default function App() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [quoteIndex, setQuoteIndex] = useState(0);

  return (
    <GradientWrapper>
      {/* Mood Picker */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full h-36 rounded-3xl mt-6 overflow-hidden justify-center items-center"
      >
        <Themed.Text
          className="text-[16px] mb-6 text-center"
          style={{ color: Colors[theme].text }}
        >
          Tap an icon to change your theme based on your current mood
        </Themed.Text>
        <View className="flex-row justify-between w-[90%]">
          {emotionIcons.map((emotion) => (
            <TouchableOpacity
              key={emotion.id}
              activeOpacity={0.7}
              className="items-center justify-center"
              onPress={() => setTheme(emotion.id as Theme)}
            >
              <View className="w-10 h-10 rounded-full bg-white/30 items-center justify-center">
                <Image
                  source={emotion.source}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>

      {/* Daily Focus Card */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full rounded-3xl mt-6 px-6 py-4 overflow-hidden justify-center items-start"
      >
        <Themed.Text
          className="text-primary text-[16px] font-semibold mb-2"
          style={{ color: Colors[theme].text }}
        >
          🌱 Daily Focus
        </Themed.Text>
        <Text
          className="text-secondary text-[16px]"
          style={{ color: Colors[theme].text }}
        >
          "It's okay to slow down. Take a deep breath and begin again."
        </Text>
      </BlurView>

      {/* Journal Prompt */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full rounded-3xl mt-6 px-6 py-4 overflow-hidden justify-center items-start"
      >
        <Text
          style={{ color: Colors[theme].text }}
          className="text-primary text-[16px] font-semibold mb-2"
        >
          ✍️ Journal
        </Text>
        <Text
          style={{ color: Colors[theme].text }}
          className="text-secondary text-[16px] mb-2"
        >
          You haven’t written today. Want to capture how you feel?
        </Text>
        <TouchableOpacity
          className="bg-white/40 px-3 py-1 rounded-xl self-start"
          onPress={() => router.push("/JournalPage")}
        >
          <Text
            className="text-white text-[16px]"
            style={{ color: Colors[theme].text }}
          >
            Start Journaling
          </Text>
        </TouchableOpacity>
      </BlurView>

      {/* AI Chat Prompt */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full rounded-3xl mt-6 px-6 py-4 overflow-hidden justify-center items-start"
      >
        <Text
          style={{ color: Colors[theme].text }}
          className="text-primary text-[16px] font-semibold mb-2"
        >
          🤖 Talk to Serava
        </Text>
        <Text
          style={{ color: Colors[theme].text }}
          className="text-secondary text-[16px] mb-2"
        >
          Feeling something? Need someone to talk to? Serava is here to listen.
        </Text>
        <TouchableOpacity
          className="bg-white/40 px-3 py-1 rounded-xl self-start"
          onPress={() => router.push("/AiChat")}
        >
          <Text
            className="text-white text-[16px]"
            style={{ color: Colors[theme].text }}
          >
            Open Chat
          </Text>
        </TouchableOpacity>
      </BlurView>

      {/* Toolbox Shortcuts */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full rounded-3xl mt-6 px-6 py-4 overflow-hidden justify-center items-start"
      >
        <Text
          className="text-primary text-[16px] font-semibold mb-2"
          style={{ color: Colors[theme].text }}
        >
          🧰 Toolbox
        </Text>
        <View className="flex-row space-x-2 gap-2">
          {["Breathe", "Reframe", "Ground"].map((tool, i) => (
            <TouchableOpacity
              key={i}
              className="px-3 py-2 bg-white/40 rounded-xl"
              onPress={() => router.push(toolRoutes[tool] as never)}
            >
              <Text
                className="text-[14px] text-primary"
                style={{ color: Colors[theme].text }}
              >
                {tool === "Breathe"
                  ? "🧘 Breathing Guide"
                  : tool === "Reframe"
                  ? "🧠 Coginitive Reframe"
                  : tool === "Ground"
                  ? "👁️ Visual Grounding"
                  : tool}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>

      {/* Quote Box */}
      <BlurView
        intensity={50}
        tint="light"
        className="w-full flex-1 rounded-3xl mb-20 mt-6 px-6 py-4 overflow-hidden justify-center items-start"
      >
        <Text
          className="text-primary text-[16px] font-semibold mb-2"
          style={{ color: Colors[theme].text }}
        >
          💬 Quote of the Day
        </Text>
        <Text
          className="text-secondary text-[20px]"
          style={{ color: Colors[theme].text }}
        >
          {quotes[quoteIndex]}
        </Text>
        <TouchableOpacity
          onPress={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}
          className="mt-2 self-start bg-white/40 px-3 py-1 rounded-xl"
        >
          <Text
            className="text-white text-sm"
            style={{ color: Colors[theme].text }}
          >
            New Quote
          </Text>
        </TouchableOpacity>
      </BlurView>
    </GradientWrapper>
  );
}
