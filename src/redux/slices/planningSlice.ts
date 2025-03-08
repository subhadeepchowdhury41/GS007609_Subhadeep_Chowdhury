import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColDef } from 'ag-grid-community';

interface WeekData {
  [week: string]: number;
}

interface Calculation {
  Store: string;
  StoreId: string;
  SKUId: string;
  SKU: string;
  Units: number;
  SKUPrice: number;
  SKUCost: number;
  Weeks: WeekData;
}

interface PlanningState {
  calculations: Calculation[];
  columnDefs: ColDef[];
  selectedRow: {
    Store: string;
    StoreId: string;
    SKUId: string;
    SKU: string;
    Units: number;
    SKUPrice: number;
    SKUCost: number;
    Weeks: WeekData;
    Week: string;
  } | null;
}

const initialState: PlanningState = {
  calculations: [],
  selectedRow: null,
  columnDefs: [],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setCalculations: (state, action: PayloadAction<Calculation[]>) => {
      state.calculations = action.payload;
    },
    setColumnDefs: (state, action: PayloadAction<ColDef[]>) => {
      state.columnDefs = action.payload as any;
    },
    updateCalculationUnits: (
      state,
      action: PayloadAction<{
        storeId: string;
        skuId: string;
        week: string;
        units: number;
      }>
    ) => {
      const { storeId, skuId, week, units } = action.payload;
      state.calculations = state.calculations.map((calc) => {
        if (calc.StoreId === storeId && calc.SKUId === skuId) {
          return {
            ...calc,
            Weeks: {
              ...calc.Weeks,
              [week]: units,
            },
          };
        }
        return calc;
      });
    },
    setSelectedRow: (
      state,
      action: PayloadAction<
        | {
            Store: string;
            StoreId: string;
            SKUId: string;
            SKU: string;
            Units: number;
            SKUPrice: number;
            SKUCost: number;
            Weeks: WeekData;
            Week: string;
          }
        | null
      >
    ) => {
      state.selectedRow = action.payload;
    },
    closeSelectedRow: (state) => {
      state.selectedRow = null;
    },
  },
});

export const {
  setCalculations,
  updateCalculationUnits,
  setSelectedRow,
  setColumnDefs,
  closeSelectedRow,
} = planningSlice.actions;

export default planningSlice.reducer;