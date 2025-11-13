import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import RepoParseBox from '../components/RepoParseBox.jsx';
import RepoList from '../components/RepoList.jsx';
import NewChatBtn from '../components/NewChatBtn.jsx';
import ChatBox from '../components/ChatBox.jsx';
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

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Handle window resize to detect mobile view
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                                <RepoParseBox />
                            </div>
                            <div className={styles.horizontalDivider}/>
                        </div>


                        <div>
                            <div style={{ padding: '0px 20px 0px 20px' }}>
                                <NewChatBtn />
                            </div>
                            <div className={styles.horizontalDivider}/>
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
                        lorem5000
                    </Content>
                    <ChatBox collapsed={isMobile ? true : collapsed} />
                </Layout>
            </Layout>
        </div>
    );
}

export default SideBar;