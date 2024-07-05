// src/features/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUserDetails: (state, action) => {
      state.users.push(action.payload);
    },
    getUsers: (state, action) => {
        state.users = action.payload
    },
    editUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter(user => user.id !== id);
    },
  },
});

export const { addNewUserDetails, getUsers, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;