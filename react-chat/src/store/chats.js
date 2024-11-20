import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "../api/chat/chatService";

const initialState = {
  isLoading: false,
  chats: [],
  prevChats: [],
  error: null,
}

export const chatRequest = createAsyncThunk("chats/chatRequest",
  async (rejectWithValue) => {
    try {
      const results = await chatService.getAllChats();
      return results
    } catch (error) {
      const errorMessage = error.response.data.detail ?? error.message
      return rejectWithValue(getErrorTranslation(errorMessage))
    }
  })

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setPrevChats: (state, action) => {
      state.prevChats = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(chatRequest.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(chatRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.chats = action.payload
        state.error = null
      })
      .addCase(chatRequest.rejected, (state, action) => {
        state.isLoading = false

        state.error = action.payload
      });
  }
});

const { actions, reducer: chatsReduser } = chatsSlice;
export const { setPrevChats } = actions;
export default chatsReduser;