
import { LearningState } from "../types";

// Frontend shim: call server endpoint which holds the real API key
export async function* getTutorResponseStream(userMessage: string, state: LearningState, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, state, history })
    });

    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(err || 'Server error');
    }

    const data = await resp.json();

    // Yield a single chunk for the frontend stream consumer
    yield { text: data.text || '', groundingMetadata: data.groundingMetadata };
  } catch (err) {
    console.error('Frontend geminiService error', err);
    yield { text: "I'm having trouble connecting to the tutor service right now." };
  }
}
