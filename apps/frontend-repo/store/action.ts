import { createSlice } from '@reduxjs/toolkit';

type User = {
    name: string;
    email: string;
    role: string;
    uid: string
};

type UserState = {
    isLoading: boolean;
    users : User[];
    message : string
};

const initialState = {
    users : [],
    isLoading : false,
    message : ""
} as UserState;

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart : (state) => {
            state.isLoading = true;
            state.users = [];
            state.message = "Please wait...";
        },
        fetchUserSuccess: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.message = "Success fetch users";
        },
       fetchUserFailure: (state, action) => {
            state.isLoading = false;
            state.users = [];
            state.message = action.payload;
        },
    },
});

export const { fetchUsersStart, fetchUserSuccess, fetchUserFailure } = user.actions;
