import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import CommentCard from '@/components/comments/CommentCard';
import ReplyCommentCard from '@/components/comments/ReplyCommentCard';
import NewComment from '@/components/comments/NewComment';
import CommentSkeleton from '@/components/comments/CommentSkeleton';
import { Divider, Avatar, Grid, Paper } from '@mui/material';
import {AppContext} from "@/src/state";
import axiosConn from '@/src/axiosConn'
import InfiniteScroll from 'react-infinite-scroll-component';
import { getToken } from "next-auth/jwt";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Comments({ ssrData }) {
  
  const [newComment, setNewComment] = useState('');
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [length, setLength] = React.useState(11)
  const maxRecordsReturned = 3;
  const skeletonItems = [0, 1, 2]

  //*************************************************************************************** */
  //* I N I T
  //*************************************************************************************** */

  useEffect(() => {
    // console.log(ssrData.items)
    var tmpArr = []
    ssrData.items.map((elem, i) => {
        if(i <= 3) {
            tmpArr.push(elem);
        }        
    });
    
    setLength(3)

    setCommentsData(ssrData.items.slice(0,3))
     setTimeout(() => {
       setIsLoading(false);  
     })
    
  }, []);

//*************************************************************************************** */
  //* F E T C H   M O R E   R E C O R D S   F O R   I N F I N I T E   S C R O L L
  //*************************************************************************************** */

  const fetchMoreData = () => {
    setIsLoading(true)
    setTimeout(() => {        
        setCommentsData(ssrData.items.slice(0,(length + maxRecordsReturned)))
        setLength(length + maxRecordsReturned)        
        setIsLoading(false)
    }, 1000);
};
  
  //*************************************************************************************** */
  //* H A N D L E   N E W   C O M M E N T
  //*************************************************************************************** */

  const handleNewComment = async () => {
    var tmpArr = []
    var id=0

    axiosConn.post('/api/comments/add', { UserId: 22, Content: newComment })
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
    axios.post('/api/comments/delete', { CommentId: ID })
    .then((data) => {
      console.log(data);
      
      // var tmpArr = []
      // var id=0
      // commentsData.forEach(elem => {
      //   if(elem.CommentId !== ID) {
      //     tmpArr.push(elem)          
      //   }
      // })    
      setCommentsData(data.data.items)    
      
    });      
  

  }

  //*************************************************************************************** */
  //* H A N D L E   S A V E   E D I T
  //*************************************************************************************** */

  const handleSaveEdit = (ID, commentStr) => {
    console.log('handleSaveEdit', commentStr)

//     commentsData.filter(c => c.Id === ID)
    setCommentsData(tmpArr)    
  }

  //*************************************************************************************** */
  //* R E N D E R
  //*************************************************************************************** */

  const renderLoading = () => {
    return (
      <>
        <Grid container spacing={1}>          
          {skeletonItems.map(item => (
            <Grid item xs={12}>
              <CommentSkeleton/> 
            </Grid>
          ))}        
        </Grid>
    </>
    )
   }  

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Container maxWidth="lg">
        
        <Typography variant="h6">
            Comments Section
        </Typography>        

        <InfiniteScroll
              dataLength={commentsData.length-1}
              // style={{ display: 'flex', flexDirection: 'column-reverse' }}
              next={fetchMoreData}           
              hasMore={commentsData.length < 6? true : false}
              loader={renderLoading()}
              >
              <Grid container spacing={1}>
                
              {commentsData.map(item => (
                  <Grid item xs={12}>                                   
                    <CommentCard data={item} 
                                handleSaveEdit={handleSaveEdit}
                                handleDeleteComment={handleDeleteComment} />                
                  
                  </Grid>
                ))}
              
                <Grid item xs={12}>
                  {!isLoading &&
                    <NewComment handleNewComment={handleNewComment}                               
                                userName={'John Smith'}
                                setNewComment={setNewComment} 
                                newComment={newComment}/>                
                  }
                </Grid>
                
              </Grid>
        </InfiniteScroll>          
      </Container>
    </>
  );
}


export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/comments/list')
  const ssrData = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      ssrData,
    },
  }
}