import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 5174;
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY not set. Set it in .env or environment variables.');
}

const ai = new GoogleGenAI({ apiKey });

app.post('/api/chat', async (req, res) => {
  const { message, state, history } = req.body || {};

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are an expert AI Computer Science Tutor for the Malaysian SPM syllabus.',
        temperature: 0.5,
      },
      history: history || []
    });

    const stream = await chat.sendMessageStream({ message });

    let full = '';
    let grounding = null;

    for await (const chunk of stream) {
      if (chunk.text) full += chunk.text;
      if (chunk.candidates?.[0]?.groundingMetadata) grounding = chunk.candidates[0].groundingMetadata;
    }

    res.json({ text: full, groundingMetadata: grounding });
  } catch (err) {
    console.error('Server /api/chat error', err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
