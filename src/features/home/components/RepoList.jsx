import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


export default function RepoList() {
    return (
        <div style={{ padding: '20px', margin: '0 auto' }}>
            <span style={{ marginBottom: '20px', color: '#9ba0a8' }}>
                Select Repository
            </span>
            <Dropdown style={{ marginTop: '10px'}}>
                <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    style={{ width: '100%', padding: '10px 15px', fontSize: '15px' }}
                >
                    Choose Repository
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: '200px', fontSize: '15px' }}>
                    <Dropdown.Item href="#/repo-1">Repository 1</Dropdown.Item>
                    <Dropdown.Item href="#/repo-2">Repository 2</Dropdown.Item>
                    <Dropdown.Item href="#/repo-3">Repository 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
