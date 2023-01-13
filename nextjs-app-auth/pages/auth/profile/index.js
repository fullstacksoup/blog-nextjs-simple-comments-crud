import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
import UserAvatar from '@/components/profile/UserAvatar';
import UserComments from '@/components/profile/UserComments';
import UserReplies from '@/components/profile/UserReplies';
import { getToken } from 'next-auth/jwt';
// import Orders from './Orders';

export default function Profile({token, ssrData}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  console.log(token)
  console.log(ssrData)
  return (                      
    <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 270,
                }}
            >
                <UserComments data={ssrData.commentData}/> 
            </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 270,
                }}
            >
                <UserAvatar userInfo={token}/> 
                
            </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <UserReplies data={ssrData.replyData}/> 
            </Paper>
            </Grid>
        </Grid>
   
    </Container>          
  );
}


export async function getServerSideProps(context) {
    const { query, req, res } = context;
    // Call an external API endpoint to get posts
    
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret })   
    
    const result = await fetch(`http://localhost:3000/api/comments/getusercomments/${token.sub}`)
    const ssrData = await result.json()
    
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        ssrData: ssrData,
        token: token
      },
    }
  }