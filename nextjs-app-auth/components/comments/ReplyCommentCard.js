import * as React from 'react';
import ReactDOM from "react-dom";
import moment from 'moment';
import { Divider, Avatar, Grid, Paper, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DialogDeleteReply from './DialogDeleteReply';
import Stack from '@mui/material/Stack';
import axiosConn from '@/src/axiosConn'
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function ReplyCommentCard(props) {


  const [isEditComment, setIsEditComment] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [isEditReply, setIsEditReply] = React.useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
  React.useEffect(() => {
    setComment(props.data.Content)
  }, []);

  const handleEnableEditComment = (boolVal) => {
    setIsEditReply(boolVal)
  }

  const handleCancelEdit = () => {
    setComment(props.data.Content)
    setIsEditReply(false)
  }
  

 //*************************************************************************************** */
  //* H A N D L E   O P E N   D I A L O G
  //*************************************************************************************** */

  const handleDialogOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  //*************************************************************************************** */
  //* H A N D L E   C L O S E   D I A L O G
  //*************************************************************************************** */
  
  const handleDialogClose = () => {
    setIsOpenDeleteDialog(false);
  };

   //*************************************************************************************** */
  //* H A N D L E   D I A L O G   D E L E T E   C O M M E N T
  //************************0*************************************************************** */

  const handleDialogDeleteReply = (ID) => {
    console.log('handleDialogDeleteReply ', ID)
    console.log('handleDialogDeleteReply commentId', props.commentId)
    props.handleDeleteReply(ID, props.commentId)
    
    setIsOpenDeleteDialog(false);
  };

   //*************************************************************************************** */
  //* H A N D L E   S A V E   E D I T
  //*************************************************************************************** */

  const handleSaveEdit = () => {
    console.log('handleSaveEdit', {id: props.data.ReplyId, comment: comment})
    axiosConn.post('/api/replies/update', { ReplyId: props.data.ReplyId, Content: comment })
    .then((data) => {
      console.log('SUCCESS',data); // JSON data parsed by `data.json()` call                        
      setIsEditReply(false)

    }).catch((err) => {
      console.log('ERROR',err); // JSON data parsed by `data.json()` call                        
      setIsEditReply(false)

    });            
;            
//     commentsData.filter(c => c.Id === ID)
    
  }

  var momentDate=new moment(props.data.DateCreated);
  return (
    <div style={{ padding: 14, marginLeft: 12 }} className="App">
      <Paper style={{ padding: "10px 10px", marginTop: 10, marginLeft: 50 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item justifyContent="left">
            <Avatar alt={props.data.Name} src={imgLink} /> 
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Grid container wrap="nowrap" spacing={2}>            
              <Grid justifyContent="right" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{props.data.Name} replied to user {props.data.UserId} </h4>  
              </Grid>          
              <Grid justifyContent="right" item>
                {(props.data.UserId == props.currentUserId && !isEditReply) &&
                  <Stack direction="row" spacing={2}>
                    <DialogDeleteReply handleSaveReplyEdit={props.handleSaveReplyEdit} 
                                        replyId={props.data.ReplyId}
                                        handleDialogOpen={handleDialogOpen} 
                                        handleDialogClose={handleDialogClose}
                                        handleDialogDeleteReply={handleDialogDeleteReply} 
                                        openDeleteDialog={isOpenDeleteDialog}/> 
                    <Button variant="text" color="primary" startIcon={<EditIcon/>} onClick={() => setIsEditReply(true)}>Edit</Button>
                  </Stack>
                }
                {isEditReply &&
                  <>              
                    <Button variant="text" color="warning" startIcon={<ClearIcon/>} onClick={() => handleCancelEdit()}>Cancel</Button>
                    <Button variant="text" color="secondary" startIcon={<SaveIcon/>} onClick={() => handleSaveEdit()}>Save</Button>
                  </>
                }
              </Grid>          
            </Grid>
              {isEditReply ?
                  <>
                    <TextField
                      fullWidth
                      id="filled-multiline-static"                      
                      label=""
                      multiline
                      rows={4}
                      defaultValue=""
                      variant="outlined"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                  :
                  <>
                    <p style={{ textAlign: "left" }}>              
                      {comment}
                    </p>                  
                  </>
              }
                              
              <p style={{ textAlign: "left", color: "gray" }}>
              Replied {moment(momentDate).fromNow(true)} ago 
              {/* {props.data.DateCreated}  currentUserId: {props.currentUserId} */}
              </p>                          
            </Grid>          
         </Grid>
      </Paper>
    </div>
  );
}
