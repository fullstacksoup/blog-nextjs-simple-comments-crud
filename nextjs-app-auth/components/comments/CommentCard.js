import * as React from 'react';
import moment from 'moment';
import { Divider, Avatar, Grid, Paper, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DialogDeleteComment from './DialogDeleteComment'
import Stack from '@mui/material/Stack';
import axiosConn from '@/src/axiosConn'

//https://randomuser.me/api/ results.picture.thumbnail  results.name.first results.name.last
export default function CommentCard(props) {
  

  const [isEditComment, setIsEditComment] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [isRepliesExpanded, setIsRepliesExpanded] = React.useState(false);
  const [replyToComment, setReplyToComment] = React.useState('');
  const [replySkeletonCount, setReplySkeletonCount] = React.useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openAddReply, setOpenAddReply] = React.useState(false);
  const [repliesData, setRepliesData] = React.useState([]);
  const [isRepliesDataLoaded, setIsRepliesDataLoaded] = React.useState(false);
  const [repliesCount, setRepliesCount] = React.useState(0);
  
  
  //*************************************************************************************** */
  //* I N I T
  //*************************************************************************************** */

  React.useEffect(() => {
    setComment(props.data.Content)
    var tmpCntArr = []
    for (let i = 0; i < props.data.Replies; i++) {
      tmpCntArr.push(i)
    }
    setReplySkeletonCount(tmpCntArr)
    setRepliesCount(props.data.Replies);
  }, []);

  
  //*************************************************************************************** */
  //* H A N D L E   E N A B L E   E D I T   C O M M E N T
  //*************************************************************************************** */

  const handleEnableEditComment = (boolVal) => {
    setIsEditComment(boolVal)
  }

    
  //*************************************************************************************** */
  //* H A N D L E   C A N C E L   E D I T
  //*************************************************************************************** */

  const handleCancelEdit = () => {
    setComment(props.data.Content)
    setIsEditComment(false)
  }

  
 //*************************************************************************************** */
  //* H A N D L E   O P E N   D I A L O G
  //*************************************************************************************** */

  const handleDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  //*************************************************************************************** */
  //* H A N D L E   C L O S E   D I A L O G
  //*************************************************************************************** */
  
  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
  };

   //*************************************************************************************** */
  //* H A N D L E   D I A L O G   D E L E T E   C O M M E N T
  //************************0*************************************************************** */

  const handleDialogDeleteComment = (ID) => {
    
    setOpenDeleteDialog(false);
    props.handleDeleteComment(props.data.CommentId)
    
  };

  //*************************************************************************************** */
  //* H A N D L E   S A V E   E D I T
  //*************************************************************************************** */

  const handleSaveEdit = (commentStr) => {  
    axiosConn.post('/api/comments/update', { CommentId: props.data.CommentId, Content: comment })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call          
      setRepliesData(data.data.data)
      setRepliesCount(repliesCount + 1)                    
      setIsEditComment(false);    
    });            
//     commentsData.filter(c => c.Id === ID)
    
  }
  
  // const imgLink = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  // const imgLink = "https://randomuser.me/api/portraits/women/67.jpg"
  const imgLink ="https://randomuser.me/api/portraits/women/72.jpg"
  var momentDate=new moment(props.data.DateCreated);
// https://randomuser.me/photos
  return (
    <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "10px 10px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item justifyContent="left">
            <Avatar alt={props.data.Name} src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Grid container wrap="nowrap" spacing={2}>            
              <Grid justifyContent="right" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{props.data.Name}</h4>  
              </Grid>          
              <Grid justifyContent="right" item>
                {props.data.UserId == props.currentUserId &&
                <>
                  {isEditComment ?
                  <>
                    <Button variant="text" color="warning" startIcon={<ClearIcon/>} onClick={() => handleCancelEdit()}>Cancel</Button>
                    <Button variant="text" color="secondary" startIcon={<SaveIcon/>} onClick={() => handleSaveEdit()}>Save</Button>
                  </>
                  :
                  <>
                    {/* <Button variant="text" color="warning" startIcon={<DeleteIcon/>} onClick={() => props.handleDeleteComment(props.data.Id)}>Delete</Button> */}
                    <Stack direction="row" spacing={2}>
                      <DialogDeleteComment handleDeleteComment={props.handleDeleteComment} 
                                          handleDialogOpen={handleDialogOpen} 
                                          handleDialogClose={handleDialogClose}
                                          handleDialogDeleteComment={handleDialogDeleteComment} 
                                          openDeleteDialog={openDeleteDialog}/>
                      <Button variant="text" color="primary" startIcon={<EditIcon/>} onClick={() => handleEnableEditComment(true)}>Edit</Button>
                    </Stack>
                  </>
                  }

                </>
                }
              </Grid>          
            </Grid>
            
            {isEditComment ?
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
          
            <Grid container wrap="nowrap" spacing={6}>
              <Grid item align="left" xs={2}>
                <p style={{ textAlign: "left", color: "gray" }}>
                  Posted {moment(momentDate).fromNow(true)} ago 
                </p>                          
              </Grid>
              
            </Grid>
            
          </Grid>          
        </Grid>
      </Paper>

     
     
    </div>
  );
}


