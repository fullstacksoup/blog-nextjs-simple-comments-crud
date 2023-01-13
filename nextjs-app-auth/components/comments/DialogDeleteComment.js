import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
export default function DialogDeleteComment(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div>
      <Button variant="text" color="warning" onClick={props.handleDialogOpen} startIcon={<DeleteIcon/>} >
        Delete
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={props.openDeleteDialog}
        onClose={props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" autoFocus onClick={props.handleDialogClose} color="warning">
            No
          </Button>
          <Button onClick={props.handleDialogDeleteReply} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}