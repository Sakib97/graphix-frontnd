
export default function NewChatBtn() {
    return (
        <div>
            <button
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    backgroundColor: '#2d7a3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#236030'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2d7a3e'}
            >
                <i style={{ transform: 'translateY(1px)' }} className="fi fi-br-plus"></i>
                &nbsp;
                <span style={{ fontSize: '17px' }}>New Chat</span>
            </button>
        </div>

    )
}
