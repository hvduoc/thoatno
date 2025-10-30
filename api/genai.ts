import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for your frontend domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt, responseType = 'text' } = req.body || {};
  
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt in request body' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found in environment variables');
    res.status(500).json({ error: 'Server configuration error: API key not found' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    let config: any = {
      responseMimeType: 'text/plain'
    };

    // If requesting JSON response (for income ideas feature)
    if (responseType === 'json') {
      config = {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING },
              description: { type: Type.STRING },
              skills: { type: Type.STRING },
              platform: { type: Type.STRING },
              potential: { type: Type.STRING },
            },
            required: ['source', 'description', 'skills', 'platform', 'potential']
          },
        },
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config,
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI');
    }

    // Return the response based on requested type
    if (responseType === 'json') {
      try {
        const parsedData = JSON.parse(text);
        res.status(200).json({ success: true, data: parsedData });
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        res.status(500).json({ error: 'Invalid JSON response from AI' });
      }
    } else {
      res.status(200).json({ success: true, text });
    }

  } catch (error: any) {
    console.error('GenAI API error:', error);
    res.status(500).json({ 
      error: 'AI service error',
      details: error?.message || 'Unknown error occurred'
    });
  }
}