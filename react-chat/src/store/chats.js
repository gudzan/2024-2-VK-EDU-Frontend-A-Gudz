import { createSlice } from "@reduxjs/toolkit";
import chatService from "../api/chat/chatService";
import getErrorTranslation from "../utils/errorTranslator";
import { logOut } from "./auth";

const initialState = {
  isLoading: false,
  chats: [],
  prevChats: [],
  error: null,
}

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsRequest: (state) => {
      state.isLoading = true
      state.error = null
    },
    setChats: (state, action) => {
      state.isLoading = false
      state.error = null
      state.chats = action.payload;
    },
    setChatsFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewChat: (state, action) => {
      state.chats = [action.payload, ...state.chats]
    },
    setPrevChats: (state, action) => {
      state.prevChats = action.payload;
    },
  },
});

const { actions, reducer: chatsReduser } = chatsSlice;
export const { setPrevChats, setChatsRequest, setChatsFailed, setChats, addNewChat } = actions;

export const chatRequest = () => async (dispatch) => {
  dispatch(setChatsRequest())
  try {
    const results = await chatService.getAllChats();
    dispatch(setChats(results))
  } catch (error) {
    dispatch(setChatsFailed(error.message))
    dispatch(logOut())
  }
};

export default chatsReduser;