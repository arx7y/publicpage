import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { socketClient } from '../../../../index';

const initialState = {
  messageStatus: '', //ideally it should come from the BE
  messages: [],
  typingUsername: '',
};

export const sendMessage = createAsyncThunk('sendMessage', async function ({ message, username }) {
  return await socketClient.emit('chat', { message, handle: username });
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.messageStatus = 'Sending';
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.messageStatus = 'Sent successfully';
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.messageStatus = 'Send failed';
    });
  },
});
export default chatSlice.reducer;