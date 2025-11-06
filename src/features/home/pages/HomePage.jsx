import { useState } from 'react';
import styles from '../styles/HomePage.module.css'
import '@flaticon/flaticon-uicons/css/all/all.css';

const HomePage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Welcome! How can I help you fix bugs in the \'Repository 1\' repository? You can ask something like:\n- Fix the authentication bug on the login page.\n- Why are the CI tests failing?'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [chats] = useState([
        { id: 1, title: 'Null Pointer in UserService', active: false },
        { id: 2, title: 'CI Test Failures', active: false },
        { id: 3, title: 'Login Auth Bug', active: true }
    ]);

    // Sidebar repository URL input for indexing
    const [repoUrl, setRepoUrl] = useState('');
    const [indexing, setIndexing] = useState(false);

    const handleIndexRepo = (e) => {
        e.preventDefault();
        const url = repoUrl.trim();
        if (!url) return;
        // TODO: Hook this up to your indexing flow
        setIndexing(true);
        setTimeout(() => setIndexing(false), 800);
    };

    const handleSendMessage = () => {
        if (inputText.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                type: 'user',
                content: inputText
            }]);
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return ( 
        <div className={styles.homePage}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.appTitle}>
                        <i className="fi fi-rr-laptop-code"></i>
                        <span>Graphix</span>
                    </h2>
                    <p className={styles.appSubtitle}>Workspace</p>
                </div>

                <div className={styles.workspaceSelector}>
                    <select className={styles.workspaceDropdown}>
                        <option>Repository 1</option>
                        <option>Repository 2</option>
                    </select>
                </div>

                <div className={styles.repoIndexer}>
                    <div className={styles.repoLabel}>Repository URL For Indexing</div>
                    <form className={styles.repoInputWrap} onSubmit={handleIndexRepo}>
                        <input
                            type="url"
                            className={styles.repoInput}
                            placeholder="https://github.com/user/repo"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={styles.repoBtn}
                            title={indexing ? 'Indexing…' : 'Index repository'}
                            disabled={indexing || !repoUrl.trim()}
                        >
                            <i className="fi fi-ss-paper-plane-top"></i>
                            {/* <span> Index </span> */}
                        </button>
                    </form>
                </div>

                <div className={styles.chatsSection}>
                    <h3 className={styles.chatsTitle}>Conversations</h3>
                    <div className={styles.chatsList}>
                        {chats.map(chat => (
                            <div 
                                key={chat.id} 
                                className={`${styles.chatItem} ${chat.active ? styles.chatItemActive : ''}`}
                            >
                                <i className="fi fi-rr-comment-alt"></i>
                                <span className={styles.chatTitle}>{chat.title}</span>

                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.newChatBtn}>
                    <i className="fi fi-rr-plus"></i>
                    New Chat
                </button>

                <div className={styles.sidebarFooter}>
                    <button className={styles.footerBtn}>
                        <i className="fi fi-rr-settings"></i>
                        <span>Settings</span>
                    </button>
                    <button className={styles.footerBtn}>
                        <i className="fi fi-rr-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.chatHeader}>
                    <h1 className={styles.chatTitle}>Chat</h1>
                    <p className={styles.chatSubtitle}>Fix bugs </p>
                </div>

                <div className={styles.messagesContainer}>
                    {messages.map(message => (
                        <div 
                            key={message.id} 
                            className={`${styles.message} ${message.type === 'user' ? styles.messageUser : styles.messageAI}`}
                        >
                            <div className={styles.messageAvatar}>
                                {message.type === 'ai' ? 
                                    <i className="fi fi-rr-robot"></i> : 
                                    <i className="fi fi-rr-user"></i>
                                }
                            </div>
                            <div className={styles.messageContent}>
                                <div className={styles.messageSender}>
                                    {message.type === 'ai' ? 'Graphix' : 'Developer'}
                                </div>
                                <div className={styles.messageText}>
                                    {message.content.split('\n').map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Ask Graphix anything..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className={styles.sendBtn}
                        onClick={handleSendMessage}
                    >
                        <i className="fi fi-rr-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default HomePage;