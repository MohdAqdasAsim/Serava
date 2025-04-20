import { GradientWrapper } from "@/components";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const tools = [
  {
    emoji: "🧘",
    title: "Breathing Guide",
    description: "Regulate your breath with calm rhythms.",
    route: "/tools/breathing",
  },
  {
    emoji: "🧠",
    title: "Cognitive Reframe",
    description: "Shift negative thoughts with CBT exercises.",
    route: "/tools/reframe",
  },
  {
    emoji: "👁️",
    title: "Visual Grounding",
    description: "Use your senses to feel grounded and present.",
    route: "/tools/grounding",
  },
  {
    emoji: "📵",
    title: "Focus Timer",
    description: "Stay on track with a Pomodoro-style timer.",
    route: "/tools/focus",
  },
  {
    emoji: "🔁",
    title: "Emotion Rewind",
    description: "Reflect on a past moment with new insight.",
    route: "/tools/rewind",
  },
];

export default function Toolbox() {
  const router = useRouter();

  return (
    <GradientWrapper>
      <ScrollView className="flex-1 p-4 space-y-4">
        {tools.map((tool, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(tool.route as never)}
            className="bg-white/10 mb-4 p-4 rounded-xl border border-white/20"
            activeOpacity={0.8}
          >
            <Text className="text-white text-xl font-semibold mb-1">
              {tool.emoji} {tool.title}
            </Text>
            <Text className="text-white/80">{tool.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </GradientWrapper>
  );
}
