import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Link from 'next/link';
import { getProviders, signIn,  getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt"
import { useRouter } from 'next/router';

export default function Index({token}) {

  const router = useRouter();

  React.useEffect(() => {
    if(token !== null) router.push('/auth/comments')  
  }, []);



  return (
    <Container maxWidth="md" align="center">
      <Box sx={{ my: 4 }} >
         <Typography variant="h3" component="h3"  gutterBottom>
          Next.js 13 with MUI 5.11.4
        </Typography>
        <Typography variant="h5" component="h5"  gutterBottom>
          Simple Comments App
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{mt: 4, mb: 6}}>
          <Chip label="Next Auth" />
          <Chip label="MUI"  />
          <Chip label="React Infinite Scroll Component"  />
          <Chip label="SQLite"  />
          
        </Stack>
        <Button variant="contained" 
                color="primary" 
                component={Link}                           
        
                href={`/api/auth/signin`}> 
                Sign In
        </Button>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context
  
  try {    
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })
 
    return { props: { token: token } };
  } catch (e) {
    return { props: [] };
  }
  
}
