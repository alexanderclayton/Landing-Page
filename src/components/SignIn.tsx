import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebaseAuth"
import { FirebaseError } from 'firebase/app'
import { TextField, Button, Dialog, DialogContentText } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google'

export const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
            >
                Sign In
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <TextField
                    type="text"
                    placeholder="Email..."
                    label="Email"
                    onChange={handleEmailChange}
                    value={email}
                    style={{ margin: "10px", width: "16rem" }}
                />
                <TextField
                    type="password"
                    placeholder="Password..."
                    label="Password"
                    onChange={handlePasswordChange}
                    value={password}
                    style={{ margin: "10px", width: "16rem" }}
                />
                <Button
                    variant="contained"
                    onClick={signIn}
                    style={{ margin: "10px", width: "16rem" }}
                >
                    Sign In
                </Button>
                <Button
                    variant="contained"
                    onClick={signInWithGoogle}
                    style={{ margin: "10px", width: "16rem", display: "flex", justifyContent: "space-around" }}
                >
                    <GoogleIcon /> Sign In with Google
                </Button>
                <DialogContentText
                    style={{ margin: "10px", width: "16rem" }}
                >
                    {message}
                </DialogContentText>
            </Dialog>
        </div>
    )
}