import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseAuth'
import { FirebaseError } from 'firebase/app'
import Button from '@mui/material/Button/Button'



export const Logout: React.FC = () => {

    const logout = async (): Promise<void> => {
        try {
            await signOut(auth)
            console.log("success!")
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.code as string)
            }
        }
    }
  return (
    <div>
        <Button variant="text" size="small" onClick={logout}>Logout</Button>
    </div>
  )
}