// chatbot.js

// A dictionary of messages for each page
const pageMessages = {
    login: "Welcome to DisasterReady! Please sign in as a student or admin to continue. For immediate help, click the red 'EMERGENCY ACCESS' button.",
    studentDashboard: "This is your dashboard. Here you can see your score, level, and achievements. Click 'Learning Chapters' to start learning or select a quiz to test your knowledge!",
    adminDashboard: "Welcome, Admin! This is the admin dashboard. You can see an overview of all student performance and click on any student to see their detailed progress.",
    chapterList: "Here are all the learning modules. A '✅' means you've completed the quiz for that chapter. Click on any chapter to view the content.",
    chapterDetail: "You're viewing a chapter. Watch the video and read the content to learn. When you're ready, click the 'Take Chapter Quiz' button at the bottom!",
};

/**
 * Initializes the chatbot's UI and event listeners.
 */
export function initializeChatbot() {
    if (!document.getElementById('chatbot-container')) {
        return; // Already initialized or not on the right page
    }

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
        });
    }
}

/**
 * Displays a message in the chatbot window.
 * @param {string} page - The key for the page message (e.g., 'studentDashboard').
 */
export function displayBotMessage(page) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const message = pageMessages[page] || "Welcome to DisasterReady! I'll be your guide.";
    
    if (messagesContainer) {
        messagesContainer.innerHTML = `<div class="chatbot-message">${message}</div>`;
    }
}
