'use client';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../apis/userApi';
import { useState } from 'react';
import { RootState } from '../store/store';
import { fetchUserFailure, fetchUsersStart, fetchUserSuccess } from '../store/action';
import { auth } from '../lib/firebase';

export default function UpdateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { users, message } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const handleClick = async () => {
    try {
      setIsLoading(true);
      dispatch(fetchUsersStart())
      const user = auth.currentUser;
      console.log({ user });
      const token = await user?.getIdToken()
      console.log({ token });
      const data = await fetchUser(token!);
      dispatch(fetchUserSuccess(data))
    } catch (e: any) {
      console.log(e)
      dispatch(fetchUserFailure(e?.response?.data?.message || "Something went wrong"))
    }
    setIsLoading(false);
  };

  return (
    <div>
      {message && <Typography>{message}</Typography>}
      <Button variant="contained" onClick={handleClick}>
        {isLoading ? <CircularProgress color='secondary' /> : 'Fetch User'}
      </Button>
      {users?.length !== 0 &&
        users.map((item, index) => (
          <Box key={index}>
            <Typography>
              {index + 1}. {item.name}
            </Typography>
          </Box>
        ))
      }
    </div>
  );
}
