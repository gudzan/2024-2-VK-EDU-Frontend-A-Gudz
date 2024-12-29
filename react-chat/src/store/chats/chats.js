import { createSlice } from "@reduxjs/toolkit";
import chatApi from "../../api/chat/chatApi";
import { logOut } from "../auth/auth";
import storeStatus from "../storeStatus";

const initialState = {
  status: storeStatus.success,
  chats: [],
  prevChats: [],
  error: null
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsRequest: (state) => {
      state.status = storeStatus.loading;
      state.error = null;
    },
    setChats: (state, action) => {
      state.status = storeStatus.success;
      state.error = null;
      state.chats = action.payload;
    },
    setChatsFailed: (state, action) => {
      state.status = storeStatus.error;
      state.error = action.payload.message;
    },
    addNewChat: (state, action) => {
      state.chats = [action.payload, ...state.chats];
    },
    setPrevChats: (state, action) => {
      state.prevChats = action.payload;
    }
  }
});

const { actions, reducer: chatsReduser } = chatsSlice;
export const { setPrevChats, setChatsRequest, setChatsFailed, setChats, addNewChat } = actions;

export const chatRequest = () => async (dispatch) => {
  dispatch(setChatsRequest());
  try {
    const results = await chatApi.getAllChats();
    dispatch(setChats(results));
  } catch (error) {
    dispatch(setChatsFailed(error.message));
    dispatch(logOut());
  }
};

export default chatsReduser;
