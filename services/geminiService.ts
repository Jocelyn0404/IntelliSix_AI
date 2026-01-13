
import { GoogleGenAI } from "@google/genai";
import { LearningState } from "../types";

// Initialize AI strictly using the required SDK pattern
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* getTutorResponseStream(userMessage: string, state: LearningState, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // Construct a state-aware context for the model
  const stateContext = `
    Student Current State:
    - Quiz Status: ${state.qs}
    - Score Level: ${state.sl}
    - Improvement Status: ${state.is}
    - Error Pattern: ${state.ep}
    - Performance Classification: ${state.pc}
    - Engagement: ${state.es}
  `;

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are an expert AI Computer Science Tutor for the Malaysian SPM (Form 4 & 5) syllabus.
        
        CRITICAL: Your responses must be standardized, neat, and clear. Follow this format for every explanation:
        1. **Direct Answer**: Start with a concise 1-2 sentence direct answer or greeting.
        2. **Structured Explanation**: Use bullet points (•) or numbered lists for steps/concepts.
        3. **Technical Terms**: Bold **key terms** (e.g., **Primary Key**, **Normalization**, **Logic Gates**).
        4. **Practical Example**: Always include a simple "Example" section if applicable.
        5. **Closing Question**: End with a short encouraging question to keep the student engaged.

        Syllabus Topics: SDLC, Pseudocode/Flowcharts, Logic Gates, Arrays/Lists, SQL, Normalization (1NF/2NF/3NF), Von Neumann, FDE Cycle.
        
        Rules:
        - Language: English only.
        - Tone: Professional, encouraging, and academic.
        - Tone adjustment: If student score is "Low", use simpler analogies.
        
        Context: ${stateContext}`,
        tools: [{ googleSearch: {} }],
        temperature: 0.5, // Lowered for more consistent/standardized output
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        yield {
          text: chunk.text,
          groundingMetadata: chunk.candidates?.[0]?.groundingMetadata
        };
      }
    }
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    yield { text: "I'm sorry, I hit a technical snag. Let's keep studying anyway! What else is on your mind?" };
  }
}
