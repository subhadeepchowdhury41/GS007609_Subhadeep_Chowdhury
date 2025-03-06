import storeReducer, { addStore, updateStore, deleteStore, importStores, Store } from "../src/redux/slices/storeSlice";

describe("storeSlice reducers", () => {
  const initialState: Store[] = [];

  it("should add a store", () => {
    const newState = storeReducer(initialState, addStore({ ID: "ST200", Label: "Test Store", CITY: "Test City", STATE: "Test State" }));
    expect(newState.length).toBe(1);
  });

  it("should update a store", () => {
    const modifiedState: Store[] = [{ ID: "ST200", Label: "Old Store", CITY: "Test City", STATE: "Test State" }];
    const newState = storeReducer(modifiedState, updateStore({ ID: "ST200", Label: "Updated Store", CITY: "Test City", STATE: "Test State" }));
    expect(newState[0].Label).toBe("Updated Store");
  });

  it("should delete a store", () => {
    const modifiedState: Store[] = [{ ID: "ST200", Label: "Test Store", CITY: "Test City", STATE: "Test State" }];
    const newState = storeReducer(modifiedState, deleteStore("ST200"));
    expect(newState.length).toBe(0);
  });

  it("should import stores", () => {
    const newState = storeReducer(initialState, importStores([{ ID: "ST201", Label: "Store 1", CITY: "Test City", STATE: "Test State" }, { ID: "ST202", Label: "Store 2", CITY: "Test City", STATE: "Test State" }]));
    expect(newState.length).toBe(2);
  });
});