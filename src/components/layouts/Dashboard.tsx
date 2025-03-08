import { Box } from "@mui/material";
import AppDrawer from "./Drawer";
import { Outlet } from "react-router-dom";
import AppHeader from "./Appbar";

const drawerWidth = 250;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppDrawer drawerWidth={drawerWidth} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${drawerWidth}px)`,
          height: "100vh",
        }}
      >
        <AppHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
