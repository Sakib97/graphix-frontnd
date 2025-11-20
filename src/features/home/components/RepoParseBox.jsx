import React, { useState } from 'react'
import { Input, Space, message } from 'antd';
import styles from '../styles/RepoParseBox.module.css';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
const { Search } = Input;


export default function RepoParseBox({ onParseSuccess }) {
    const [repoUrl, setRepoUrl] = useState('');

    // API call function
    const parseRepo = async (repoUrl) => {
        const response = await fetch(
            `http://127.0.0.1:8080/api/v1/kb/parse-repo?repo_url=${encodeURIComponent(repoUrl)}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to parse repository');
        }
        
        return response.json();
    };

    // TanStack Query mutation
    const mutation = useMutation({
        mutationFn: parseRepo,
        onSuccess: (data) => {
            toast.success('Repository parsed successfully!', {
                duration: 4000,
                position: 'top-center',
            });
            console.log('Response:', data);
            setRepoUrl(''); // Clear input on success
            if (onParseSuccess) {
                onParseSuccess(data); // Pass data to parent component
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`, {
                duration: 4000,
                position: 'top-center',
            });
            console.error('Error parsing repo:', error);
        },
    });

    const handleSearch = (value) => {
        if (!value || !value.trim()) {
            toast.error('Please enter a repository URL', {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }
        
        // Basic validation for GitHub URL
        if (!value.includes('github.com')) {
            toast.error('Please enter a valid GitHub repository URL', {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }

        mutation.mutate(value);
    };

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
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    onSearch={handleSearch}
                    loading={mutation.isPending}
                    disabled={mutation.isPending}
                />
            </div>
        </div>
    )
}
