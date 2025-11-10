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
const { Header, Sider, Content } = Layout;


const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <div>
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
                    <Header className={styles.headerBar} style={{ padding: 0, background: colorBgContainer }}>
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
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default SideBar;