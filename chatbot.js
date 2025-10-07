// chatbot.js

import { getGeminiResponse } from './gemini-client.js';

const pageMessages = {
    login: "Welcome to Edushield! Please sign in as a student or admin to continue. For immediate help, click the red 'EMERGENCY ACCESS' button.",
    studentDashboard: "This is your dashboard. Here you can see your score, level, and achievements. Click 'Learning Chapters' to start learning or select a quiz to test your knowledge!",
    adminDashboard: "Welcome, Admin! This is the admin dashboard. You can see an overview of all student performance and click on any student to see their detailed progress.",
    chapterList: "Here are all the learning modules. A '✅' means you've completed the quiz for that chapter. Click on any chapter to view the content.",
    chapterDetail: "You're viewing a chapter. Watch the video and read the content to learn. When you're ready, click the 'Take Chapter Quiz' button at the bottom!",
};

let chatState = {
    currentChapterContext: null,
    currentChapterTitle: null,
};

/**
 * FINAL VERSION: This function converts Markdown headers, bold text, and lists into HTML.
 * @param {string} text - The raw text from the AI.
 * @returns {string} - The text formatted as HTML.
 */
function markdownToHtml(text) {
    let html = text
        // Convert ## headers to <h2>
        .replace(/^##\s+(.*$)/gm, '<h2>$1</h2>')
        // Convert # headers to <h1>
        .replace(/^#\s+(.*$)/gm, '<h1>$1</h1>')
        // Convert **bold** to <strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert bullet points (lines starting with - or *) into list items
        .replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>')
        // Wrap consecutive list items in <ul> tags
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/g, '')
        // Convert any remaining newlines to <br> tags
        .replace(/\n/g, '<br>');

    // Clean up extra <br> tags around lists and headers
    html = html.replace(/<br><ul>/g, '<ul>');
    html = html.replace(/<\/ul><br>/g, '</ul>');
    html = html.replace(/<br><h[12]>/g, '<h[12]>');
    html = html.replace(/<\/h[12]><br>/g, '</h[12]>');

    return html;
}

export function setChatbotContext(chapter) {
    chatState.currentChapterContext = chapter.content;
    chatState.currentChapterTitle = chapter.title;
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = `<div class="chatbot-message bot">I'm ready to answer your questions about <strong>${chapter.title}</strong>. Ask me anything!</div>`;
    }
}

export function displayBotMessage(page) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = pageMessages[page] || "Welcome to Edushield! I'll be your guide.";

    if (messagesContainer) {
        messagesContainer.innerHTML = `<div class="chatbot-message bot">${message}</div>`;
    }
}

export function initializeChatbot() {
    if (!document.getElementById('chatbot-container')) return;

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('hidden'));
    }
    if (closeChatbot) {
        closeChatbot.addEventListener('click', () => chatbotWindow.classList.add('hidden'));
    }

    if (!document.getElementById('chatbot-form')) {
        chatbotWindow.innerHTML += `
            <div class="chatbot-input-container">
                <form id="chatbot-form">
                    <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Ask a question..." autocomplete="off">
                </form>
            </div>
        `;
    }

    document.getElementById('chatbot-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserMessage();
    });
}

async function handleUserMessage() {
    const input = document.getElementById('chatbot-input');
    const userMessage = input.value.trim();
    if (!userMessage) return;

    if (!chatState.currentChapterContext) {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML += `<div class="chatbot-message bot">Please go into a learning chapter first before asking questions!</div>`;
        input.value = '';
        return;
    }
    
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML += `<div class="chatbot-message user">${userMessage}</div>`;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    messagesContainer.innerHTML += `<div id="typing-indicator" class="chatbot-message bot typing-indicator"><span></span><span></span><span></span></div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const botResponseText = await getGeminiResponse(userMessage, chatState.currentChapterContext, chatState.currentChapterTitle);
    
    const botResponseHtml = markdownToHtml(botResponseText);

    document.getElementById('typing-indicator').remove();
    messagesContainer.innerHTML += `<div class="chatbot-message bot">${botResponseHtml}</div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}