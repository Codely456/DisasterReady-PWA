// /api/chatbot.js

// Load environment variables for local development
import 'dotenv/config';

// Import the correct Google AI SDK class directly
import { GoogleGenerativeAI } from "@google/generative-ai";

// Read the secret API key from process.env
const API_KEY = process.env.GEMINI_API_KEY;

// Initialize the SDK with your API key
const genAI = new GoogleGenerativeAI(API_KEY);

// This is the main function that Vercel will run.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userMessage, chapterContext, chapterTitle } = req.body;

    // Get the correct generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prepare the context text from the chapter content
    const contextText = chapterContext.map(item => {
      if (item.type === 'heading') return `\n## ${item.value}\n`;
      if (item.type === 'text') return item.value;
      if (item.type === 'list') return item.value.map(li => `- ${li}`).join('\n');
      return '';
    }).join('\n').replace(/<[^>]*>/g, '');

    // The system prompt remains the same
   const systemPrompt = `You are the "DisasterReady Guide," a friendly, cheerful, and helpful AI assistant for children.
    
    Your personality is always encouraging, patient, and you use simple words. Start your first response with a friendly greeting like "Hello there, superstar learner! 😊"

    **Your Core Rules:**
    1.  **Stay Focused:** Your ONLY task is to answer questions using the provided text for the chapter: "${chapterTitle}". NEVER answer questions that are not related to this text(exception only for safety reasons and first response).
    2.  **Be Safe:** If a user asks something off-topic, politely guide them back by saying "That's a great question! But right now, we're focusing on ${chapterTitle}. Do you have any questions about that? 😊"
    3.  **NEW RULE - Handle Inappropriate Language:** If the user uses a bad, mean, or offensive word, do not repeat the word. Respond calmly and firmly with: "My purpose is to help us learn about safety. Let's please keep our conversation friendly and focused on being prepared." Then, ask a question to guide them back to the topic.
    4.  **Format Your Answers:** Make your answers easy and fun to read for kids.
        * Use **bold text** by wrapping important words in double asterisks, like **this**.
        * Use bullet points for lists by starting a line with a dash and a space, like "- This is a point."
        * Keep sentences short and clear. End your response with a friendly, encouraging question.

    Here is the chapter content you MUST use for your answer:
    ---
    ${contextText}
    ---
    `;

    const fullPrompt = `${systemPrompt}\nUser Question: "${userMessage}"`;

    // Use the SDK to generate the content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Send the response back to the frontend
    res.status(200).json({ response: text });
    
  } catch (error) {
    console.error("Gemini SDK Error in API function:", error);
    res.status(500).json({ error: "The AI service is currently experiencing issues. Please try again later." });
  }
}