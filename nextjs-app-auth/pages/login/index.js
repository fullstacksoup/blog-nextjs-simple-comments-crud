import {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import UserIcon from '@mui/icons-material/Person';
import { getProviders, signIn,  getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt"
import compStyle from './login.module.css'


export default function Signin({ token, csrfToken, providers }) { 

  const router = useRouter();

  useEffect(() => {
    if(token !== null) router.push('/auth/comments')  
  }, []);

  const [values, setValues] = useState({
    email: '',
    password: '',
    pin: '',
    showPassword: false    
  });
      
  const [showAlert, setShowAlert] = useState(false);

  const getProviderIcon = (provider) => {
    console.log('provider', provider)
    if(provider === 'Google') return <GoogleIcon/>
    if(provider === 'GitHub') return <GitHubIcon/>
    else return <UserIcon/>
  }

  console.log('token', token)
  return (
    <div className={compStyle.main}>
    <div id={compStyle.container}>
      <CssBaseline />
      
      <Paper elevation={2}>  
      <Box 
        blur={10}
          sx={{
            padding: 2,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
        
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color: 'white', zIndex: 99}}>
          Sign in
        </Typography>
     
        <form  noValidate>
          <Grid container spacing={2}>
      
       
            <Grid item xs={12}>
            
              <Stack spacing={2} sx={{mt: 8, mb: 4}}>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>                  
                  <Button size="large" variant="contained" fullWidth onClick={() => signIn(provider.id)} startIcon={getProviderIcon(provider.name)}>
                    Sign in as {provider.name}
                  </Button>
                </div>
              ))}
              </Stack>

            </Grid>
          </Grid>
        </form>
        
      </Box>
      </Paper>
    </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context
  
  try {    
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
 
    return { props: { token: token,  providers: await getProviders() } };
  } catch (e) {
    return { props: {  providers: await getProviders() } };
  }
  
}


