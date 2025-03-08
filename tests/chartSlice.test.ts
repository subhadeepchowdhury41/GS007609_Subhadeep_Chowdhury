import chartReducer, {
  setChartData,
  setSelectedStore,
  clearSelectedStore,
  ChartData,
} from '../src/redux/slices/chartSlice';

describe('chart slice', () => {
  const initialState = {
    chartData: [],
  };

  const mockChartData: ChartData[] = [
    {
      Store: 'Test Store',
      StoreId: 'store1',
      Week: 'Week 1',
      GM_Dollars: 1000,
      GM_Percent: 25,
    },
    {
      Store: 'Test Store',
      StoreId: 'store1',
      Week: 'Week 2',
      GM_Dollars: 1200,
      GM_Percent: 30,
    },
  ];

  const mockStore = {
    ID: 'store1',
    Label: 'Test Store',
  };

  it('should handle initial state', () => {
    expect(chartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setChartData', () => {
    const actual = chartReducer(initialState, setChartData(mockChartData));
    expect(actual.chartData).toEqual(mockChartData);
  });

  it('should handle setSelectedStore', () => {
    const actual = chartReducer(initialState, setSelectedStore(mockStore));
    expect(actual.selectedStore).toEqual(mockStore);
  });

  it('should handle clearSelectedStore', () => {
    const stateWithSelectedStore = {
      ...initialState,
      selectedStore: mockStore,
    };

    const actual = chartReducer(stateWithSelectedStore, clearSelectedStore());
    expect(actual.selectedStore).toBeUndefined();
  });

  it('should handle setting chart data while maintaining selected store', () => {
    const stateWithSelectedStore = {
      chartData: [],
      selectedStore: mockStore,
    };

    const actual = chartReducer(stateWithSelectedStore, setChartData(mockChartData));
    expect(actual.chartData).toEqual(mockChartData);
    expect(actual.selectedStore).toEqual(mockStore);
  });

  it('should handle setting selected store while maintaining chart data', () => {
    const stateWithChartData = {
      chartData: mockChartData,
      selectedStore: undefined,
    };

    const actual = chartReducer(stateWithChartData, setSelectedStore(mockStore));
    expect(actual.chartData).toEqual(mockChartData);
    expect(actual.selectedStore).toEqual(mockStore);
  });
});
