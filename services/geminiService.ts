import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Vastrika AI", a dedicated fashion stylist for the premium ethnic wear brand Vastrika.
Your tone is elegant, helpful, and knowledgeable about Indian ethnic fashion.
You are helping a customer choose from our catalog.

Here is our current product catalog:
${JSON.stringify(PRODUCTS.map(p => ({name: p.name, category: p.category, price: p.price, id: p.id})))}

Rules:
1. Recommend products from our catalog when possible.
2. If the user asks about a specific occasion (wedding, festival, casual), suggest appropriate attire (e.g., Silk Sarees/Lehengas for weddings, Cotton Kurtis for casual).
3. Keep responses concise and engaging.
4. If asked about prices, use the catalog prices (INR).
5. Do not hallucinate products not in the catalog if asked for specific recommendations to buy *now*, but you can discuss general fashion advice.
`;

export const sendMessageToStylist = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview', // Using flash for speed/cost effectiveness in a chatbot
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm having trouble thinking of a recommendation right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to the fashion database right now.";
  }
};