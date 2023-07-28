import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseAuth"
import { FirebaseError } from 'firebase/app'

export const SignUp: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const navigate = useNavigate()

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const createAccount = async (): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("success!")
            navigate("/")
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    setMessage("A user with that email address already exists!")
                } else if (error.code === "auth/invalid-email") {
                    setMessage("Must enter a valid email!")
                } else if (error.code === "auth/weak-password") {
                    setMessage("Password must contain at least 6 characters")
                } else {
                    console.error(error.code as string)
                    setMessage("Error creating user!")
                }
            }
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Email..."
                onChange={handleEmailChange}
                value={email}
            />
            <input
                type="password"
                placeholder="Password..."
                onChange={handlePasswordChange}
                value={password}
            />
            <button onClick={createAccount}>Create Account</button>
            <h4>{message}</h4>
        </div>
    )
}