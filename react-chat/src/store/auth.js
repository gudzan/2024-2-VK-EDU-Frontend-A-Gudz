import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../api/auth/authService";
import localStorageService from "../api/localStorageService";
import getErrorTranslation from "../utils/errorTranslator";

const initialState = localStorageService.getAccessToken()
  ? {
    isLoading: false,
    error: null,
    userId: localStorageService.getUserId(),
    isSuccess: true,
  }
  : {
    isLoading: false,
    error: null,
    userId: null,
    isSuccess: false,
  };

export const login = createAsyncThunk("auth/login",
  async (user, { rejectWithValue }) => {
    const { username, password } = user;
    try {
      const data = await authService.auth({ username, password });
      localStorageService.setTokens(data.access, data.refresh)
    } catch (error) {
      const errorMessage = error.response.data.detail ?? error.message
      return rejectWithValue(getErrorTranslation(errorMessage))
    }
  })

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoggedOut: (state) => {
      state.isSuccess = false;
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.error = null
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = payload
      });
  }
});

export const logOut = () => (dispatch) => {
  localStorageService.removeTokens();
  dispatch(authLoggedOut());
};

const { actions, reducer: authReduser } = authSlice;
const { authLoggedOut } = actions;
export default authReduser;