import { Link } from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase/firebaseAuth"
import { Logout } from "../components/Logout"

export const LandingPage: React.FC = () => {

    const [user] = useAuthState(auth)

    return (
        <div>
            {!user ? (
                <>
                    <Link to="/signin">Sign In</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            ) : (
                <Logout />
            )}
        </div>
    )
}