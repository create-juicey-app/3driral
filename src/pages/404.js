import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/joy'
export default function Custom404() {
    const router = useRouter()

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography level="h3">404, are you lost?</Typography>
                <br/>
                <Button
                  onClick={() => {router.back()}}
                  variant="solid"
                >Go back</Button>
            </div>
        </div>
    )
}