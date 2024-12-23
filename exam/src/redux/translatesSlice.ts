import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TranslationData } from "../types/translationData";
import { getHistory } from "../localStorageUtils/localStorage";

const storedTranslations = getHistory()
const initialState: TranslationData[] = storedTranslations ? JSON.parse(storedTranslations) : [];

export const translatesSlice = createSlice({
  name: "translates",
  initialState,
  reducers: {
    translatesAdd: (state, action: PayloadAction<TranslationData[]>) => {
      state = action.payload;
    },
    translatesRemove: (state, action) => {
      state = []
    },
  },
});

const { actions, reducer: translatesReduser } = translatesSlice;
export const { translatesAdd, translatesRemove: translatesRemoved } = actions;

export default translatesReduser;
