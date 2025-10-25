import { useNavigate } from "react-router-dom"
import { googleAuth } from "../../apis/api"
import { useGoogleLogin } from "@react-oauth/google"
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";


type TokenResponse = {
    code: string
}

export default function GoogleLogin() {
    const navigate = useNavigate()

    const responseGoogle = async (authResult: TokenResponse) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code'])
                console.log(result)
                const { email, name, image, userId } = result.data.user
                const token = result.data.token
                localStorage.setItem('user-info', JSON.stringify({ name, email, token, image, userId }))

                console.log(token)
                console.log(result.data.user)
                toast.success("Login Successfully")
                navigate('/dashboard')
            }
        } catch (error) {
            console.log('Error while requesting google code', error)
        }
    }

    const handleError = (error: unknown) => {
        console.error("Google login failed:", error);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: handleError,
        flow: 'auth-code',
    })

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Sign in with your Google account
                    </Typography>

                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={googleLogin}
                            sx={{ textTransform: "none", fontSize: "16px", py: 1 }}
                        >
                            Continue with Google
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
