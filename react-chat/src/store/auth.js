import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/auth/authApi";
import localStorageService from "../api/localStorageService";
import getErrorTranslation from "../utils/errorTranslator";
import globalRouter from "../globalRouter";
import ROUTES from "../config/routes";
import { parseJwt } from "../utils";

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
      const data = await authApi.auth({ username, password });
      const { exp: expAT, user_id } = parseJwt(data.access)
      const { exp: expRT } = parseJwt(data.refresh)
      localStorageService.setTokens(data.access, data.refresh, expAT, expRT, user_id)
      globalRouter.navigate(ROUTES.root);
      return user_id
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
        state.userId = payload;
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
  globalRouter.navigate(ROUTES.auth);
};

const { actions, reducer: authReduser } = authSlice;
const { authLoggedOut } = actions;
export default authReduser;