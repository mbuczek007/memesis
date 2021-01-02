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

export const setAuthMessageByCode = (messageCode) => (dispatch) => {
  let message = '';

  if (messageCode === 'LOGIN-FAILED') {
    message = 'Nieprawidłowa dane uzytkownika.';
  }

  dispatch(setMessage({ message }));
};

export default slice.reducer;
