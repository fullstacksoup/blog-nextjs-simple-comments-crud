import * as React from 'react';
import Link from '../../src/Link';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import moment from 'moment';


export default function UserReplies(props) {
  return (
    <React.Fragment>
      <Typography variant='h5'>My Replies</Typography>
      <TableContainer sx={{ maxHeight: 340 }}>
      <Table size="small" >
        <TableHead>
          <TableRow>
            
            <TableCell>Content</TableCell>
            <TableCell>Link to Original Comment</TableCell>
            <TableCell>Date</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
           <TableRow key={row.ReplyId}>
              <TableCell>{row.Content}</TableCell>
              <TableCell>
                <Link href={`openComment/${row.ReplyToCommentId}`}>
                 Orignal Comment
                </Link>
                
                </TableCell>
            
              <TableCell>{moment(row.DateCreated).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>                          
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </React.Fragment>
  );
}