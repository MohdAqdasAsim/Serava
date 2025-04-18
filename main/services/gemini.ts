import Constants from "expo-constants";

export const getGeminiResponse = async (input: any) => {
  try {
    const token = Constants.expoConfig?.extra?.BACKEND_TOKEN;

    const response = await fetch("https://gemini-backend-97la.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm... something went wrong.";
    return aiResponse;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error getting response.";
  }
};
