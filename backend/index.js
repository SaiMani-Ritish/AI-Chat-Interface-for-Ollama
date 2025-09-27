const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:3001/api/chat";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from AI chat backend');
});

// POST /api/chat
// Body expected: { message: string, metadata?: {} }
app.post('/api/chat', async (req, res) => {
  try {
    const payload = req.body || {};
    const userMessage = payload.message || (payload.messages && payload.messages.slice(-1)[0]?.content) || '';

    // If the user has configured OLLAMA_URL, proxy request to that URL and return its response
    if (OLLAMA_URL) {
      // Forward payload as-is to the configured endpoint. The shape expected by the remote
      // model may differ; consult Ollama or your LLM host docs and adapt here.
      const response = await axios.post(OLLAMA_URL, payload, { timeout: 60000 });

      // Try to extract a readable text from common response shapes.
      const data = response.data;

      // Common extraction fallbacks:
      const reply = data?.reply || data?.text || data?.output || (typeof data === 'string' ? data : JSON.stringify(data));

      return res.json({ ok: true, reply });
    }

    // Fallback (no OLLAMA_URL): return a simple demo response so frontend remains functional.
    console.warn('OLLAMA_URL not set — returning fallback demo response');

    const demoReply = `Demo reply (no OLLAMA_URL configured). We received: "${userMessage}"`;

    res.json({ ok: true, reply: demoReply });
  } catch (err) {
    console.error('Error in /api/chat:', err?.message || err);
    res.status(500).json({ ok: false, error: err?.message || 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`AI chat backend listening on port ${PORT}`);
  if (!OLLAMA_URL) console.log('Warning: OLLAMA_URL not set — server will respond with demo replies');
});
