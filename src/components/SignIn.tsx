import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebaseAuth"
import { FirebaseError } from 'firebase/app'

export const SignIn: React.FC = () => {

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

    const signIn = async (): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("success!")
            navigate("/")
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/wrong-password") {
                    setMessage("Incorrect Password!")
                } else if (error.code === "auth/user-not-found") {
                    setMessage("No user with that email found!")
                } else if (error.code === "auth/invalid-email") {
                    setMessage("Must enter a valid email!")
                } else {
                    console.error(error.code as string)
                    setMessage("Error signing in user!")
                }

            }
        }
    }

    const signInWithGoogle = async (): Promise<void> => {
        try {
            await signInWithPopup(auth, googleAuth)
            console.log("success!")
            navigate("/")
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/popup-closed-by-user") {
                    setMessage("Popup closed before signing in user!")
                } else {
                    console.error(error.code as string)
                    setMessage("Error signing in user!")
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
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <h4>{message}</h4>
        </div>
    )
}