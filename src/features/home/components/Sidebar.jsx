import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MoreOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown } from 'antd';
import RepoParseBox from '../components/RepoParseBox.jsx';
import RepoList from '../components/RepoList.jsx';
import NewChatBtn from '../components/NewChatBtn.jsx';
import SignupBtn from '../../auth/components/SignupBtn.jsx';
import ChatBox from '../components/ChatBox.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider.jsx';
import { supabase } from '../../../config/supabaseClient.js';
const { Header, Sider, Content } = Layout;


const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    zIndex: 1000,
};

const SideBar = ({ user }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [repoData, setRepoData] = useState(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Handle logout
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser, setUserMeta, setLoading } = useAuth();
    const handleLogout = async () => {
        try {
            setLogoutLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error during sign-out:", error);
                setError("Failed to log out. Please try again.");
                setLogoutLoading(false);
                return;
            }
            // Clear user context
            setUser(null);
            setUserMeta(null);
            setLoading(false);

            navigate('/signup');
        } catch (err) {
            console.error("Unexpected logout error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
            setLogoutLoading(false);
        }
    };

    // Dropdown menu items
    const menuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: logoutLoading ? 'Logging out...' : 'Logout',
            onClick: handleLogout,
            disabled: logoutLoading,
        },
    ];

    // Handle window resize to detect mobile view
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle successful repo parsing
    const handleParseSuccess = (data) => {
        setRepoData(data);
    };

    return (
        <div>
            {/* Backdrop overlay for mobile */}
            {isMobile && !collapsed && (
                <div
                    className={styles.backdrop}
                    onClick={() => setCollapsed(true)}
                />
            )}
            <Layout>
                <Sider
                    style={siderStyle}
                    className={styles.sidebarContainer}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint='md'
                    onCollapse={value => setCollapsed(value)}
                    collapsedWidth={0}
                    onBreakpoint={(broken) => setCollapsed(broken)}
                    width={290}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '99%',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div className={styles.sidebarHeader}>
                                <h2 className={styles.appTitle}>
                                    <i className="fi fi-rr-laptop-code"></i>
                                    <span>Graphix</span>
                                </h2>
                                <p className={styles.appSubtitle}>Workspace</p>
                            </div>

                            <div className={styles.horizontalDivider} />

                            <div>
                                <RepoList />
                            </div>
                            <div>
                                <RepoParseBox onParseSuccess={handleParseSuccess} />
                            </div>
                            <div className={styles.horizontalDivider} />
                        </div>


                        <div>
                            <div style={{ padding: '0px 20px 0px 20px' }}>
                                <NewChatBtn />
                            </div>
                            <div className={styles.horizontalDivider} />
                            <div>
                                {user ? (
                                    <div className={styles.userProfile}>
                                        <div className={styles.userInfo}>
                                            <div className={styles.userAvatar}>
                                                {/* <UserOutlined /> */}
                                                <img
                                                    src={
                                                        user.user_metadata?.avatar_url ||
                                                        "https://via.placeholder.com/100/cccccc/000000?text=User"
                                                    }
                                                    alt="avatar"
                                                    className={styles.userAvatar}
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div className={styles.userDetails}>
                                                <div className={styles.userName}>
                                                    {user.user_metadata.full_name || 'User'}
                                                </div>
                                                <div className={styles.userEmail}>
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown
                                            menu={{ items: menuItems }}
                                            trigger={['click']}
                                            placement="topRight"
                                            overlayClassName={styles.dropdownMenu}
                                        >
                                            <Button
                                                type="text"
                                                icon={<MoreOutlined />}
                                                className={styles.moreButton}
                                            />
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <SignupBtn />
                                )}
                            </div>
                        </div>



                    </div>

                    <Menu
                        className={styles.sidebarMenu}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    // items={[
                    //     {
                    //         key: '1',
                    //         icon: <UserOutlined />,
                    //         label: 'nav 1',
                    //     },
                    //     {
                    //         key: '2',
                    //         icon: <VideoCameraOutlined />,
                    //         label: 'nav 2',
                    //     },
                    //     {
                    //         key: '3',
                    //         icon: <UploadOutlined />,
                    //         label: 'nav 3',
                    //     },
                    // ]}
                    />

                </Sider>
                <Layout>
                    <Header className={styles.headerBar} style={{
                        padding: 0,
                        background: colorBgContainer,
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        left: isMobile ? 0 : (collapsed ? 0 : 290),
                        zIndex: 50,
                        transition: 'left 0.2s'
                    }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className={styles.headerTitle}>
                            Chat
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '88px 16px 100px 16px',
                            padding: 24,
                            minHeight: 'calc(100vh - 188px)',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            marginLeft: isMobile ? '16px' : (collapsed ? '16px' : '306px'),
                            transition: 'margin-left 0.2s',
                        }}
                    >
                        {repoData ? (
                            <div>
                                <h2 style={{ marginBottom: '20px' }}>Repository Parse Result</h2>
                                <pre style={{
                                    background: '#f5f5f5',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    overflow: 'auto',
                                    maxHeight: '70vh'
                                }}>
                                    {JSON.stringify(repoData, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: '#8c8c8c'
                            }}>
                                <i className="fi fi-rr-search" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
                                <p style={{ fontSize: '16px' }}>Enter a repository URL to parse First</p>
                            </div>
                        )}
                    </Content>
                    <ChatBox collapsed={isMobile ? true : collapsed} />
                </Layout>
            </Layout>
        </div>
    );
}

export default SideBar;