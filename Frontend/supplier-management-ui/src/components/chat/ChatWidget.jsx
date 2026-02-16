import { useState } from 'react';
import ChatPanel from './ChatPanel';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Chat Panel */}
            {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

            {/* Floating Button */}
            <button
                className={`chat-widget-button ${isOpen ? 'hidden' : ''}`}
                onClick={toggleChat}
                aria-label="Open AI Assistant"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="chat-widget-label">AI Assistant</span>
            </button>
        </>
    );
};

export default ChatWidget;
