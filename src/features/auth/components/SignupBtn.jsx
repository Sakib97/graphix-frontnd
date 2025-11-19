import styles from '../styles/SignupBtn.module.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const SignupBtn = () => {
    return ( 
    <div className={styles.signupBtnContainer}>
        <Button as={Link} variant="dark" to="/signup">
           <i className={`${styles.signupIcon} fi fi-rr-sign-in-alt`}></i> 
           Sign Up
        </Button>
    </div>

     );
}
 
export default SignupBtn;