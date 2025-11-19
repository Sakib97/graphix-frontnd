import { useAuth } from "../../../context/AuthProvider.jsx";
import SideBar from "../components/Sidebar.jsx";


const NewHomePage = () => {
    const { user } = useAuth();

    return (
        <div>
            {/* <h1>Welcome to the New Home Page</h1> */}
            <SideBar user={user} />
        </div>
    );
}
 
export default NewHomePage;