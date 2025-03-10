import { BarChart, Category, Store, TableChart } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const AppDrawer = ({ drawerWidth }: { drawerWidth: number }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        height: "100vh",
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ height: "60px", borderBottom: "1px solid #E0E0E0" }}>
        <img style={{ width: "100%", height: "100%" }} src={Logo} alt="Logo" />
      </Box>
      <List>
        <ListItemButton
          to="/dashboard/store"
          component={Link}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "red",
            },
          }}
        >
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary="Stores" />
        </ListItemButton>
        <ListItemButton to="/dashboard/sku" component={Link}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="SKUs" />
        </ListItemButton>
        <ListItemButton to="/dashboard/planning" component={Link}>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="Planning" />
        </ListItemButton>
        <ListItemButton to="/dashboard/charts" component={Link}>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
