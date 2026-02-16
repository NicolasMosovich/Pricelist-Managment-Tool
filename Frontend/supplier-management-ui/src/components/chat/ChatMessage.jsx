import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`chat-message ${message.type}`}>
            <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
};

export default ChatMessage;
