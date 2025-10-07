// gemini-client.js

// This now points to your own secure backend endpoint on Vercel.
const SECURE_API_ENDPOINT = '/api/chatbot';

/**
 * Calls your secure Vercel serverless function, which then calls the Gemini API.
 */
export async function getGeminiResponse(userMessage, chapterContext, chapterTitle) {
    try {
        const response = await fetch(SECURE_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage,
                chapterContext,
                chapterTitle,
            })
        });

        if (!response.ok) {
            throw new Error(`Your chatbot function failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;

    } catch (error) {
        console.error("Chatbot function error:", error);
        return "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
    }
}