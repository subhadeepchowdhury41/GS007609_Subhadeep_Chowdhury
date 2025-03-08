import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChartData {
  Store: string;
  StoreId: string;
  Week: string;
  GM_Dollars: number;
  GM_Percent: number;
}

export interface ChartState {
  chartData: ChartData[];
  selectedStore?: {
    ID: string;
    Label: string;
  };
}

const initialState: ChartState = {
  chartData: [],
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData = action.payload;
    },
    setSelectedStore: (state, action: PayloadAction<ChartState["selectedStore"]>) => {
      state.selectedStore = action.payload;
    },
    clearSelectedStore: (state) => {
      state.selectedStore = undefined;
    },
  },
});

export const { setChartData, setSelectedStore, clearSelectedStore } = chartSlice.actions;
export default chartSlice.reducer;
