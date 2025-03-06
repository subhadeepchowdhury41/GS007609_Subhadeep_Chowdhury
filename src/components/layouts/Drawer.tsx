import { BarChart, Category, Store, TableChart } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const AppDrawer = () => {
  return (
    <Drawer sx={{ width: 250 }}>
      <List>
        <ListItemButton to="/store" component={Link}>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary="Stores" />
        </ListItemButton>
        <ListItemButton to="/sku" component={Link}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="SKUs" />
        </ListItemButton>
        <ListItemButton to="/planning" component={Link}>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItemButton>
        <ListItemButton to="/charts" component={Link}>
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
