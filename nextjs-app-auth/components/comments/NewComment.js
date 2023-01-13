import React from "react";
import ReactDOM from "react-dom";

import { Divider, Avatar, Grid, Paper, TextField, Button } from '@mui/material';


const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CommentCard(props) {
  return (
    <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "10px 10px", marginTop: 10 }} elevation={3}>
        <Grid container wrap="nowrap" spacing={2} style={{padding: 8}}>
          <Grid item>
            <Avatar alt={''} src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <TextField
              fullWidth
              id="filled-multiline-static"
              placeholder="Add a comment"
              label=""
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
              value={props.newComment}
              onChange={(e) => props.setNewComment(e.target.value)}
            />
          </Grid>
          <Grid item>
              <Button variant="contained" color="primary" onClick={props.handleNewComment}>Send</Button>
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
}
