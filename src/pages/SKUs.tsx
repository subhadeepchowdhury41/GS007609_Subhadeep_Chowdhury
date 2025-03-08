import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { deleteSKU, importSKUs, SKU } from "../redux/slices/skuSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useState } from "react";
import SkuForm from "../components/forms/SkuForm";
import * as XLSX from "xlsx";
import UploadButton from "../components/ui/FileUpload";

const SKUsPage = () => {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state) => state.skus);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [chosenSKUId, setChosenSKUId] = useState<string | undefined>();
  const handleFileUpload = (workbook: XLSX.WorkBook) => {
    const skus = XLSX.utils.sheet_to_json(workbook.Sheets["SKUs"]);
    if (!skus.length) return;
    dispatch(importSKUs(skus as SKU[]));
  };
  const showDialog = (id?: string) => {
    setChosenSKUId(id);
    setOpen(true);
  };
  const showDeleteDialog = (id?: string) => {
    setChosenSKUId(id);
    setDeleteOpen(true);
  };
  const handleDelete = () => {
    dispatch(deleteSKU(chosenSKUId!));
    setDeleteOpen(false);
  };
  const handleClose = () => setOpen(false);
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
          SKUs
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <UploadButton onFileUpload={handleFileUpload} label="Import" />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            onClick={() => showDialog()}
          >
            Add SKU
          </Button>
        </Box>
      </Box>
      <Box className="ag-theme-material" sx={{ width: "100%", flex: 1 }}>
        <AgGridReact<SKU>
          columnDefs={[
            { headerName: "ID", field: "ID" },
            { headerName: "Label", field: "Label" },
            { headerName: "Department", field: "Department" },
            { headerName: "Class", field: "Class" },
            { headerName: "Price", field: "Price", type: "numberColumn" },
            { headerName: "Cost", field: "Cost", type: "numberColumn" },
            {
              headerName: "Actions",
              minWidth: 240,
              cellRenderer: (params: { data: SKU }) => (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton onClick={() => showDialog(params.data.ID)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => showDeleteDialog(params.data.ID)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ),
            },
          ]}
          rowData={skus}
          rowDragManaged
        />
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <SkuForm
            skuId={chosenSKUId}
            isEdit={!!chosenSKUId}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Delete SKU
          </Typography>
          <Typography>Are you sure you want to delete this SKU?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SKUsPage;
