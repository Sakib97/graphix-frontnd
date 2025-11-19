import { supabase } from '../../../config/supabaseClient';
import styles from '../styles/SignupPage.module.css'
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const SignupPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const redirectTo = `${window.location.origin}${location.state?.from?.pathname || "/"
            }`;

        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectTo,
            },
        });
        if (error) {
            console.error("Error during Google OAuth sign-in:", error);
        }
    };

    return (
        <div className={styles.signupPage}>
            <button 
                className={styles.backButton}
                onClick={() => navigate('/')}
                aria-label="Go back to home"
            >
                <ArrowLeftOutlined />
                <span>Back to Home</span>
            </button>
            <Button variant="light" className={styles.googleBtn} onClick={handleLogin}>
                <i className="fi fi-brands-google"></i>
                Continue with Google
            </Button>
        </div>
    );
}

export default SignupPage;