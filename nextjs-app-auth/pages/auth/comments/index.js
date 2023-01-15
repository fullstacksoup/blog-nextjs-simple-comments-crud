import React, {useEffect, useState} from "react";
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import CommentCard from '@/components/comments/CommentCard';
import NewComment from '@/components/comments/NewComment';
import CommentSkeleton from '@/components/comments/CommentSkeleton';
import { Grid, Paper } from '@mui/material';
import axiosConn from '@/src/axiosConn'
import { getToken } from "next-auth/jwt";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Comments({ token, ssrData }) {
  console.log('Comments', ssrData)
  const [newComment, setNewComment] = useState('');
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //*************************************************************************************** */
  //* I N I T
  //*************************************************************************************** */

  useEffect(() => {
    // console.log(ssrData.items)
    setCommentsData(ssrData.items)
     setTimeout(() => {
       setIsLoading(false);  
     }, 600);
    
  }, []);

  
  //*************************************************************************************** */
  //* H A N D L E   N E W   C O M M E N T
  //*************************************************************************************** */

  const handleNewComment = async () => {
    var tmpArr = []
    var id=0

    axiosConn.post('/api/comments/add', { UserId: Number(token.sub), Content: newComment })
    .then((data) => {
   //   console.log(data); // JSON data parsed by `data.json()` call
      // setOpen(false);
      commentsData.forEach(elem => {
        tmpArr.push(elem)
        id++
      })
    
      tmpArr.push({Id: 2, UserId: 22, Name: 'John Smith', Content: newComment})
      setCommentsData(tmpArr)
      setNewComment('')  
    
    });            
  }

  //*************************************************************************************** */
  //* H A N D L E   D E L E T E   C O M M E N T
  //*************************************************************************************** */

  const handleDeleteComment = (ID) => {
    console.log('handleDeleteComment', ID)
    axiosConn.post('/api/comments/delete', { CommentId: ID })
    .then((data) => {    
      setCommentsData(data.data.items)      
    });      
  }
    

  //*************************************************************************************** */
  //* H A N D L E   S A V E   E D I T
  //*************************************************************************************** */

  const handleSaveReplyEdit = (ID, commentStr) => {    
    setCommentsData(tmpArr)    
  }


  //*************************************************************************************** */
  //* R E N D E R
  //*************************************************************************************** */

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <Container maxWidth="lg">
        
        <Typography variant="h6">
            Comments Section
        </Typography>        

        <Grid container spacing={1}>
          {isLoading ?
            <>
              {[1,2,3,4].map(item => (
                <Grid item xs={12} key={item}>
                  <CommentSkeleton key={item}/> 
                </Grid>
              ))}
            </>
          :
          <>
            {commentsData.map((item, index) => (
                <Grid item xs={12} key={index}>                                   
                  <CommentCard currentUserId={token.sub}
                               data={item} 
                               key={index}
                               handleDeleteComment={handleDeleteComment} 
                               handleSaveReplyEdit={handleSaveReplyEdit}
                               //handleDeleteReply={handleDeleteReply}
                               />                
                 
                </Grid>
              ))}
            
              <Grid item xs={12}>
                <NewComment handleNewComment={handleNewComment}                               
                            userSession={token}
                            setNewComment={setNewComment} 
                            newComment={newComment}/>                
              </Grid>
            </>
          }
        </Grid>
            
      </Container>
    </>
  );
}


export async function getServerSideProps(context) {
  const { req, res } = context;
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })   
  
  const result = await fetch('http://localhost:3000/api/comments/list')
  const ssrData = await result.json()

  return {
    props: {
      ssrData: ssrData,
      token: token
    },
  }
}