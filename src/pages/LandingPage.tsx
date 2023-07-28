import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase/firebaseAuth"
import { SignIn } from "../components/SignIn"
import { SignUp } from "../components/SignUp"
import { Logout } from "../components/Logout"

export const LandingPage: React.FC = () => {

    const [user] = useAuthState(auth)

    return (
        <div>
            {!user ? (
                <>
                    <SignIn />
                    <SignUp />
                </>
            ) : (
                <Logout />
            )}
        </div>
    )
}