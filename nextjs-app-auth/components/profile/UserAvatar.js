import * as React from 'react';
import Link from '../../src/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
function preventDefault(event) {
  event.preventDefault();
}

export default function UserAvatar(props) {
  return (
    <React.Fragment>
      <Box align={'center'}>
        <Stack spacing={2} alignItems={'center'}>
            <Avatar        
                alt='User Avatar Image'
                src={props.userInfo.picture}
                sx={{ width: 106, height: 106 }}
            />
            <Typography component="h6" variant="h6" color="primary">
                {props.userInfo.name}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Joined on 15 March, 2019
            </Typography>
              <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                View Comments
                </Link>
              </div>
        </Stack>
      </Box>
    </React.Fragment>
  )
}