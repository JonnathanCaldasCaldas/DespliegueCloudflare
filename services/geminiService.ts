
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCloudflareInfo = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Eres un experto ingeniero en infraestructura de Cloudflare. 
        Tu objetivo es explicar de manera entusiasta y técnica por qué Cloudflare es superior al hosting tradicional (servidores en un solo lugar). 
        Usa un tono profesional pero acogedor. Habla sobre Edge Computing, latencia, seguridad (WAF/DDoS) y escalabilidad global.
        Responde siempre en español.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, tuve un problema conectando con el Edge de IA. ¡Pero Cloudflare sigue siendo increíble!";
  }
};
