import React from 'react'
import { Input, Space } from 'antd';
import styles from '../styles/RepoParseBox.module.css';
const { Search } = Input;


export default function RepoParseBox() {
    return (
        <div style={{ margin: '15px 10px 0px 15px' }}>
            <span style={{ color: '#9ba0a8', fontSize: '12px' }}>
               NEW REPOSITORY URL FOR INDEXING
            </span>
            <div style={{ marginTop: '10px' }}>
                <Search
                    className={styles.repoSearchInput}
                    placeholder="https://github.com/user/repo"
                    allowClear
                    enterButton={<i className="fi fi-ss-paper-plane-top"></i>}
                    size="large"
                />
            </div>

        </div>
    )
}
