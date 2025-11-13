import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from '../styles/ChatBox.module.css';

const { TextArea } = Input;

const ChatBox = ({ collapsed = false }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            // Handle send message logic here
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.chatBoxContainer} style={{ left: collapsed ? 0 : 290 }}>
            <div className={styles.chatBoxWrapper}>
                <TextArea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    className={styles.chatInput}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    className={styles.sendButton}
                    disabled={!message.trim()}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;
