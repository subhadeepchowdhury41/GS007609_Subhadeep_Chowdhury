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
import { Add, Delete, Edit } from "@mui/icons-material";
import { useAppSelector } from "../../src/redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteStore, importStores, Store } from "../redux/slices/storeSlice";
import StoreForm from "../components/forms/StoreForm";
import * as XLSX from "xlsx";
import UploadButton from "../components/ui/FileUpload";

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useAppSelector((state) => state.stores);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [chosenStoreId, setChosenStoreId] = useState<string | undefined>();
  const handleFileUpload = (workbook: XLSX.WorkBook) => {
    const stores = XLSX.utils.sheet_to_json(workbook.Sheets["Stores"]);
    if (!stores.length) return;
    dispatch(importStores(stores as Store[]));
  };
  const showDialog = (id?: string) => {
    setChosenStoreId(id);
    setOpen(true);
  };
  const showDeleteDialog = (id?: string) => {
    setChosenStoreId(id);
    setDeleteOpen(true);
  };
  const handleDelete = () => {
    dispatch(deleteStore(chosenStoreId!));
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
          Stores
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <UploadButton onFileUpload={handleFileUpload} label="Import" />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            onClick={() => showDialog()}
          >
            Add Store
          </Button>
        </Box>
      </Box>
      <Box className="ag-theme-material" sx={{ width: "100%", flex: 1 }}>
        <AgGridReact
          columnDefs={[
            { headerName: "ID", field: "ID" },
            { headerName: "Label", field: "Label" },
            { headerName: "City", field: "City" },
            { headerName: "State", field: "State" },
            {
              headerName: "Actions",
              flex: 1,
              cellRenderer: (params: { data: Store }) => (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton onClick={() => showDialog(params.data.ID)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => showDeleteDialog(params.data.ID)}>
                    <Delete />
                  </IconButton>
                </Box>
              ),
            },
          ]}
          rowData={stores}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <StoreForm
            storeId={chosenStoreId}
            isEdit={!!chosenStoreId}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Delete Store
          </Typography>
          <Typography>Are you sure you want to delete this store?</Typography>
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

export default StoresPage;
