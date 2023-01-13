import * as React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import moment from 'moment';


export default function UserComments(props) {
  return (
    <React.Fragment>
      <Typography variant='h5'>My Comments</Typography>
      <TableContainer sx={{ maxHeight: 220 }}>
      <Table size="small">
      
        <TableHead>
          <TableRow>
            
            <TableCell>Content</TableCell>
            <TableCell>Replies</TableCell>
            <TableCell>Date</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
           <TableRow key={row.CommentId}>
              <TableCell>{row.Content}</TableCell>
              <TableCell>
                <Typography variant={'body1'} color={row.Replies > 0 ? 'primary' : 'default'}>
                {row.Replies}
                </Typography>
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