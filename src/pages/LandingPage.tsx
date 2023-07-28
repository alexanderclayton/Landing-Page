import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase/firebaseAuth"
import { Logo } from '../components/Logo'
import { Navbar } from '../components/Navbar'
import { SignIn } from "../components/SignIn"
import { SignUp } from "../components/SignUp"
import { Logout } from "../components/Logout"

export const LandingPage: React.FC = () => {

    const [user] = useAuthState(auth)

    return (
        <div className="landing-page">
            {!user ? (
                <>
                    <Logo />
                    <Navbar />
                    <div className="register">
                        <SignIn />
                        <SignUp />
                    </div>
                </>
            ) : (
                <Logout />
            )}
        </div>
    )
}