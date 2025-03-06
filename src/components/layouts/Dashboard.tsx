import { Box } from "@mui/material";
import AppDrawer from "./Drawer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: 250 }}>
        <AppDrawer />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
