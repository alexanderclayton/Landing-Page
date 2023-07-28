import { Button } from '@mui/material'

export const Navbar: React.FC = () => {
  return (
    <div>
        <Button
        variant="text"
        >
            About
        </Button>
        <Button
        variant="text"
        >
            Services
        </Button>
        <Button
        variant="text"
        >
            Portfolio
        </Button>
        <Button
        variant="text"
        >
            Contact Me
        </Button>
    </div>
  )
}