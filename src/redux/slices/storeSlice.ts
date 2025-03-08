import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Store {
  ID: string;
  Label: string;
  City: string;
  State: string;
}

const initialState: Store[] = [];

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.findIndex((s) => s.ID === action.payload.ID);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s.ID !== action.payload);
    },
    importStores: (_, action: PayloadAction<Store[]>) => {
      return [...action.payload];
    },
  },
});

export const { addStore, updateStore, deleteStore, importStores } = storeSlice.actions;
export default storeSlice.reducer;