import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import storeStatus from "../storeStatus";
import authApi from "../../api/auth/authApi";
import ROUTES from "../../config/routes";
import globalRouter from "../../globalRouter";
import getErrorTranslation from "../../utils/errorTranslator";
import localStorageService from "../../api/localStorageService";

const initialState = localStorageService.getAccessToken()
  ? {
    status: storeStatus.success,
    error: null,
    userId: localStorageService.getUserId(),
  }
  : {
    status: storeStatus.idle,
    error: null,
    userId: null,
  };

export const login = createAsyncThunk("auth/login",
  async (user, { rejectWithValue }) => {
    const { username, password } = user;
    try {
      const data = await authApi.auth({ username, password });
      const { exp: expAT, user_id } = jwtDecode(data.access)
      const { exp: expRT } = jwtDecode(data.refresh)
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
      state.status = storeStatus.idle
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.status = storeStatus.loading
        state.error = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = storeStatus.success
        state.error = null
        state.userId = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = storeStatus.error
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