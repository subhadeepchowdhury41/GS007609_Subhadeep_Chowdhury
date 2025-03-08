import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../redux/store";
import { Clear } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import UploadButton from "../components/ui/FileUpload";
import { ColDef } from "ag-grid-community";
import { importSKUs, SKU } from "../redux/slices/skuSlice";
import { importStores, Store } from "../redux/slices/storeSlice";
import { useDispatch } from "react-redux";
import {
  closeSelectedRow,
  setCalculations,
  setColumnDefs,
  setSelectedRow,
  updateCalculationUnits,
} from "../redux/slices/planningSlice";
import { setChartData } from "../redux/slices/chartSlice";

const Planning = () => {
  const dispatch = useDispatch();
  const planning = useAppSelector((state) => state.planning);
  const showDialog = (row: any, week: string) => {
    dispatch(setSelectedRow({ ...row, Week: week }));
  };
  const closeDialog = () => {
    dispatch(closeSelectedRow());
  };
  const handleClear = () => {
    dispatch(setCalculations([]));
    dispatch(setColumnDefs([]));
    dispatch(setSelectedRow(null));
    dispatch(closeSelectedRow());
    dispatch(importStores([]));
    dispatch(importSKUs([]));
  };
  const handleFileUpload = (workbook: XLSX.WorkBook) => {
    const calendar = XLSX.utils.sheet_to_json(workbook.Sheets["Calendar"]);
    const plannings = XLSX.utils.sheet_to_json(workbook.Sheets["Planning"]);
    const newSkus: SKU[] = XLSX.utils.sheet_to_json(workbook.Sheets["SKUs"]);
    const newStores: Store[] = XLSX.utils.sheet_to_json(
      workbook.Sheets["Stores"]
    );
    dispatch(importSKUs(newSkus));
    dispatch(importStores(newStores));
    if (!calendar.length || !plannings.length) return;
    let monthWeekMap: any[] = [];
    calendar.forEach((c: any) => {
      monthWeekMap[c["Month"]] = {
        month: c["Month Label"],
        children: {
          ...monthWeekMap[c["Month"]]?.children,
          [c["Week"]]: c["Week Label"],
        },
      };
    });
    const newColDefs: ColDef[] = Object.values(monthWeekMap).map((m) => ({
      headerName: m.month as string,
      valueParser: (params: any) => params.value,
      children: Object.entries(m.children).map(([week, weekLabel]) => ({
        headerName: weekLabel as string,
        children: [
          {
            headerName: "Sales Unit",
            onCellClicked: (params: any) => showDialog(params.data, week),
            valueGetter: (params: any) => params.data.Weeks[week] || 0,
            editable: true,
            valueFormatter: (params: any) =>
              parseFloat(params.value).toFixed(2),
          },
          {
            headerName: "Sales Dollars",
            valueGetter: (params: any) =>
              `$ ${Number(
                (params.data.Weeks[week] || 0) * params.data.SKUPrice
              ).toFixed(2)}`,
          },
          {
            headerName: "GM Dollars",
            valueGetter: (params: any) =>
              `$ ${Number(
                (params.data.Weeks[week] || 0) * params.data.SKUPrice -
                  (params.data.Weeks[week] || 0) * params.data.SKUCost
              ).toFixed(2)}`,
          },
          {
            headerName: "GM Percent",
            cellRenderer: (params: any) => {
              const value =
                ((params.data.SKUPrice - params.data.SKUCost) /
                  params.data.SKUPrice) *
                100;
              let color = "black";
              if (value >= 40) {
                color = "green";
              } else if (value >= 10) {
                color = "yellow";
              } else if (value > 5) {
                color = "orange";
              } else {
                color = "red";
              }
              return (
                <div
                  style={{
                    backgroundColor: color,
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: color === "yellow" ? "brown" : "white",
                  }}
                >
                  {Number(value).toFixed(2)} %
                </div>
              );
            },
          },
        ],
      })),
    }));
    dispatch(
      setColumnDefs([
        { field: "Store", sortable: true, filter: true },
        { field: "SKU", sortable: true, filter: true },
        ...newColDefs,
      ])
    );
    let newCalculations: any[] = [];
    let skuMap: {
      [key: string]: { Label: string; Price: number; Cost: number };
    } = {};
    let storeMap: {
      [key: string]: { Label: string };
    } = {};
    const planningMap: {
      [key: string]: { Store: string; SKU: string; Units: number };
    } = {};
    const chartMap: {
      [key: string]: any;
    } = {};
    newStores.forEach((s: Store) => {
      storeMap[s.ID] = { Label: s.Label };
    });
    newSkus.forEach((s: SKU) => {
      skuMap[s.ID] = {
        Label: s.Label,
        Price: s.Price,
        Cost: s.Cost,
      };
    });
    plannings.forEach((p: any) => {
      planningMap[`${p.Store}-${p.SKU}`] = {
        ...planningMap[`${p.Store}-${p.SKU}`],
        [p.Week]: p["Sales Units"],
      };
    });
    plannings.forEach((p: any) => {
      chartMap[`${p.Store}-${p.Week}`] = {
        Price:
          chartMap[`${p.Store}-${p.Week}`]?.Price ||
          0 + p["Sales Units"] * skuMap[p.SKU].Price,
        Cost:
          chartMap[`${p.Store}-${p.Week}`]?.Cost ||
          0 + p["Sales Units"] * skuMap[p.SKU].Cost,
      };
    });
    Object.entries(planningMap).forEach(([k, v]) => {
      const [store, sku] = k.split("-");
      newCalculations.push({
        Store: storeMap[store].Label,
        SKU: skuMap[sku]?.Label,
        StoreId: store,
        SKUId: sku,
        SKUPrice: skuMap[sku]?.Price,
        SKUCost: skuMap[sku]?.Cost,
        Weeks: v,
      });
    });
    let newChart: any[] = [];
    Object.entries(chartMap).forEach(([k, v]) => {
      const [store, week] = k.split("-");
      newChart.push({
        Store: storeMap[store].Label,
        Week: week,
        StoreId: store,
        GM_Dollars: parseFloat(Number(v.Price - v.Cost).toFixed(2)),
        GM_Percent: parseFloat(
          Number(((v.Price - v.Cost) / v.Price) * 100).toFixed(2)
        ),
      });
    });
    dispatch(setCalculations(newCalculations));
    dispatch(setChartData(newChart));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        marginTop: "60px",
        height: "calc(100vh - 60px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: 1,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={23} fontWeight={600}>
          Planning
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClear}
            startIcon={<Clear />}
          >
            Clear
          </Button>
          <UploadButton onFileUpload={handleFileUpload} label="Import" />
        </Box>
      </Box>
      <div className="ag-theme-material" style={{ flex: 1, width: "100%" }}>
        <AgGridReact
          rowData={planning?.calculations || []}
          columnDefs={[...(planning?.columnDefs || [])]}
          defaultColDef={{
            minWidth: 150,
            resizable: true,
          }}
        />
      </div>
      <Dialog
        open={!!planning?.selectedRow}
        onClose={closeDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <TextField
            label="Units"
            fullWidth
            defaultValue={
              planning?.selectedRow?.Weeks[planning?.selectedRow.Week] || 0
            }
            onChange={(e) =>
              dispatch(
                updateCalculationUnits({
                  storeId: planning?.selectedRow?.StoreId || "",
                  skuId: planning?.selectedRow?.SKUId || "",
                  week: planning?.selectedRow?.Week || "",
                  units: parseFloat(e.target.value || "0"),
                })
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={closeDialog}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Planning;
