import { createSlice } from '@reduxjs/toolkit';

const initialMessageState = {
  message: '',
};

export const slice = createSlice({
  name: 'message',
  initialState: initialMessageState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
});

export const { setMessage, clearMessage } = slice.actions;

export default slice.reducer;
