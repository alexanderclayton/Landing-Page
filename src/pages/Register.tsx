import { SignIn } from "../components/SignIn"
import { SignUp } from "../components/SignUp"
import { Logout } from "../components/Logout"

export const Register: React.FC = () => {
    return (
        <div>
            <SignIn />
            <SignUp />
            <Logout />
        </div>
    )
}
