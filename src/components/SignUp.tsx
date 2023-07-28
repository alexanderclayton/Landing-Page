import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseAuth"
import { FirebaseError } from 'firebase/app'
import { TextField, Button, Dialog, DialogContentText } from "@mui/material"

export const SignUp: React.FC = () => {

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
            <Button
                variant="outlined"
                size="small"
                onClick={handleOpen}
            >
                Create Account
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
                    onClick={createAccount}
                    style={{ margin: "10px", width: "16rem" }}
                >
                    Create Account
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