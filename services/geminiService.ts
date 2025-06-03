
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
  console.error("API_KEY is not configured. Please ensure process.env.API_KEY is set in your environment.");
  // Throwing an error here would stop the app from loading if the key isn't set.
  // For a user-facing app, you might handle this more gracefully, but per instructions, we assume it's set.
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "MISSING_API_KEY" }); // Fallback to prevent crash if undefined, though error check is better.

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const interpretDream = async (dreamDescription: string): Promise<string> => {
  if (!process.env.API_KEY) {
    const errorMsg = "API Key for Gemini is not configured. Please set the API_KEY environment variable.";
    console.error(errorMsg);
    // Simulating an error popup or console message for the developer.
    // In a real app, this might be handled by showing a message in the UI.
    // For this exercise, it will throw, and App.tsx will catch it.
    throw new Error(errorMsg);
  }

  const systemInstruction = `You are a mystical and insightful dream interpreter.
Analyze the provided dream and offer a thoughtful, empathetic, and symbolic interpretation.
Focus on common dream archetypes, emotional undercurrents, and potential personal reflections the dream might inspire.
Present the interpretation in a clear, engaging, and slightly poetic manner.
Avoid giving direct medical, financial, or psychological advice. Do not make predictions.
Keep the interpretation concise and to the point, ideally in 1-2 paragraphs or a short list of key insights. Aim for brevity while retaining the mystical and insightful tone.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Here is the dream to interpret: "${dreamDescription}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Adjusted temperature slightly for conciseness while maintaining creativity
        topP: 0.95,
        topK: 40,
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error("Received an empty interpretation from the AI. Please try again.");
    }
    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific API error messages if needed
        if (error.message.includes("API key not valid")) {
             throw new Error("The provided API Key is not valid. Please check your configuration.");
        }
         throw new Error(`Failed to interpret dream: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI service.");
  }
};
