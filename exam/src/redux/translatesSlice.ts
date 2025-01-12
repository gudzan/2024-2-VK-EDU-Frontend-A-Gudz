import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TranslationData } from "../types/translationData";
import { getHistory, removedHistory, setHistory } from "../localStorageUtils/localStorage";

const storedTranslations = getHistory()
const initialState: TranslationData[] = storedTranslations ? JSON.parse(storedTranslations) : [];

export const translatesSlice = createSlice({
  name: "translates",
  initialState,
  reducers: {
    translatesAdd: (state, action: PayloadAction<TranslationData>) => {
      setHistory(action.payload)
      state.push(action.payload)
    },
    translatesRemove: () => {
      removedHistory()
      return []
    },
  },
});

const { actions, reducer: translatesReduser } = translatesSlice;
export const { translatesAdd, translatesRemove: translatesRemoved } = actions;

export default translatesReduser;
