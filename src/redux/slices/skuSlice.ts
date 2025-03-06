import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SKU {
  ID: string;
  Label: string;
  Department: string;
  Class: string;
  Price: number;
  Cost: number;
}

const skuInitialState: SKU[] = [];

const skuSlice = createSlice({
  name: "skus",
  initialState: skuInitialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex((s) => s.ID === action.payload.ID);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s.ID !== action.payload);
    },
    importSKUs: (_, action: PayloadAction<SKU[]>) => {
      return [...action.payload];
    },
  },
});

export const { addSKU, updateSKU, deleteSKU, importSKUs } = skuSlice.actions;
export default skuSlice.reducer;