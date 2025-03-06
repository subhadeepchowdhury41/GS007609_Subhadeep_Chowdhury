import skuReducer, { addSKU, updateSKU, deleteSKU, SKU, importSKUs } from "../src/redux/slices/skuSlice";

describe("skuSlice", () => {
  it("should add a sku", () => {
    const modifiedState: SKU[] = [{ ID: "SKU200", Label: "Test SKU", Department: "Test Department", Class: "Test Class", Price: 100, Cost: 50 }];
    const newState = skuReducer(modifiedState, addSKU({ ID: "SKU200", Label: "New SKU", Department: "Test Department", Class: "Test Class", Price: 100, Cost: 50 }));
    expect(newState[0].Label).toBe("Test SKU");
  });

  it("should update a sku", () => {
    const modifiedState: SKU[] = [{ ID: "SKU200", Label: "Old SKU", Department: "Old Department", Class: "Old Class", Price: 100, Cost: 50 }];
    const newState = skuReducer(modifiedState, updateSKU({ ID: "SKU200", Label: "Updated SKU", Department: "Updated Department", Class: "Updated Class", Price: 100, Cost: 50 }));
    expect(newState[0].Label).toBe("Updated SKU");
  });

  it("should delete a sku", () => {
    const modifiedState: SKU[] = [{ ID: "SKU200", Label: "Test SKU", Department: "Test Department", Class: "Test Class", Price: 100, Cost: 50 }];
    const newState = skuReducer(modifiedState, deleteSKU("SKU200"));
    expect(newState.length).toBe(0);
  });

  it("should import skus", () => {
    const modifiedState: SKU[] = [];
    const newState = skuReducer(modifiedState, importSKUs([{ ID: "SKU200", Label: "Test SKU", Department: "Test Department", Class: "Test Class", Price: 100, Cost: 50 }]));
    expect(newState.length).toBe(1);
  });
});
