import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function ReplyCommentSkeleton(props) {
  
  return (
    <div style={{ padding: 14, marginLeft: 12 }} className="App">
      <Paper style={{ padding: "10px 10px", marginTop: 3, marginLeft: 50 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item justifyContent="left">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Grid container wrap="nowrap" spacing={2}>            
              <Grid justifyContent="right" item xs zeroMinWidth>
                <Skeleton animation="wave" height={30} width="10%" style={{ marginBottom: 6 }}/>
              </Grid>          
              <Grid justifyContent="right" item>
                <Skeleton animation="wave" height={30} width="100%" style={{ marginRight: 66 }} />
              </Grid>          
            </Grid>
            <Skeleton animation="wave" height={25} width="80%" />
            <p style={{ textAlign: "left", color: "gray" }}>
              <Skeleton animation="wave" height={25} width="30%" />
            </p>                          
          </Grid>          
        </Grid>
      </Paper>
    </div>
  );
}
