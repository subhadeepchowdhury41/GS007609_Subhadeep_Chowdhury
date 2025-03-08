import planningReducer, {
  setCalculations,
  updateCalculationUnits,
  setSelectedRow,
  setColumnDefs,
  closeSelectedRow,
} from '../src/redux/slices/planningSlice';

describe('planning slice', () => {
  const initialState = {
    calculations: [],
    selectedRow: null,
    columnDefs: [],
  };

  const mockCalculation = {
    Store: 'Test Store',
    StoreId: 'store1',
    SKUId: 'sku1',
    SKU: 'Test SKU',
    Units: 100,
    SKUPrice: 10,
    SKUCost: 5,
    Weeks: {
      'Week 1': 50,
      'Week 2': 50,
    },
  };

  const mockColumnDefs = [
    { field: 'Store' },
    { field: 'SKU' },
  ];

  it('should handle initial state', () => {
    expect(planningReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCalculations', () => {
    const actual = planningReducer(initialState, setCalculations([mockCalculation]));
    expect(actual.calculations).toEqual([mockCalculation]);
  });

  it('should handle updateCalculationUnits', () => {
    const stateWithCalculations = {
      ...initialState,
      calculations: [mockCalculation],
    };

    const updatePayload = {
      storeId: 'store1',
      skuId: 'sku1',
      week: 'Week 1',
      units: 75,
    };

    const actual = planningReducer(stateWithCalculations, updateCalculationUnits(updatePayload));
    expect(actual.calculations[0].Weeks['Week 1']).toBe(75);
    expect(actual.calculations[0].Weeks['Week 2']).toBe(50); // Other weeks unchanged
  });

  it('should handle setSelectedRow', () => {
    const selectedRow = {
      ...mockCalculation,
      Week: 'Week 1',
    };

    const actual = planningReducer(initialState, setSelectedRow(selectedRow));
    expect(actual.selectedRow).toEqual(selectedRow);
  });

  it('should handle closeSelectedRow', () => {
    const stateWithSelectedRow = {
      ...initialState,
      selectedRow: {
        ...mockCalculation,
        Week: 'Week 1',
      },
    };

    const actual = planningReducer(stateWithSelectedRow, closeSelectedRow());
    expect(actual.selectedRow).toBeNull();
  });

  it('should handle setColumnDefs', () => {
    const actual = planningReducer(initialState, setColumnDefs(mockColumnDefs));
    expect(actual.columnDefs).toEqual(mockColumnDefs);
  });

  it('should not modify other calculations when updating units', () => {
    const multipleCalculations = {
      ...initialState,
      calculations: [
        mockCalculation,
        {
          ...mockCalculation,
          StoreId: 'store2',
          SKUId: 'sku2',
        },
      ],
    };

    const updatePayload = {
      storeId: 'store1',
      skuId: 'sku1',
      week: 'Week 1',
      units: 75,
    };

    const actual = planningReducer(multipleCalculations, updateCalculationUnits(updatePayload));
    expect(actual.calculations[0].Weeks['Week 1']).toBe(75);
    expect(actual.calculations[1].Weeks['Week 1']).toBe(50); // Other calculation unchanged
  });
});
