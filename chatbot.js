// Chatbot functionality with Google Gemini API integration
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatContainer = document.getElementById('chatContainer');
    const minimizeBtn = document.getElementById('minimizeChat');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendMessage');
    const userInput = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Chat state
    let isChatOpen = false;
    let isWaitingForResponse = false;

    // Google Gemini API Key
    const API_KEY = "AIzaSyBI5H0iqjx-LB68xMC6QkEi2AtYSuoqRf8";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // Toggle chat window
    chatToggleBtn.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatToggleBtn.classList.toggle('active', isChatOpen);
        chatContainer.classList.toggle('active', isChatOpen);
        
        if (isChatOpen) {
            userInput.focus();
        }
    });

    // Minimize chat
    minimizeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        chatToggleBtn.classList.remove('active');
        isChatOpen = false;
    });

    // Close chat
    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        chatToggleBtn.classList.remove('active');
        isChatOpen = false;
    });

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '' || isWaitingForResponse) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Show bot is typing
        showBotTyping();
        
        // Set waiting state
        isWaitingForResponse = true;
        
        // Process the user message
        processUserMessage(message)
            .then(response => {
                // Remove typing indicator
                removeBotTyping();
                
                // Add bot response
                addMessage(response, 'bot');
                
                // Reset waiting state
                isWaitingForResponse = false;
                
                // Scroll to bottom
                scrollToBottom();
            })
            .catch(error => {
                console.error("Error processing message:", error);
                removeBotTyping();
                addMessage("I'm having trouble connecting to my brain right now. Please try again later.", 'bot');
                isWaitingForResponse = false;
                scrollToBottom();
            });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        
        const avatarIcon = document.createElement('i');
        avatarIcon.classList.add('fas');
        if (sender === 'user') {
            avatarIcon.classList.add('fa-user');
        } else {
            avatarIcon.classList.add('fa-robot');
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        avatarDiv.appendChild(avatarIcon);
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        
        scrollToBottom();
    }

    // Show bot typing indicator
    function showBotTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'bot-typing');
        typingDiv.id = 'botTyping';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        
        const avatarIcon = document.createElement('i');
        avatarIcon.classList.add('fas', 'fa-robot');
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message-content');
        
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('bot-typing');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            dotsContainer.appendChild(dot);
        }
        
        avatarDiv.appendChild(avatarIcon);
        typingIndicator.appendChild(dotsContainer);
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(typingIndicator);
        
        chatMessages.appendChild(typingDiv);
        
        scrollToBottom();
    }

    // Remove bot typing indicator
    function removeBotTyping() {
        const typingIndicator = document.getElementById('botTyping');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Process user message using Google Gemini API
    async function processUserMessage(message) {
        // Check for tracking-related queries first
        const trackingResponse = checkTrackingQueries(message);
        if (trackingResponse) {
            // Use local predefined responses for tracking queries
            return trackingResponse;
        }

        try {
            // For general questions, use the Google Gemini API
            const response = await callGeminiAPI(message);
            return response;
        } catch (error) {
            console.error("API Error:", error);
            return "I'm having trouble connecting to my knowledge base. Please try a tracking-related question or try again later.";
        }
    }

    // Check for tracking-specific queries
    function checkTrackingQueries(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('tr-')) {
            const trackingNumber = lowerMessage.match(/tr-\d+/i);
            if (trackingNumber) {
                return `Looking up tracking number ${trackingNumber[0].toUpperCase()}... This package is currently in transit and should be delivered in 2 business days.`;
            } else {
                return "I couldn't identify a valid tracking number. Please provide your tracking number in the format TR-XXXXXXXX.";
            }
        }
        
        if (lowerMessage.includes('track') && lowerMessage.includes('package')) {
            return "I can help you track your package! To get started, please provide your tracking number in the format TR-XXXXXXXX.";
        }
        
        if (lowerMessage.includes('delivery time') || 
            (lowerMessage.includes('how') && lowerMessage.includes('long') && lowerMessage.includes('deliver'))) {
            return "Delivery times vary based on shipping method and destination. Standard shipping usually takes 3-5 business days, while express shipping takes 1-2 business days.";
        }
        
        if (lowerMessage.includes('contact') && (lowerMessage.includes('support') || lowerMessage.includes('help'))) {
            return "You can reach our customer support team at support@trackease.com or call us at 1-800-TRACK-IT (1-800-872-2548).";
        }
        
        // No tracking-specific query detected, return null to use the API
        return null;
    }

    // Call Google Gemini API
    async function callGeminiAPI(message) {
        const url = `${API_URL}?key=${API_KEY}`;
        
        // Prepare context for the AI model
        const context = "You are TrackBot, a helpful assistant for the TrackEase package tracking website. " +
                      "Keep your answers concise, friendly, and informative. " +
                      "If you don't know something, say so rather than making up information. " +
                      "If users ask about tracking packages, suggest they enter their tracking number in the format TR-XXXXXXXX.";
        
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: context },
                        { text: message }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
                topP: 0.9
            }
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            // Extract text from the response
            if (data.candidates && 
                data.candidates[0] && 
                data.candidates[0].content && 
                data.candidates[0].content.parts && 
                data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return "I'm not sure how to answer that. Can you try asking about tracking a package?";
            }
        } catch (error) {
            console.error("API call error:", error);
            return "I'm having trouble getting an answer right now. Please try again later or ask about tracking a package.";
        }
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});